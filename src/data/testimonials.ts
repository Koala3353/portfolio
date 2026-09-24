export interface Testimonial {
  /** Full original recommendation text. */
  quote: string;
  /** Verbatim sentence(s) lifted from `quote`. */
  excerpt: string;
  name: string;
  title: string;
  relationship: string;
  date: string;
  dateTime: string;
}

export const testimonials: Testimonial[] = [
  {
    excerpt:
      "Keene brought my vision to life exactly how I wanted, clean, engaging, and perfectly aligned with my brand.",
    quote:
      "I had the pleasure of working with Keene to create my website, thelittlebakerkitchen.com, and I couldn't be happier with the result. Keene brought my vision to life exactly how I wanted, clean, engaging, and perfectly aligned with my brand. He's not only skilled in web design and development but also incredibly easy to work with. Keene communicated clearly, responded quickly, and paid close attention to every detail throughout the process. I highly recommend him to anyone looking for a dependable and creative web developer who truly cares about their client's satisfaction.",
    name: "Brent Clarence Chua",
    title: "Pastry Chef",
    relationship: "Brent was Keene's client",
    date: "Oct 22, 2025",
    dateTime: "2025-10-22",
  },
  {
    excerpt:
      "From day one, Keene showed a strong sense of initiative and picked up tasks quickly, often needing very little supervision.",
    quote:
      "I had the pleasure of supervising Keene Xander during his internship with our Facilities Management team. From day one, Keene showed a strong sense of initiative and picked up tasks quickly, often needing very little supervision. He understood instructions clearly and could work independently, which made him a real asset to our team. What stood out most was his technical capability and positive attitude, not just toward his work but also in how he collaborated with colleagues. He even contributed beyond his main duties, helping the Purchasing Department and improving the efficiency of our internal trackers. Keene's performance speaks volumes about his potential, and I'm confident he has a solid foundation for professional growth. He'd be a great addition to any team.",
    name: "Melvin Martinez",
    title: "Registered Electrical Engineer",
    relationship: "Melvin managed Keene directly",
    date: "Jul 10, 2025",
    dateTime: "2025-07-10",
  },
];
