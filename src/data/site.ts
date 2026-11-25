// All of the site's copy lives here. Each eigenvalue on the matrix's diagonal opens one section.
// Text can contain a little inline HTML: <i>, <sub>, &amp; and links. In the About story,
// a link written as <a href="#research" data-k="2"> jumps to that section (data-k is its index, 0-4).

export const contact = {
  name: "Gordon Bie",
  email: "gordonbie2@gmail.com",
  cv: "/Bie_Gordon_CV.pdf",
  linkedin: "https://www.linkedin.com/in/gordon-bie/",
  github: "https://github.com/GordonBie123",
};

export const slides = [
  "Hi, I'm Gordon.",
  "A matrix is just numbers in a grid.",
  "But arranged right,<br>it can describe almost anything.",
  "Let <i>A</i> be me: everything I’ve done,<br>and everything I value.",
  "Its eigenvalues are its essence.<br>They stay the same, however you look at it.",
  "So take its eigendecomposition:<br><i>A</i> = <i>Q</i>Λ<i>Q</i><sup>T</sup>.",
  "These are my eigenvalues.",
];

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

// [years, role, organisation, what you did]
const roles: [string, string, string, string][] = [
  ["2026 – now", "Software engineer intern", "Flow Traders · New York", "Infrastructure, CI/CD pipelines and an AI diagnostics agent for high-frequency trading."],
  ["2026", "Machine learning engineer intern", "Cortex · Boston", "GraphRAG knowledge-graph search for hardware engineering research."],
  ["2025", "Artificial intelligence engineer intern", "State Street · Boston", "An LLM agent app that automates GAAP-compliant audit reports."],
  ["2025", "Data scientist intern", "Northeastern Sherman Center for Engineering", "RAG-based agentic deduplication of tasks across Slack, Jira and Trello."],
  ["2025", "Client experience analyst intern", "State Street Investment Management", "Client sentiment insights and decks for sales leadership."],
  ["2025 – 2026", "Data science technical lead", "Generate Product Development Studio", "Technical lead building ML and AI products for startups."],
  ["2024", "Marketing analytics extern", "Apple · Remote", "Survey analytics, dashboards and NLP sentiment for consumer audio."],
  ["2023 – 2025", "CRM and sales analyst intern", "Indigo Education · Vancouver", "Client support, retention and sales for an education agency."],
];

// [name, description, image in /public/images/projects, GitHub link]
const projects: [string, string, string, string][] = [
  ["Unsprawl", "Consolidates and dedupes workflows across Slack, Trello and Jira with LLMs and vector embeddings.", "unsprawl.png", "https://github.com/GordonBie123/unsprawl_project"],
  ["Relaylist", "Analyses the sentiment of a conversation and turns it into an emotion-based Spotify playlist.", "relaylist4.jpg", "https://github.com/GordonBie123/relaylist"],
  ["SP500 predictor", "Compares LSTMs, XGBoost and random forests on S&amp;P 500 prices.", "sp500s.jpg", "https://github.com/GordonBie123/sp500_predictor_v2"],
  ["Options volatility surface", "Visualises the implied volatility surface of stock options with Black–Scholes.", "opvol.jpg", "https://github.com/GordonBie123/Options-Volatility-Surface"],
  ["Coke–Pepsi pairs trading", "A market-neutral strategy on cointegration and z-score signals between KO and PEP.", "cokepep.jpg", "https://github.com/GordonBie123/Coke-Pepsi-Pairs-Trading"],
  ["This website", "Next.js and TypeScript, with a lot of liquid metal.", "portfolio1.jpg", "https://github.com/GordonBie123/portfolio-website"],
];

const teaching: [string, string, string, string][] = [
  ["2024 – now", "Calculus tutor", "Northeastern", "Differential equations, integration and multivariable calculus."],
  ["2023 – now", "High school maths tutor", "Indigo Education", "IB Math AA HL and AP Calculus AB/BC."],
  ["2024 – 2025", "Statistics tutor", "Northeastern", "Probability, hypothesis testing and regression."],
  ["2023 – 2025", "Analytical writing tutor", "Indigo Education", "Analytical writing and reading comprehension."],
];

const toolkit = ["Python", "R", "SQL", "TypeScript", "PyTorch", "TensorFlow", "JAX", "scikit-learn", "FastAPI", "React", "Docker", "Kubernetes", "Airflow", "PostgreSQL / pgvector", "Neo4j", "Kuzu"];

