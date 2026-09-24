export interface Achievement {
  placement: string;
  title: string;
  org?: string;
  date: string;
  /** ISO-ish value for <time dateTime>. */
  dateTime: string;
  location?: string;
  role?: string;
  description: string;
  featured?: boolean;
}

export interface AchievementGroup {
  id: string;
  title: string;
  subtitle: string;
  items: Achievement[];
}

export const achievementStats = [
  { value: "9+", label: "Competitions" },
  { value: "3", label: "Countries" },
  { value: "Top 0.5%", label: "Brandstorm" },
  { value: "1st", label: "FLL PH 2024" },
];

export const achievementGroups: AchievementGroup[] = [
  {
    id: "case",
    title: "Case competitions",
    subtitle: "Strategy, innovation, and leadership under pressure.",
    items: [
      {
        placement: "Top 4%",
        title: "International Semifinalist, Case Consilium 2026",
        org: "BITS Goa Consulting Club",
        date: "Sep 2026",
        dateTime: "2026-09",
        role: "Team Leader",
        description:
          "Finished as an International Semifinalist in Case Consilium 2026: The Ultimate Strategy Case Competition, ranking in the top 4% of 5,861+ global participants with a proposal spanning strategic market entry, financial feasibility, and implementation planning.",
      },
      {
        placement: "1st Runner-Up",
        title: "FUSION 2026",
        org: "Junior Entrepreneurs' Marketing Association (DLSU)",
        date: "Aug 2026",
        dateTime: "2026-08",
        role: "Team Leader",
        description:
          "Led a team of first-time case competitors to 2nd place overall against higher-batch collegiate teams, spearheading strategy and research behind an integrated marketing plan presented in the final round.",
      },
      {
        placement: "Top 24",
        title: "National Semifinalist, L'Oréal Brandstorm 2026",
        org: "L'Oréal",
        date: "Mar 2026",
        dateTime: "2026-03",
        role: "Team Leader",
        description:
          "Top 0.5% of 30,000+ innovators across 5,000+ teams. Represented Ateneo as one of the youngest groups in the competition.",
        featured: true,
      },
      {
        placement: "Top 25",
        title: "ACTS '25 Semifinalist",
        org: "Nestlé Philippines",
        date: "Oct 2025",
        dateTime: "2025-10",
        role: "Team Leader",
        description:
          "Led team in developing sustainability solutions for the Ateneo Challenge for Transformational Sustainability.",
      },
      {
        placement: "2x Winner",
        title: "Bounty Winner, Ship or Be Shipped 2025",
        org: "24-hour hackathon",
        date: "Dec 2025",
        dateTime: "2025-12",
        role: "Solo Developer",
        description:
          "Built a production-ready React widget for Ripe, winning two separate bounty prizes.",
      },
    ],
  },
  {
    id: "international",
    title: "International competitions",
    subtitle: "Representing the Philippines on the global stage.",
    items: [
      {
        placement: "7th Place",
        title: "FLL Open European Championship",
        date: "May 2024",
        dateTime: "2024-05",
        location: "Norway",
        role: "Team Lead Developer",
        description:
          "EdTech solution featuring AI chord detection (90%+ accuracy), computer vision karaoke, and a personalized exercise generator. Reduced learning time by 40%.",
        featured: true,
      },
      {
        placement: "1st Place",
        title: "FLL Philippines 2024",
        date: "Feb 2024",
        dateTime: "2024-02",
        role: "National Champion",
        description:
          "B2C educational website with MongoDB dashboards and GSAP animations, achieving a 35% increase in user engagement.",
        featured: true,
      },
      {
        placement: "5th Place",
        title: "Innovation Project, FLL Philippines 2025",
        date: "Feb 2025",
        dateTime: "2025-02",
        role: "Software Architect",
        description:
          "BlueHaven: IoT sensor network integrated with Python/Tkinter dashboard and OpenAI analytics for monitoring marine ecosystems.",
      },
      {
        placement: "Top 25-80",
        title: "Hack Club Arcade Showcase",
        date: "Aug 2024",
        dateTime: "2024-08",
        role: "Out of 2,000 entrants",
        description:
          "Global peer-judged innovation exhibition showcasing creative technical projects from young developers worldwide.",
      },
    ],
  },
  {
    id: "academic",
    title: "Academic honors",
    subtitle: "Excellence recognized across institutions.",
    items: [
      {
        placement: "Director's List",
        title: "Ateneo de Manila University",
        date: "Mar 2025",
        dateTime: "2025-03",
        description:
          "Premier distinction for holistic excellence in academics, leadership, and character. Top 150 ACET performers.",
      },
      {
        placement: "Archer Achiever",
        title: "De La Salle University",
        date: "May 2025",
        dateTime: "2025-05",
        description:
          "Top 100 in the DLSU College Admission Test, recognized for outstanding academic potential.",
      },
      {
        placement: "Gold & Silver",
        title: "CMA Mental Arithmetic",
        date: "Jul 2017",
        dateTime: "2017-07",
        description:
          "Multiple distinctions including Gold (2016, 2017) and Silver (2016, 2017) medals in mental arithmetic competitions.",
      },
    ],
  },
];

export const featuredAchievements = achievementGroups
  .flatMap((g) => g.items)
  .filter((a) => a.featured);
