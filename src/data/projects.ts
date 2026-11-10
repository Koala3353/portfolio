export type ProjectCategory = "Web" | "AI" | "Bots" | "Tools";

export interface Project {
  slug: string;
  title: string;
  year: string;
  category: ProjectCategory;
  description: string;
  github?: string;
  preview?: string;
  featured?: boolean;
  /** Screenshot in public/projects, shown on cards. */
  image?: string;
}

export const categories: ProjectCategory[] = ["Web", "AI", "Bots", "Tools"];

export const eras: { year: string; label?: string; subtitle: string }[] = [
  {
    "year": "2026",
    "label": "Current year",
    "subtitle": "Internal tools for Ritual Matcha and student organizations, a market-entry model, and a few apps I use myself."
  },
  {
    "year": "2025",
    "subtitle": "First year at Ateneo: hackathons, an online store for a student org, and freelance client work."
  },
  {
    "year": "2024",
    "label": "Senior high school",
    "subtitle": "Moved from bots to websites, and built software for the FIRST LEGO League team that won nationals."
  },
  {
    "year": "2023",
    "label": "Grade 11",
    "subtitle": "Paid Discord bot commissions for international clients."
  },
  {
    "year": "2022",
    "label": "Grade 10 · most productive year",
    "subtitle": "My busiest year: Discord bots with databases behind them, for clients abroad."
  },
  {
    "year": "2021",
    "label": "Where it all began",
    "subtitle": "Taught myself Java and built my first paid Discord bots."
  }
];

