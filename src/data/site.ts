// All of the site's copy lives here. Each eigenvalue on the matrix's diagonal opens one section.
// Text can contain a little inline HTML: <i>, <sub>, &amp; and links. In the About story,
// a link written as <a href="#research" data-k="2"> jumps to that section (data-k is its index, 0-4).

export const contact = {
  name: "Gordon Bie",
  email: "gordonbie2@gmail.com",
  cv: "/Bie_Gordon_CV.pdf",
  resume: "/Bie_Gordon_Resume.pdf", // add this file to /public
  linkedin: "https://www.linkedin.com/in/gordon-bie/",
  github: "https://github.com/GordonBie123",
};

// The eigenvalues the landing's matrix A is built from, one per section on the diagonal (About … Misc).
// λ₅ = 0: Misc is (for now) the null space
export const LAMBDA = [4.8, 3.7, 2.6, 1.4, 0];

// The landing's two captions: one over the mercury, one once the matrix has become Λ.
// "eigenvalues" links to /eigenvalues, a short explainer for anyone curious.
export const captions = {
  hello: "Hi, I'm Gordon.",
  done: 'My <a href="/eigenvalues">eigenvalues</a>.',
};

const about = {
  school: "Northeastern ’27",
  degree: "Bachelor of Science in International Business and Business Analytics, Minor in Data Science.",
  aside: "Found my way into ML and tech somehow!",
  story: [
    "From Vancouver, studied in London and Boston. This semester I’m in New York working as a SWE intern in quant trading.",
    'Prof. Bogert and Prof. Wu got me hooked on machine learning. I’ve since done <a href="#experience" data-k="1">some work in ML</a>, and I love spending time learning the theory through <a href="#misc" data-k="4">open-source materials</a>.',
  ],
  sidequest: "Exploring how ML can help us understand skin.",
};

