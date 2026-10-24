# Dharun Ananth S — Portfolio

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=black)](https://greensock.com/gsap/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js&logoColor=white)](https://threejs.org/)
[![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?logo=github-actions&logoColor=white)](https://github.com/deryx002/Portfolio/actions)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?logo=githubpages&logoColor=white)](https://deryx002.github.io/Portfolio/)

Personal portfolio website showcasing software projects, technical skills, internships, and engineering education.

**Live Site:** https://deryx002.github.io/Portfolio/

---

## Sections

- **Hero:** Dynamic introduction featuring a typewriter role cycler, stroke text animations, ambient GPU-accelerated background gradients, and magnetic buttons.
- **About:** Background summary, engineering education at Sri Ramakrishna Institute of Technology, and core technical interests.
- **Skills:** Categorized technical toolkit (Languages, Frontend, Backend, Databases, Tools) with 3D tilt interaction, border glow highlights, logo loop ticker, and desktop 3D cube accents.
- **Projects:** Featured applications with tech tags, project descriptions, GitHub links, and detail modals:
  - *Interactive 3D Portfolio* (React, Three.js, GSAP, WebGL, Tailwind CSS)
  - *Bus Tracking System* (React, Node.js, REST APIs, Map SDK)
  - *AI Sales Analytics Agent* (Python, Machine Learning, NLP, Data Analytics, React)
  - *GST Billing System for Garments* (Python, SQL, Full Stack ERP)
- **Work Experience:** Industry internship history, roles, responsibilities, and key takeaways (Data Science Intern at LitzTec).
- **Achievements & Certifications:** Delivered milestones, academic metrics, and credentials from AWS, NPTEL, and Scaler.
- **Education:** B.E. in Computer Science & Engineering curriculum highlights and coursework.
- **Contact:** Interactive contact form integrated with EmailJS, direct contact channels (Email, Phone, Location), and social links (GitHub, LinkedIn).
- **Resume:** Dynamic resume download configured to automatically serve the latest document uploaded to the resume directory.

---

## Tech Stack

- **Frontend:** React 18, Tailwind CSS, Lucide React
- **Animations & 3D:** GSAP, Framer Motion, Lenis (Smooth Scroll), WebGL, Three.js
- **Form Handling:** EmailJS
- **Bundler & Tooling:** Vite, PostCSS, Autoprefixer
- **CI/CD & Hosting:** GitHub Actions, GitHub Pages

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
git clone https://github.com/deryx002/Portfolio.git
cd Portfolio
npm install
```

### Development

```bash
npm run dev
```

Runs the local development server at `http://localhost:3000`.

### Production Build

```bash
npm run build
```

Compiles the production-ready assets into the `dist/` directory.

---

## Deployment

The repository uses **GitHub Actions** (`.github/workflows/deploy.yml`) to automatically build and deploy the website to GitHub Pages on every commit pushed to the `main` branch.

---

## Acknowledgements & Credits

- [React Bits](https://reactbits.dev/) — For interactive UI animation components (including Cubes, Border Glow, and Logo Loop).
- [GSAP (GreenSock)](https://greensock.com/) — High-performance animation engine.
- [Lenis](https://lenis.darkroom.engineering/) — Smooth scroll library.