// [title, description, meta line]
const research: [string, string, string][] = [
  ["Reading machines like a language.", "Tokenizing high-frequency, multivariate machine signals so sequence models can read them the way they read text.", "Research assistant · Northeastern College of Engineering · 2025 – now"],
  ["Lesions, in context.", "Spatial priors and colour features for acne lesion classification.", "Research scientist · Skinapse Labs · 2024 – now"],
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

const interests: [string, string, string][] = [
  ["Matcha", "Enjoyer since birth. Let’s connect and have matcha.", "Whisking · tasting · spending money"],
  ["Fashion", "Cool clothes and accessories, and the stories about the people and history behind every piece.", "Heritage · engineering · trend"],
  ["Vintage watches", "I curate and sell vintage watches and watch parts on eBay.", "eBay business · 2024 – now"],
  ["Pastry", "Pastry chef at Swan Bakery in London. Pastries, cakes and tarts, and the lesson that professional baking is not all sunshine.", "London · 2023 – 2024"],
  ["Chess", "Not very good. Puzzles daily, and games in Harvard Square over the summer.", "1700 puzzles · 1500 rapid · 1100 blitz"],
  ["League of Legends", "Every now and then with friends. Used to be top 1%, and played competitively at university for a bit.", "ARAM enjoyer"],
];

const also: [string, string, string][] = [
  ["2026 – now", "BSIB student mentor", "D'Amore-McKim School of Business"],
  ["2024 – 2025", "Global program alumni ambassador", "Northeastern Office of Global Experience"],
  ["2024 – 2025", "Junior associate consultant", "Global Research &amp; Consulting Group"],
  ["2023 – 2024", "Bartender and waiter", "Noodle and Beer, London"],
];

const misc: [string, string][] = [
  ["Thoughts", "Writing on machine learning and whatever else I’m thinking about."],
  ["Learning materials", "The open-source courses, books and notes I’ve learned the most from."],
  ["And more", "Everything that doesn’t fit the other four eigenvalues."],
];

// ---------- how each section is laid out (edit the data above, not this) ----------
const row = ([y, r, o, w]: string[]) =>
  `<div class="row"><div class="yr">${y}</div><div><div class="role">${r}</div><div class="org">${o}</div></div><div class="what">${w}</div></div>`;
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
      <section class="cv" aria-labelledby="cvTitle">
        <svg class="doc" viewBox="0 0 48 60" fill="none" aria-hidden="true"><path d="M6 2h26l12 12v42a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#fff" stroke="#c7c7cc" stroke-width="1.5"/><path d="M32 2v10a2 2 0 0 0 2 2h10" stroke="#c7c7cc" stroke-width="1.5"/><path d="M11 24h22M11 30h26M11 36h18M11 42h24M11 48h14" stroke="#d8d8dc" stroke-width="2" stroke-linecap="round"/><path d="M11 17h12" stroke="#8a9a5b" stroke-width="2.5" stroke-linecap="round"/></svg>
        <div class="cv-t"><h2 id="cvTitle">CV</h2></div>
        <div class="cv-a"><a class="btn-dark" href="${contact.cv}" target="_blank" rel="noopener" aria-label="Open CV (PDF, opens in a new tab)">Open<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M4 2h6v6M10 2 3 9"/></svg></a></div>
      </section>`,
  },
  {
    id: "experience", name: "Experience", short: "Exp.",
    lede: "Infrastructure for a trading firm, agents for a bank, retrieval for a hardware lab, and the projects in between.",
    body: () => `<h2 style="margin-top:56px">Roles</h2><div class="spec">${roles.map(row).join("")}</div>
      <h2>Projects</h2><div class="tiles">${projects.map(([t, d, img, url]) =>
        `<article class="tile"><h3>${t}</h3><p>${d}</p><div class="shot" style="background-image:url(/images/projects/${img})"></div><div class="meta"><a href="${url}">View on GitHub ›</a></div></article>`).join("")}</div>
      <h2>Teaching</h2><div class="spec">${teaching.map(row).join("")}</div>
      <h2>Toolkit</h2><div class="chips">${toolkit.map((s) => `<span>${s}</span>`).join("")}</div>`,
  },
  {
    id: "research", name: "Research", short: "Rsrch",
    lede: "Right now: time-series tokenization for manufacturing machinery, and spatial modelling for acne lesions.",
    body: () => `<h2 style="margin-top:56px">Current work</h2><div class="tiles">${research.map(([t, d, m]) => tile(t, d, m)).join("")}</div>
      <h2>Posters</h2><div class="spec">${posters.map(([y, t, a, s]) =>
        `<div class="row"><div class="yr">${y}</div><div class="role" style="grid-column:span 2">${t}<div class="org" style="font-weight:400;margin-top:4px">${a}</div><span class="tag">${s}</span></div></div>`).join("")}</div>
      <h2>What I'm curious about</h2><div class="tiles">${curious.map(([t, d]) => tile(t, d)).join("")}</div>`,
  },
  {
    id: "interests", name: "Interests", short: "Intr.",
    lede: "What I do with nobody watching, and a few jobs that taught me more than they meant to.",
    body: () => `<div class="tiles" style="margin-top:56px">${interests.map(([t, d, m]) => tile(t, d, m)).join("")}</div>
      <h2>Also</h2><div class="spec">${also.map(([y, r, o]) => `<div class="row"><div class="yr">${y}</div><div class="role">${r}</div><div class="what">${o}</div></div>`).join("")}</div>`,
  },
  {
    id: "misc", name: "Misc", short: "Misc",
    lede: "My thoughts, learning materials and more. λ<sub>5</sub> = 0 for now: nothing here yet, which makes <i>A</i> singular.",
    body: () => `<div class="tiles three" style="margin-top:56px">${misc.map(([t, d]) => tile(t, d, "Coming soon")).join("")}</div>`,
  },
];
