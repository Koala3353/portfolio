"use client";

import { useRef, useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { site } from "@/lib/site";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: Fields = { name: "", email: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE = 10;

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < MIN_MESSAGE)
    e.message = `Please write at least ${MIN_MESSAGE} characters.`;
  return e;
}

function mailtoFor(v: Fields) {
  const subject = encodeURIComponent(`Portfolio inquiry from ${v.name || "a visitor"}`);
  const body = encodeURIComponent(`${v.message}\n\n${v.name}\n${v.email}`);
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export default function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const honeypot = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const next = { ...values, [e.target.name]: e.target.value };
    setValues(next);
    if (touched) setErrors(validate(next));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched(true);
    const found = validate(values);
    setErrors(found);
    const first = (Object.keys(found) as (keyof Fields)[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (honeypot.current?.value) {
      setStatus("success");
      setValues(EMPTY);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      setValues(EMPTY);
      setTouched(false);
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setErrors({});
    setTouched(false);
  }

  const submitting = status === "submitting";

  return (
    <div className="surface p-6 md:p-8">
      <div aria-live="polite" role="status" className="sr-only">
        {status === "submitting" && "Sending your message."}
        {status === "success" && "Message sent. Thanks for reaching out."}
        {status === "error" && "Your message could not be sent. You can email it instead."}
      </div>

      {status === "success" ? (
        <div className="flex flex-col items-start gap-4 py-6">
          <CheckCircle size={32} className="text-accent" aria-hidden />
          <h2 className="text-2xl font-semibold">Message sent</h2>
          <p className="max-w-[50ch] leading-relaxed text-muted">
            Thanks for reaching out. I&apos;ll get back to you soon.
          </p>
          <button type="button" onClick={reset} className="btn btn-secondary mt-2">
            Send another
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold">Send a message</h2>

          <Field id="name" label="Name" error={errors.name}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={onChange}
              disabled={submitting}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="field"
            />
          </Field>

          <Field id="email" label="Email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={onChange}
              disabled={submitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="field"
            />
          </Field>

          <Field id="message" label="Message" error={errors.message}>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={values.message}
              onChange={onChange}
              disabled={submitting}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className="field resize-y"
            />
          </Field>

          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="company">Company</label>
            <input ref={honeypot} id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {status === "error" && (
            <div className="rounded-xl border border-line bg-surface-2 p-4 text-sm leading-relaxed text-muted">
              <p className="font-medium text-fg">Your message could not be sent.</p>
              <p className="mt-1">
                Your text is still here. You can{" "}
                <a href={mailtoFor(values)} className="link-underline text-accent">
                  send it by email instead
                </a>{" "}
                or try again.
              </p>
            </div>
          )}

          <button type="submit" disabled={submitting} className="btn btn-primary mt-1 self-start disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "Sending..." : "Send message"}
            {!submitting && <ArrowRight size={16} aria-hidden />}
          </button>
          <p className="text-sm text-subtle">Form submissions are forwarded to my email.</p>
        </form>
      )}
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