// [name, one line on what it is, link, label on the right] — the "More Links!" list at the bottom of About.
// PDFs and profiles open in a new tab; the email row opens the mail app.
const links: [string, string, string, string][] = [
  ["CV", "For research!", contact.cv, "PDF"],
  ["Resume", "For industry!", contact.resume, "PDF"],
  ["Email", contact.email, `mailto:${contact.email}`, "Write"],
  ["LinkedIn", contact.linkedin.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, ""), contact.linkedin, "Profile"],
  ["GitHub", contact.github.replace(/^https:\/\//, ""), contact.github, "Code"],
];

// [years, role, organisation, what you did]
const roles: [string, string, string, string][] = [
  ["2026 – now", "Software Engineer", "Flow Traders · Internship", "Building infrastructure, tooling and agents for quantitative HFT."],
  ["2026 – 2026", "Machine Learning Engineer", "Cortex · Contract", "Developed an intelligent & searchable knowledge graph for hardware engineering design."],
  ["2025 – 2025", "Machine Learning Engineer", "State Street Corporation · Internship", "Developed internal AI tooling to automate financial report writing."],
  ["2025 – 2025", "Data Analyst", "State Street Investment Management · Internship", "Analyzed hedge fund & asset owner feedback with NLP to inform investment services."],
  ["2024 – 2024", "Data Analyst", "Apple · Contract", "Analyzed consumer product feedback and trends with NLP to inform product decisions."],
];

// [name, description, image in /public/images/projects, GitHub link]
const projects: [string, string, string, string][] = [
  ["Unsprawl", "Consolidates and dedupes workflows across Slack, Trello and Jira with LLMs and vector embeddings.", "unsprawl.png", "https://github.com/GordonBie123/unsprawl_project"],
  ["Relaylist", "Analyses the sentiment of a conversation and turns it into an emotion-based Spotify playlist.", "relaylist4.jpg", "https://github.com/GordonBie123/relaylist"],
  ["Options volatility surface", "Visualises the implied volatility surface of stock options with Black–Scholes.", "opvol.jpg", "https://github.com/GordonBie123/Options-Volatility-Surface"],
  ["This website", "Next.js and TypeScript, with a lot of liquid metal.", "portfolio1.jpg", "https://github.com/GordonBie123/portfolio-website"],
];

const teaching: [string, string, string, string][] = [
  ["2026 – now", "Linear Algebra Teaching Assistant", "Northeastern", "Vector spaces, linear transformations, eigenvalues and orthogonality."],
  ["2024 – 2026", "Calculus Tutor", "Northeastern", "Differential equations, integration and multivariable calculus."],
  ["2023 – now", "High School Maths Tutor", "Indigo Education", "IB Math AA HL and AP Calculus AB/BC."],
  ["2024 – 2025", "Statistics Tutor", "Northeastern", "Probability, hypothesis testing and regression."],
  ["2023 – 2025", "Analytical Writing Tutor", "Indigo Education", "Analytical writing and reading comprehension."],
];

// [years, role, org · type, what]: same shape as roles
const researchRoles: [string, string, string, string][] = [
  ["2026 – now", "Research Assistant", "Northeastern Marine Science Center · Contract", "NLP methods in marine sciences to model oceans."],
  ["2025 – 2026", "Research Assistant", "Northeastern College of Engineering · Part-time", "NLP methods in autonomous semiconductor manufacturing."],
  ["2024 – now", "Research Scientist", "Skinapse Labs", "Founding technical staff at an AI dermatology startup, leading lesion classification models."],
];

// [group, items]: shown as a spec table on the Experience page
const skills: [string, string[]][] = [
  ["Programming & Query Languages", ["Python", "R", "SQL", "JavaScript", "TypeScript", "CSS/HTML", "Racket", "Cypher"]],
  ["Frameworks & Libraries", ["scikit-learn", "TensorFlow", "PyTorch", "JAX", "SciPy", "NumPy", "Pandas", "Seaborn", "FastAPI", "React", "Node.js"]],
  ["Tools", ["Git", "Linux", "PowerShell", "Claude Code", "Ansible", "AWX", "Docker", "Kubernetes", "ArgoCD", "Airflow", "Prometheus", "Grafana"]],
  ["Databases", ["MySQL", "PostgreSQL/pgvector", "SQLite", "MongoDB", "Neo4j", "Kuzu", "AWS S3", "OracleSQL 12"]],
  ["Natural Languages", ["Chinese", "Japanese", "French", "Spanish", "English"]],
];

// [year, title, authors · venue, status]
const posters: [string, string, string, string][] = [
  ["2026", "Applying NLP techniques to high-frequency multivariate time-series data in manufacturing machinery", "Bie, G., &amp; Jin, X. · RISE Expo, Northeastern", "Presented"],
  ["2026", "A multinomial and permutation-based framework for modeling spatial relationships among acne lesion classes", "Nguyen, J., Shah, E., Simeone, J., Kim, A., Bie, G., &amp; Nguyen, J. · Southeastern Medical Scientist Symposium", "Under review"],
  ["2026", "Spatial neighborhood patterns as contextual features for acne lesion classification", "Nguyen, J., Shah, E., Simeone, J., Kim, A., Bie, G., &amp; Nguyen, J. · American Academy of Dermatology", "Under review"],
];

const curious: [string, string][] = [
  ["Operations decisions", "Causal ML for product rollouts with spillovers, delayed feedback, and fair customer service design."],
  ["Dynamic marketplaces", "Matching and pricing on platforms when participants value jobs differently and act strategically."],
  ["Collective intelligence", "When human–AI collaboration beats delegation, and whether mediation helps teams decide better."],
  ["Agentic AI and human capital", "Whether AI gains require workflow redesign, and how they reshape worker skills and roles."],
];

// The Sidequests page: hobbies and side jobs as points on two axes, drawn by src/lib/eigen/embedding.ts.
// kind: "hobby", "job" or "both"; short is the name on the plot; at is [x, y] from 0 to 1 on the axes below
// (a label sits left of its point once x passes .7).
export type Interest = { id: string; title: string; short: string; kind: "hobby" | "job" | "both"; org?: string; meta: string; desc: string; cta: string; at: [number, number] };
export const interestMap: { items: Interest[]; kinds: Record<Interest["kind"], string>; axes: { x: [string, string]; y: [string, string] } } = {
  items: [
    { id: "chess", title: "Chess", short: "Chess", kind: "hobby", meta: "1700 puzzles · 1500 rapid · 1100 blitz", desc: "Not very good. Puzzles daily, and games in Harvard Square over the summer.", cta: "Challenge me to a game →", at: [.08, .10] },
    { id: "league", title: "League of Legends", short: "League", kind: "hobby", meta: "ARAM enjoyer", desc: "Every now and then with friends. Used to be top 1%, and played competitively at university for a bit.", cta: "Queue up an ARAM →", at: [.40, .07] },
    { id: "matcha", title: "Matcha", short: "Matcha", kind: "hobby", meta: "Whisking · tasting · spending money", desc: "Enjoyer since birth. Let’s connect and have matcha.", cta: "Let’s get matcha →", at: [.42, .30] },
    { id: "fashion", title: "Fashion", short: "Fashion", kind: "hobby", meta: "Heritage · engineering · trend", desc: "Cool clothes and accessories, and the stories about the people and history behind every piece.", cta: "Talk clothes with me →", at: [.13, .33] },
    { id: "watches", title: "Vintage watches", short: "Watches", kind: "both", org: "eBay", meta: "eBay business · 2024 – now", desc: "I curate and sell vintage watches and watch parts on eBay.", cta: "Ask me about a watch →", at: [.10, .54] },
    { id: "pastry", title: "Pastry chef", short: "Pastry chef", kind: "both", org: "Swan Bakery, London", meta: "London · 2023 – 2024", desc: "Pastries, cakes and tarts, and the lesson that professional baking is not all sunshine.", cta: "Ask me for a recipe →", at: [.44, .60] },
    { id: "bar", title: "Bartender and waiter", short: "Bartender", kind: "job", org: "Noodle and Beer, London", meta: "London · 2023 – 2024", desc: "Behind the bar and on the floor at a noodle bar in London.", cta: "Ask me where to eat in London →", at: [.76, .46] },
    { id: "consult", title: "Junior associate consultant", short: "Consultant", kind: "job", org: "Global Research &amp; Consulting Group", meta: "2024 – 2025", desc: "Strategic analysis and operational recommendations for international organisations and public-sector clients.", cta: "Ask me about consulting →", at: [.46, .76] },
    { id: "generate", title: "Data science technical lead", short: "Generate", kind: "job", org: "Generate Product Development Studio", meta: "2025 – 2026", desc: "Technical lead at a student-run product studio building ML and AI software for startups.", cta: "Pitch me your startup →", at: [.24, .92] },
    { id: "disrupt", title: "Marketing coordinator", short: "Disrupt", kind: "job", org: "Disrupt Fintech Society", meta: "2024 – 2025", desc: "Planned, marketed and ran events for students in fintech: hackathons, panels and research talks.", cta: "Ask me about Disrupt →", at: [.88, .88] },
    { id: "ambassador", title: "Global program alumni ambassador", short: "Ambassador", kind: "job", org: "Northeastern Office of Global Experience", meta: "2024 – 2025", desc: "Planned and gave talks on Northeastern’s global programs for prospective and incoming students.", cta: "Ask me about studying abroad →", at: [.95, .70] },
    { id: "mentor", title: "BSIB student mentor", short: "Mentor", kind: "job", org: "D’Amore-McKim School of Business", meta: "2026 – now", desc: "Mentoring undergraduates in the BSIB program on course planning, careers and study abroad.", cta: "Ask me about BSIB →", at: [.62, .98] },
  ],
  kinds: { hobby: "Hobby", job: "Side job", both: "Hobby and side job" },
  // what the two axes of the plot mean, low end first
  axes: { x: ["on my own", "with people"], y: ["play", "work"] },
};

const misc: [string, string][] = [
  ["Thoughts", "Writing on machine learning and whatever else I’m thinking about."],
  ["Learning materials", "The open-source courses, books and notes I’ve learned the most from."],
];

// ---------- how each section is laid out (edit the data above, not this) ----------
const row = ([y, r, o, w]: string[]) =>
  `<div class="row"><div class="yr">${y}</div><div><div class="role">${r}</div><div class="org">${o}</div></div><div class="what">${w}</div></div>`;
// Research interests as vectors on a unit circle; app.ts swings the needle to the picked one.
const dial = (items: [string, string][]) => {
  const ang = (i: number) => 45 + (i * 360) / items.length, f = (v: number) => v.toFixed(3);
  const ticks = Array.from({ length: 72 }, (_, t) => {
    const th = (t * 5 * Math.PI) / 180, r0 = t % 18 ? 0.93 : 0.86;
    return `<line x1="${f(r0 * Math.cos(th))}" y1="${f(r0 * Math.sin(th))}" x2="${f(Math.cos(th))}" y2="${f(Math.sin(th))}"/>`;
  }).join("");
  const pts = items.map((_, i) => {
    const th = (ang(i) * Math.PI) / 180, x = Math.cos(th), y = -Math.sin(th);
    return `<g class="pt${i ? "" : " on"}" transform="translate(${f(x)} ${f(y)})"><circle class="hit" r=".2"/><circle class="halo" r=".1"/><circle class="dot" r=".045"/><text x="${f(x * 0.22)}" y="${f(y * 0.22)}">v<tspan class="s" dy=".04">${i + 1}</tspan></text></g>`;
  }).join("");
  return `<div class="dial"><svg viewBox="-1.34 -1.34 2.68 2.68" aria-hidden="true">
    <g class="axes"><line x1="-1.12" y1="0" x2="1.12" y2="0"/><line x1="0" y1="-1.12" x2="0" y2="1.12"/></g>
    <circle class="ring" r="1"/><g class="ticks">${ticks}</g>
    <g class="needle" style="transform:rotate(${-ang(0)}deg)"><line x1="0" y1="0" x2=".8" y2="0"/><path d="M.93 0 .78 -.055 .78 .055Z"/></g><circle class="hub" r=".035"/>${pts}</svg>
    <div class="dial-list">${items.map(([t, d], i) => `<div class="dial-item${i ? "" : " on"}" data-a="${ang(i)}"><button type="button" aria-expanded="${!i}"><span>v<sub>${i + 1}</sub></span>${t}</button><div class="d"><div><p>${d}</p></div></div></div>`).join("")}</div></div>`;
};
const tile = (t: string, d: string, m?: string) =>
  `<article class="tile"><h3>${t}</h3><p>${d}</p>${m ? `<div class="meta">${m}</div>` : ""}</article>`;

export type Section = {
  id: string;
  name: string;   // on the matrix diagonal
  short: string;  // on the diagonal on phones
  title?: string; // page title, if it differs from name
  lede?: string;
  head?: string;
  portrait?: string;
  body: () => string;
};

export const SECTIONS: Section[] = [
  {
    id: "about", name: "About", title: "About me", short: "About",
    head: `<div class="intro-lines"><p class="school">${about.school}</p><p class="degree">${about.degree}</p><p class="aside">${about.aside}</p></div>`,
    portrait: '<img class="portrait" src="/avatar.jpg" alt="Illustrated portrait of Gordon" width="176" height="176">',
    body: () => `<div class="story">${about.story.map((p) => `<p>${p}</p>`).join("")}
      <p class="side"><span class="side-k"><i aria-hidden="true"></i>Current Sidequest</span>${about.sidequest}</p></div>
      <section class="docs" aria-labelledby="docsTitle">
        <h2 id="docsTitle">More Links!</h2>
        <ul>${links.map(([name, note, href, meta]) => {
          const mail = href.startsWith("mailto:");
          const label = mail ? `Email ${note}` : `${name} (${meta === "PDF" ? "PDF, " : ""}opens in a new tab)`;
          return `<li><a href="${href}"${mail ? "" : ' target="_blank" rel="noopener"'} aria-label="${label}"><span class="d-name">${name}</span><span class="d-note">${note}</span><span class="d-meta">${meta}<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 2h6v6M10 2 3 9"/></svg></span></a></li>`;
        }).join("")}</ul>
      </section>`,
  },
  {
    id: "experience", name: "Experience", short: "Exp.",
    body: () => `<h2 style="margin-top:56px">Industry Roles</h2><div class="spec">${roles.map(row).join("")}</div>
      <h2>Projects</h2><div class="tiles">${projects.map(([t, d, img, url]) =>
        `<article class="tile"><h3>${t}</h3><p>${d}</p><div class="shot" style="background-image:url(/images/projects/${img})"></div><div class="meta"><a href="${url}">View on GitHub ›</a></div></article>`).join("")}</div>
      <h2>Teaching Roles</h2><div class="spec">${teaching.map(row).join("")}</div>
      <h2>Skills</h2><div class="spec skills">${skills.map(([k, xs]) => `<div class="row"><h3 class="yr">${k}</h3><div class="chips">${xs.map((x) => `<span>${x}</span>`).join("")}</div></div>`).join("")}</div>`,
  },
  {
    id: "research", name: "Research", short: "Rsrch",
    body: () => `<h2 style="margin-top:56px">Research Roles</h2><div class="spec">${researchRoles.map(row).join("")}</div>
      <h2>Papers &amp; Posters</h2><div class="spec">${posters.map(([y, t, a, s]) =>
        `<div class="row"><div class="yr">${y}</div><div class="role" style="grid-column:span 2">${t}<div class="org" style="font-weight:400;margin-top:4px">${a}</div><span class="tag">${s}</span></div></div>`).join("")}</div>
      <h2>What I’m curious about</h2>${dial(curious)}`,
  },
  {
    id: "sidequests", name: "Sidequests", short: "Side",
    // app.ts brings this to life with embedding.ts
    body: () => `<div class="emb" style="margin-top:56px">
      <div><div class="emb-stage"><svg role="group" aria-label="My hobbies and side jobs, plotted from ${interestMap.axes.x.join(" to ")} and from ${interestMap.axes.y.join(" to ")}"></svg></div>
        <p class="emb-hint">tap anywhere · arrow keys move between points</p></div>
      <div class="emb-card" aria-live="polite"></div></div>`,
  },
  {
    id: "misc", name: "Misc", short: "Misc",
    body: () => `<div class="tiles" style="margin-top:56px">${misc.map(([t, d]) => tile(t, d, "Coming soon")).join("")}</div>`,
  },
];