export const projects: Project[] = [
  {
    "slug": "he-venue-explorer",
    "image": "/projects/he-venue-explorer.jpg",
    "title": "HE Venue Explorer",
    "year": "2026",
    "category": "Tools",
    "description": "Finds every free room in ADMU Higher Education at once by reading all 152 CFMO venue calendars, instead of checking them one by one. Prefills the CFMO reservation form so you can submit in seconds, before the day's capped slots run out minutes after the form opens.",
    "github": "https://github.com/Koala3353/cldn-venue-explorer",
    "preview": "https://script.google.com/a/student.ateneo.edu/macros/s/AKfycbw_zN1l9PCFGz35TdrD-ClBp77L8Csi8Sd7rPUljYO7Z3L7uvLhKkhGQb2rvokNbfYB/exec#/",
    "featured": true
  },
  {
    "slug": "celadon-website",
    "image": "/projects/celadon-website.jpg",
    "title": "Celadon Website",
    "year": "2026",
    "category": "Web",
    "description": "Celadon's first professional website, with an applicant portal and a project manager toolkit. Ateneo Celadon is the Filipino-Chinese student organization at Ateneo.",
    "github": "https://github.com/Koala3353/celadon-website",
    "preview": "https://ateneoceladon.com/",
    "featured": true
  },
  {
    "slug": "leads-applicant-portal",
    "title": "LEADS Applicant Portal",
    "year": "2026",
    "category": "Web",
    "description": "The first custom applicant portal for LEADS, the Ateneo Management Engineering Association's 3-day offsite leadership camp. Replaced Google Forms with one Google Sheet and an Apps Script web app that takes applicants from application to payment proof, requirements, and room booking. I proposed it and led the 5-person team that built it.",
    "github": "https://github.com/Koala3353/leads-applicant-portal",
    "preview": "https://koala3353.github.io/leads-applicant-portal/"
  },
  {
    "slug": "celadon-pm-toolkit",
    "title": "Celadon PM Toolkit",
    "year": "2026",
    "category": "Web",
    "description": "Ateneo Celadon's Project Manager Toolkit for 2026 to 2027, moved from a Google Site to a searchable static site. Every page is a Markdown file, and it sits behind the same member sign-in as the main Celadon website.",
    "github": "https://github.com/Koala3353/celadon-pm-toolkit",
    "preview": "https://pm.ateneoceladon.com/"
  },
  {
    "slug": "celaville-wrapped",
    "title": "Celaville Wrapped",
    "year": "2026",
    "category": "Web",
    "description": "The first CelaWrapped: a Spotify Wrapped-style recap of each member's Recruitment Week activity, with fun facts about Ateneo Celadon's members and their backgrounds.",
    "github": "https://github.com/Koala3353/celaville-wrapped",
    "preview": "https://wrapped.ateneoceladon.com/"
  },
  {
    "slug": "celaville-ctw",
    "title": "Celaville CTW",
    "year": "2026",
    "category": "Web",
    "description": "A thank-you Wrapped for the core team behind Ateneo Celadon's Recruitment Week and Welcome Week, a companion to Celaville Wrapped.",
    "github": "https://github.com/Koala3353/celaville-ctw",
    "preview": "https://ctw.ateneoceladon.com/"
  },
  {
    "slug": "mahjong-leaderboard",
    "title": "Mahjong Leaderboard Portal",
    "year": "2026",
    "category": "Web",
    "description": "Ateneo Celadon's first mahjong leaderboard portal, built for Recruitment Week, with 350+ users and 1,000+ games logged in 4 days."
  },
  {
    "slug": "apps-script-automations",
    "title": "Google Apps Script Automations",
    "year": "2026",
    "category": "Tools",
    "description": "6+ Google Apps Script projects for organizations and teams, including email blasts, live dashboards, and registration and tracking systems."
  },
  {
    "slug": "kandama-market-entry-model",
    "image": "/projects/kandama-market-entry-model.jpg",
    "title": "Kandama Market Entry Model",
    "year": "2026",
    "category": "Tools",
    "description": "Interactive financial model for a proposed Melbourne market entry by Kandama Collective, with every figure computed live from tagged assumptions.",
    "github": "https://github.com/Koala3353/kandama-model",
    "preview": "https://koala3353.github.io/kandama-model/",
    "featured": true
  },
  {
    "slug": "for-you-delivery-model",
    "title": "For You Delivery Model",
    "year": "2026",
    "category": "Tools",
    "description": "The model behind every number in our deck for the TikTok Shop SEA Regional Case Challenge 2026, on failed cash-on-delivery orders in the Philippines. Plain Python that sizes the problem by stage and segment, then runs 10,000 simulations for bear, realistic, and bull cases.",
    "github": "https://github.com/Koala3353/for-you-delivery-model"
  },
  {
    "slug": "enlistment-planner",
    "title": "AISIS Enlistment Planner",
    "year": "2026",
    "category": "Tools",
    "description": "Single-file web app for planning class enlistment at Ateneo. Paste your AISIS pre-enlistment page, block out personal time, and it ranks the schedule combinations that fit, scored by section priority, professor, and open slots.",
    "github": "https://github.com/Koala3353/enlistment-planner",
    "preview": "https://koala3353.github.io/enlistment-planner/"
  },
  {
    "slug": "scht",
    "title": "Scht",
    "year": "2026",
    "category": "Tools",
    "description": "Invite-only, local-first school and work planner. Current-term planning, IPS curriculum imports, and offline task persistence with owner-only operational metrics.",
    "github": "https://github.com/Koala3353/scht",
    "preview": "https://scht-admu.vercel.app"
  },
  {
    "slug": "tabiflow-japan",
    "title": "TabiFlow Japan",
    "year": "2026",
    "category": "AI",
    "description": "Installable Japan trip planner. Turns trip preferences into a sourced itinerary with route estimates, hotel-area travel times, budget guidance, and swap options, and keeps saved plans available offline.",
    "github": "https://github.com/Koala3353/tabiflow-japan"
  },
  {
    "slug": "lutong-bahay-share",
    "title": "Lutong Bahay Share",
    "year": "2026",
    "category": "Web",
    "description": "Class demo for STS 10: restaurants and bakeries post unsold food as discounted pickup bags near closing time. Phones in the room sync live through public Nostr relays, so it runs with no server of its own.",
    "github": "https://github.com/Koala3353/lutong-bahay-share"
  },
  {
    "slug": "splurge",
    "image": "/projects/splurge.jpg",
    "title": "Splurge",
    "year": "2026",
    "category": "Web",
    "description": "Mobile-first bill-splitting PWA for tracking outings with friends. Scans receipts with OCR, splits costs proportionally, and logs payments over time.",
    "github": "https://github.com/Koala3353/splurge",
    "preview": "https://koala3353.github.io/splurge/"
  },
  {
    "slug": "kbrigado-links",
    "title": "kbrigado.links",
    "year": "2026",
    "category": "Web",
    "description": "My own link page, built with Vite, React, and Tailwind CSS. The résumé link updates itself from the same GitHub repo this site pulls from.",
    "github": "https://github.com/Koala3353/kbrigado-links",
    "preview": "https://koala3353.github.io/kbrigado-links/"
  },
  {
    "slug": "vaultie",
    "title": "Vaultie",
    "year": "2026",
    "category": "Web",
    "description": "Weekly budgeting PWA, a differently themed sibling to Budge with the same no-clutter approach to tracking spend.",
    "github": "https://github.com/Koala3353/vaultie",
    "preview": "https://koala3353.github.io/vaultie/"
  },
  {
    "slug": "budge",
    "image": "/projects/budge.jpg",
    "title": "Budge",
    "year": "2026",
    "category": "Web",
    "description": "Weekly budgeting web app I use myself. Tracks income and expenses week by week, with no sign-up beyond an account key and no subscription.",
    "github": "https://github.com/Koala3353/budge",
    "preview": "https://koala3353.github.io/budge/",
    "featured": true
  },
  {
    "slug": "poker-chips-tracker",
    "title": "Poker Chips Tracker",
    "year": "2026",
    "category": "Web",
    "description": "Real-time chip tracker for Texas Hold'em home games. Built for a phone held sideways, so the whole table fits on one screen with no scrolling.",
    "github": "https://github.com/Koala3353/poker-chips-tracker",
    "preview": "https://poker-chips-tracker.vercel.app"
  },
  {
    "slug": "proof-of-purchase-api",
    "title": "Proof of Purchase API",
    "year": "2026",
    "category": "AI",
    "description": "Upload a receipt image and get back the transaction number, amount, time, and confidence score as structured JSON.",
    "github": "https://github.com/Koala3353/pop-api",
    "preview": "https://pop-api-mocha.vercel.app/docs"
  },
  {
    "slug": "pop-portal",
    "title": "POP Portal",
    "year": "2026",
    "category": "Web",
    "description": "Automated payment verification system for Ateneo student organizations, cross-checking GCash, Maya, and BDO receipt screenshots against official transaction history.",
    "github": "https://github.com/Koala3353/pop-portal",
    "preview": "https://koala3353.github.io/pop-portal/"
  },
  {
    "slug": "celadon-rose-sale-system",
    "image": "/projects/celadon-rose-sale-system.jpg",
    "title": "Celadon Rose Sale System",
    "year": "2025",
    "category": "Web",
    "description": "Online store for Celadon's Rose Sale that replaced the old Google Forms ordering, with orders syncing live to Google Sheets. About 850 unique users used it.",
    "github": "https://github.com/Koala3353/celadon-rose-sale",
    "preview": "https://koala3353.github.io/celadon-rose-sale/",
    "featured": true
  },
  {
    "slug": "ripe-fx",
    "title": "Ripe FX",
    "year": "2025",
    "category": "Web",
    "description": "Embeddable React widget that shows stablecoin-to-fiat rates and fees next to what a bank would charge. Built solo in 24 hours and won 2 bounties at Ship or Be Shipped 2025.",
    "github": "https://github.com/Koala3353/Ripe-FX-Transparency-Widget",
    "featured": true
  },
  {
    "slug": "mediguard-ai",
    "title": "MediGuard AI",
    "year": "2025",
    "category": "AI",
    "description": "Clinical assistant using OpenAI GPT-4 for personalized treatment plans, enforcing safety protocols with AI reasoning and a deterministic rule engine.",
    "github": "https://github.com/Koala3353/AI-Powered-Treatment-Plan-Assistant"
  },
  {
    "slug": "codehonesty",
    "title": "CodeHonesty",
    "year": "2025",
    "category": "Tools",
    "description": "Code submission integrity and similarity checking application with a dashboard for analytics and tracking.",
    "github": "https://github.com/Koala3353/CodeHonesty"
  },
  {
    "slug": "excel-summarizer",
    "title": "Excel Summarizer",
    "year": "2025",
    "category": "Tools",
    "description": "Batch Excel processing tool that generates summary files with weekly/date columns and totals from multiple input files.",
    "github": "https://github.com/Koala3353/excel-summarizer"
  },
  {
    "slug": "bluehaven-app",
    "title": "BlueHaven App",
    "year": "2025",
    "category": "AI",
    "description": "Weather monitoring and marine life density tracking with Arduino sensors, Python/Tkinter GUI, and OpenAI integration. FLL 2025 submission.",
    "github": "https://github.com/Koala3353/bluehaven-app"
  },
  {
    "slug": "chess-game",
    "title": "Chess Game",
    "year": "2025",
    "category": "Tools",
    "description": "Chess game implemented with Python and tkinter GUI, using the python-chess library for game logic.",
    "github": "https://github.com/Koala3353/chess-tkinter"
  },
  {
    "slug": "ateneo-eats",
    "title": "Ateneo Eats",
    "year": "2025",
    "category": "Web",
    "description": "Modern web app helping students find, filter, and order food from every canteen and stall on the Ateneo campus.",
    "github": "https://github.com/Koala3353/ateneo-eats",
    "preview": "https://koala3353.github.io/ateneo-eats/"
  },
  {
    "slug": "ejk-heatmap-ph",
    "title": "EJK Heatmap PH",
    "year": "2025",
    "category": "Web",
    "description": "Interactive heatmap showcasing data from Duterte's Drug War killings (2016).",
    "github": "https://github.com/Koala3353/ejk-heatmap-ph",
    "preview": "https://koala3353.github.io/ejk-heatmap-ph/"
  },
  {
    "slug": "tlb-kitchen-api",
    "title": "TLB Kitchen API",
    "year": "2025",
    "category": "Web",
    "description": "Python Flask API replacing MongoDB Data API with custom endpoints for pastries management.",
    "github": "https://github.com/Koala3353/tlbk-api"
  },
  {
    "slug": "multipurpose-discord-bot",
    "title": "Multipurpose Discord Bot",
    "year": "2025",
    "category": "Bots",
    "description": "Feature-rich discord bot with multiple functionalities from utilities to games and more.",
    "github": "https://github.com/Koala3353/multipurpose-discord-bot"
  },
  {
    "slug": "rpg-discord-bot",
    "title": "RPG Discord Bot",
    "year": "2025",
    "category": "Bots",
    "description": "RPG Discord bot made for Hackclub's game jam with the theme of loopholes.",
    "github": "https://github.com/Koala3353/rpg-discord-bot"
  },
  {
    "slug": "bulok",
    "title": "Bulok",
    "year": "2025",
    "category": "Tools",
    "description": "An algorithmic ASCII art piece exploring the commodification of our food systems.",
    "github": "https://github.com/Koala3353/bulok"
  },
  {
    "slug": "fll-website",
    "title": "FLL Website",
    "year": "2024",
    "category": "Web",
    "description": "Platform for Spark Hobby Kit, providing tools and inspiration to spark creative projects. FLL 2024 submission.",
    "github": "https://github.com/Koala3353/FLL-website",
    "preview": "https://koala3353.github.io/FLL-website/"
  },
  {
    "slug": "spark-music-app",
    "title": "SPARK Music App",
    "year": "2024",
    "category": "AI",
    "description": "AI-powered chord detection engine helping users learn and practice chords accurately. FLL 2024 submission.",
    "github": "https://github.com/Koala3353/SPARK-app"
  },
  {
    "slug": "bakery-website",
    "title": "Bakery Website",
    "year": "2024",
    "category": "Web",
    "description": "Paid client website for a bakery displaying pastries and cakes, with products retrieved from a MongoDB database.",
    "github": "https://github.com/Koala3353/bakery-website",
    "preview": "https://koala3353.github.io/bakery-website/"
  },
  {
    "slug": "portfolio-website",
    "title": "Portfolio Website",
    "year": "2024",
    "category": "Web",
    "description": "Personal portfolio showcasing projects and expertise (previous version).",
    "github": "https://github.com/Koala3353/portfolio",
    "preview": "https://koala3353.github.io/portfolio/"
  },
  {
    "slug": "klick-n-code",
    "title": "Klick N Code",
    "year": "2024",
    "category": "Web",
    "description": "Business website/shop showcasing services, projects, and statistics for freelance development business.",
    "github": "https://github.com/Koala3353/klickncode",
    "preview": "https://koala3353.github.io/klickncode/"
  },
  {
    "slug": "dashboard-template",
    "title": "Dashboard Template",
    "year": "2024",
    "category": "Web",
    "description": "Reusable dashboard template designed for Discord bots needing an online dashboard interface.",
    "github": "https://github.com/Koala3353/dashboard-template",
    "preview": "https://koala3353.github.io/dashboard-template/"
  },
  {
    "slug": "3v3-rank-discord-bot",
    "title": "3v3 Rank Discord Bot",
    "year": "2023",
    "category": "Bots",
    "description": "Paid bot facilitating 3v3 ranked matches with a queue system where up to six users can join or leave.",
    "github": "https://github.com/Koala3353/Xero_Competitive"
  },
  {
    "slug": "trf-discord-bot",
    "title": "TRF Discord Bot",
    "year": "2023",
    "category": "Bots",
    "description": "Paid bot sending daily questionnaires and uploading responses to Airtable for an online community.",
    "github": "https://github.com/Koala3353/TRF_Bot"
  },
  {
    "slug": "resource-tracker-discord-bot",
    "title": "Resource Tracker Discord Bot",
    "year": "2022",
    "category": "Bots",
    "description": "Paid bot for managing RPG resources, currency, and rare items with admin controls for in-game events.",
    "github": "https://github.com/Koala3353/role-playing-resource-tracker"
  },
  {
    "slug": "betdux-discord-bot",
    "title": "BetDUX Discord Bot",
    "year": "2022",
    "category": "Bots",
    "description": "Paid bot for BetDEX that retrieves sports betting odds and manages user predictions with a leaderboard.",
    "github": "https://github.com/Koala3353/BetDUX"
  },
  {
    "slug": "kaijuto-era-discord-bot",
    "title": "Kaijuto Era Discord Bot",
    "year": "2022",
    "category": "Bots",
    "description": "Paid bot rewarding users with currency for gaming time, featuring a customizable shop with SQLite and Steam integration.",
    "github": "https://github.com/Koala3353/Kaijuto-Era"
  },
  {
    "slug": "invite-tracker-discord-bot",
    "title": "Invite Tracker Discord Bot",
    "year": "2022",
    "category": "Bots",
    "description": "Paid referral system bot for Discord servers using SQLite to store and track invite counts.",
    "github": "https://github.com/Koala3353/Invite-Tracker"
  },
  {
    "slug": "google-sheet-credentials-maker",
    "title": "Google Sheet Credentials Maker",
    "year": "2022",
    "category": "Tools",
    "description": "Java utility that creates the necessary credentials to use the Google Sheets API.",
    "github": "https://github.com/Koala3353/Google-Sheet-Credentials-Maker"
  },
  {
    "slug": "f1x-discord-bot",
    "title": "F1X Discord Bot",
    "year": "2022",
    "category": "Bots",
    "description": "Paid bot simulating a bank where users can apply for loans and admins can manage user balances.",
    "github": "https://github.com/Koala3353/F1X-Bot"
  },
  {
    "slug": "ignite-discord-bot",
    "title": "Ignite Discord Bot",
    "year": "2021",
    "category": "Bots",
    "description": "Multipurpose bot for a church (GCCP) managed Discord server with every feature imaginable."
  },
  {
    "slug": "elo-discord-bot",
    "title": "ELO Discord Bot",
    "year": "2021",
    "category": "Bots",
    "description": "Paid bot that tracks and manages users' Elo ratings with commands to view and manipulate rankings.",
    "github": "https://github.com/Koala3353/elo-bot"
  },
  {
    "slug": "fighting-discord-bot",
    "title": "Fighting Discord Bot",
    "year": "2021",
    "category": "Bots",
    "description": "Paid RPG bot allowing users to collect items and join raids to fight custom-created monsters.",
    "github": "https://github.com/Koala3353/fight-bot"
  },
  {
    "slug": "userphone-discord-bot",
    "title": "Userphone Discord Bot",
    "year": "2021",
    "category": "Bots",
    "description": "Social bot promoting cross-server communication between strangers from different Discord servers.",
    "github": "https://github.com/Koala3353/Userphone"
  }
];

export const featuredProjects = projects.filter((p) => p.featured);
