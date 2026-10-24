# Dharun Ananth S — Portfolio

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
