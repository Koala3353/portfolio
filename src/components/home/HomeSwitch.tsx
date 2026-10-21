"use client";

import type { ReactNode } from "react";
import DeskHome from "@/components/desk/DeskHome";
import { fredoka } from "@/components/desk/fonts";
import { useDeskCrashed, usePrefersClassic, useWebGL } from "@/components/desk/homeMode";

/**
 * Shows the 3D desk, or the regular home when the visitor asked for it,
 * the browser can't draw WebGL, or the desk crashed.
 * The regular home is always rendered into the HTML (hidden while the desk shows).
 */
export default function HomeSwitch({ classic }: { classic: ReactNode }) {
  const prefersClassic = usePrefersClassic();
  const webgl = useWebGL();
  const crashed = useDeskCrashed();
  const desk = webgl && !crashed && !prefersClassic;

  return (
    <>
      {desk ? <DeskHome /> : null}
      <div hidden={desk} className={fredoka.variable}>
        {classic}
      </div>
    </>
  );
}
