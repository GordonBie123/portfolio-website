# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

All four audiences matter, with no single one dominant:

- **AI/ML recruiters and hiring managers** screening for ML, AI and SWE internships and new-grad roles.
- **Research PIs, labs and PhD admissions** judging research potential and depth.
- **Startup people** (co-founders, investors, builders) sizing up Gordon as a builder.
- **Peers, friends and the curious internet**, who come for the personality.

Visitors usually arrive from a link (LinkedIn, CV, email signature, GitHub) and give the site well under a minute before deciding whether to dig in.

## Product Purpose

Gordon Bie's personal portfolio. It shows his passion for AI and machine learning and his personality, and turns interest into a conversation. Success is a visitor emailing him.

## Positioning

**An ML researcher with an unconventional route in.** He studies business analytics and international business at Northeastern, does applied ML research (time-series tokenization for multivariate machine signals, spatial priors for acne lesion classification), and ships AI in industry (Flow Traders, Cortex, State Street). His research interests are about how ML and AI change the way people and organizations make decisions. The site should leave visitors thinking "this person does real ML research" first, with the business and builder angles as supporting depth.

## Operating Context

- Primary action: **email Gordon** (`contact.email` in `src/data/site.ts`). Secondary: the CV PDF, GitHub, LinkedIn.
- Visitors skim on desktop and on phones (links opened from LinkedIn or Messages).

## Capabilities and Constraints

- Next.js 16 / React 19 / TypeScript, with three.js for the WebGL landing. Fonts (Computer Modern) are self-hosted in `public/fonts/cmu`.
- All page copy lives in `src/data/site.ts`; the landing engine is `src/lib/eigen/app.ts` and the page shell is `src/components/EigenSite.tsx`.
- The site is one page: a mercury blob that tells a short story and eigendecomposes into Λ, whose diagonal (About, Experience, Research, Interests, Misc) opens each section as a sheet at `/#<id>`. Old routes redirect there (`next.config.ts`).
- The approved design mockup is `design/mockups/eigen-flow.html`.

## Brand Commitments

- Name: Gordon Bie.
- The user pinned the palette: **chrome silver and metal grey, with matcha green accents**. They like **liquid glass** and asked for Apple design principles and fun interactivity.
- Personality signals the user volunteered: matcha, contemporary fashion design (heritage + functional engineering + trends), cooking, board and video games, music discovery, vintage watches.

## Evidence on Hand

- Profile, bio, links: `src/data/profile.ts`; headshot `public/avatar.jpg`.
- Experience (7 professional, 2 research, 4 teaching) with logos: `src/data/experience.ts`, `public/logos/`.
- Projects (6) with images and GitHub links: `src/data/projects.ts`, `public/images/projects/`.
- Research interests and overview: `src/data/research.ts`; posters, education, honors: `src/data/cv.ts`; CV PDF `public/Bie_Gordon_CV.pdf`.
- Side quests (matcha, fashion, eBay watch business, societies): `src/data/sidequests.ts`. Skills: `src/data/skills.ts`. Spotify top tracks: `src/data/spotify.ts`.
- Absent, and not to be fabricated: publications beyond the listed posters, testimonials, metrics on research results, the startup's name or traction.

## Product Principles

1. **Research first, résumé second.** Lead with the ML thinking and the work; titles and logos support it.
2. **Personality is evidence.** Matcha, fashion and games show who he is and belong in the experience, not in a footnote.
3. **Every path ends at an email.** Wherever a visitor's curiosity peaks, contact is one move away.
4. **Show, don't claim.** Interactivity should demonstrate ML ideas, not decorate them.

## Accessibility & Inclusion

Heavy motion is requested, so `prefers-reduced-motion` must get a calm, complete version. Text over glass and chrome must keep WCAG AA contrast.
