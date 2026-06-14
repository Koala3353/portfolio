# Keene Xander Brigado | Portfolio 2026

Welcome to the source code of my 2026 personal portfolio! This website serves as a central hub for my professional journey, bridging the gap between full-stack development, operations, and AI. 

🌐 **Live Demo:** [koala3353.github.io/portfolio](https://koala3353.github.io/portfolio/)

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** GitHub Pages

## ✨ Key Features

- **Modern UI/UX:** Sleek dark-mode aesthetic with custom gradients, glassmorphism, and responsive Tailwind grids.
- **Dynamic Animations:** Extensive use of Framer Motion for scroll-linked parallax, page transitions, and staggered card reveals.
- **Automated Resume Pipeline:** A custom `prebuild` script securely fetches the absolute latest PDF resume from a centralized repository (`Koala3353/Koala3353`) via a GitHub Actions `repository_dispatch` webhook right before building.
- **Easter Eggs:** Try to find the fully-playable, touch-responsive virtual Snake Game hidden inside the 404 page! 🐍

## 🛠️ Getting Started

First, clone the repository and install the dependencies:

```bash
git clone https://github.com/Koala3353/portfolio.git
cd portfolio
npm install
```

Next, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

*(Note: If you run `npm run build`, the `prebuild` script will execute and automatically fetch the latest resume PDF into your `public/` directory).*

## 📄 License

This project is open-source and available under the MIT License. Feel free to fork and use it as inspiration for your own portfolio!
