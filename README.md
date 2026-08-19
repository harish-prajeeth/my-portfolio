# Harish Prajeeth A S — Portfolio

A dark, emerald-and-gold portfolio built on the architecture you spec'd: Next.js 16 (App Router) + React 19 + TypeScript, an R3F/Three.js neural-network-globe hero, GSAP-ready scroll sections, and Framer Motion micro-interactions — all driven by your real resume data.

## What's actually implemented vs. simplified

Your brief was a full production spec (thousands-node GPU-instanced network, multi-stage hero cinematic, 3D city with moving cars, holographic terminal, etc.). I built every **section** in the architecture with real, working code, but simplified a few of the most elaborate 3D set-pieces so this ships as something you can run today rather than a half-finished mega-project:

| Section | Status |
|---|---|
| Loading experience (boot sequence) | Built |
| Hero — neural network + globe, mouse parallax | Built (single coherent scene of ~260 fibonacci-distributed nodes + connections + wireframe globe, instead of the full black→particles→network→compression→globe cinematic sequence) |
| About — clickable timeline | Built |
| Engineering Philosophy | Built (folded into About) |
| Skills — interactive graph | Built (2D radial graph with hover-expand; not a full 3D force graph) |
| Experience — scroll timeline | Built |
| Projects — DistillHub & SmartCityAI pipeline visualizers | Built (interactive stage pipeline; not a live simulation/3D city) |
| Certifications | Built |
| Contact — terminal-style links + form | Built (form opens the user's mail client — wire to an API route for silent sends) |
| Outro | Built |

Extension points are called out below so you (or I, in a follow-up) can push any of these further — e.g. swapping the skills graph for a real `@react-three/fiber` 3D graph, or building the SmartCityAI 3D scene.

## Stack

- Next.js 16 (App Router, Turbopack) · React 19 · TypeScript
- Tailwind CSS v4 (CSS-variable design tokens in `app/globals.css`, matching your color/spacing/radius/shadow system)
- `three` + `@react-three/fiber` + `@react-three/drei` for the hero scene
- `framer-motion` for section/element animation
- `gsap` installed and ready for any timeline-based sequences you add

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
app/
  layout.tsx        — metadata, fonts, global shell
  page.tsx           — assembles all sections behind the loader
  globals.css         — design tokens (color, spacing, radius, shadows, type)
components/
  hero/               — Hero.tsx (text/CTA), HeroScene.tsx (R3F canvas)
  about/              — timeline + engineering philosophy
  skills/             — radial interactive skill graph
  experience/         — scroll timeline
  projects/           — project cards + Pipeline.tsx (stage visualizer)
  certifications/
  contact/            — link terminal + message form
  shared/             — Loader.tsx, Nav.tsx, Outro.tsx
lib/
  data.ts             — every piece of resume content lives here — edit this
                          file to update copy/projects/skills without touching
                          any component
public/
  resume.pdf          — generated from your uploaded resume; replace anytime
```

## Editing content

Everything text-based (name, roles, summary, skills, experience, projects,
certifications, links) lives in **`lib/data.ts`**. You should never need to
edit a component file just to change wording.

## Deploying to Vercel

This replaces your existing `harishp20.vercel.app` project:

1. Push this folder to a GitHub repo.
2. In Vercel, import the repo (or, if you're reusing the existing project, point it at the new repo/branch).
3. Framework preset: Next.js (auto-detected). No environment variables required.
4. Deploy.

Or via CLI:
```bash
npm i -g vercel
vercel --prod
```

## Suggested next passes (in priority order)

1. **Real screenshots/GIFs** for the non-featured projects (Stock Predictor, Digital Doctor, NeuroSim) — currently text-only cards.
2. **Company logos** for Experience cards (LitzTech, Adroit, Gradtwin) — drop SVGs/PNGs into `public/logos/` and reference in `lib/data.ts`.
3. **Silent contact form** — add `app/api/contact/route.ts` using Resend or Nodemailer instead of the mailto redirect.
4. **GSAP scroll-pinning** for the hero (camera dolly through boot → network → globe) if you want the full cinematic sequence from your spec.
5. **Draco/KTX2 assets + LOD** — only relevant once you add real 3D models (e.g. the SmartCityAI city scene); the current hero scene is lightweight enough (~260 points) not to need it.

## Performance notes

- The hero canvas is dynamically imported with `ssr: false` and capped at `dpr: [1, 1.8]` to stay smooth on laptops/mobile.
- `prefers-reduced-motion` is respected globally in `globals.css`.
- All other sections are pure DOM/CSS + Framer Motion `whileInView`, so nothing but the hero touches the GPU — this is why performance should already sit near your 60fps+ targets without further optimization work.
