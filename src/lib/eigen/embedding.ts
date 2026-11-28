// The Sidequests page: every hobby and side job is a point on two axes you can read. Each point owns the patch of
// plot nearest to it (its Voronoi cell, the 1-nearest-neighbour region), so a tap anywhere picks a sidequest, and
// its two nearest neighbours light up. Drawn at 1 unit = 1px so the labels stay legible on phones.
import { contact, interestMap, type Interest } from "@/data/site";

type Pt = [number, number];
const { items, kinds, axes } = interestMap;
const BY: Record<string, Interest> = Object.fromEntries(items.map((it) => [it.id, it]));

/** One Sutherland–Hodgman pass: the part of a convex polygon where a·x + b·y <= c. */
function clip(poly: Pt[], a: number, b: number, c: number): Pt[] {
  const out: Pt[] = [];
  poly.forEach((p, i) => {
    const q = poly[(i + 1) % poly.length], fp = a * p[0] + b * p[1] - c, fq = a * q[0] + b * q[1] - c;
    if (fp <= 0) out.push(p);
    if ((fp <= 0) !== (fq <= 0)) { const t = fp / (fp - fq); out.push([p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]); }
  });
  return out;
}
/** Each point's Voronoi cell: the box, cut by the perpendicular bisector with every other point. */
const voronoi = (pts: Pt[], box: Pt[]) => pts.map((p, i) => pts.reduce((poly, q, j) => i === j ? poly
  : clip(poly, 2 * (q[0] - p[0]), 2 * (q[1] - p[1]), q[0] ** 2 + q[1] ** 2 - p[0] ** 2 - p[1] ** 2), box));
const dist = (a: string, b: string) => Math.hypot(BY[a].at[0] - BY[b].at[0], BY[a].at[1] - BY[b].at[1]);
const near = (id: string) => items.map((it) => it.id).filter((j) => j !== id).sort((a, b) => dist(id, a) - dist(id, b)).slice(0, 2);

/** Wires one Sidequests plot. Returns a cleanup function. */
export function wireEmbedding(root: HTMLElement): () => void {
  const svg = root.querySelector("svg")!, stage = root.querySelector<HTMLElement>(".emb-stage")!, card = root.querySelector<HTMLElement>(".emb-card")!;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const px: Record<string, Pt> = {};
  let sel = "matcha", width = 0;

  function draw(W: number) {
    const H = Math.round(W < 520 ? W * 1.3 : W * .68), L = 46, R = W - 4, T = 8, B = H - 30, pad = 22;
    for (const it of items) px[it.id] = [L + pad + it.at[0] * (R - L - 2 * pad), B - pad - it.at[1] * (B - T - 2 * pad)];
    const cells = voronoi(items.map((it) => px[it.id]), [[L, T], [R, T], [R, B], [L, B]]);
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.innerHTML = `<g class="cells">${cells.map((c, i) => `<path data-id="${items[i].id}" d="M${c.map((p) => p.map((v) => v.toFixed(1)).join(",")).join("L")}Z"/>`).join("")}</g>`
      + `<g class="ax"><path d="M${L},${T}V${B}H${R}"/><text x="${L - 8}" y="${T + 12}" text-anchor="end">${axes.y[1]}</text><text x="${L - 8}" y="${B}" text-anchor="end">${axes.y[0]}</text>`
      + `<text x="${L}" y="${B + 22}">${axes.x[0]}</text><text x="${R}" y="${B + 22}" text-anchor="end">${axes.x[1]}</text></g><g class="nbl"></g>`
      + `<g class="pts">${items.map((it) => {
        const [x, y] = px[it.id], left = it.at[0] > .7;
        return `<g class="pt" data-id="${it.id}" tabindex="-1" role="button" aria-label="${it.title}, ${kinds[it.kind]}"><circle cx="${x}" cy="${y}" r="5"/>`
          + `<text x="${x + (left ? -12 : 12)}" y="${y + 5}" text-anchor="${left ? "end" : "start"}">${it.short}</text></g>`;
      }).join("")}</g>`;
    paint();
  }

  function paint() {
    const nb = near(sel), [x, y] = px[sel];
    svg.querySelectorAll<SVGElement>("[data-id]").forEach((e) => e.classList.toggle("on", e.dataset.id === sel));
    svg.querySelectorAll<SVGGElement>(".pt").forEach((e) => {
      const id = e.dataset.id!;
      e.classList.toggle("nb", nb.includes(id));
      e.tabIndex = id === sel ? 0 : -1;   // one tab stop; arrows move within the plot
      e.setAttribute("aria-pressed", String(id === sel));
    });
    svg.querySelector(".nbl")!.innerHTML = nb.map((j) => `<line x1="${x}" y1="${y}" x2="${px[j][0]}" y2="${px[j][1]}"/>`).join("");
    if (card.dataset.id === sel) return;
    const first = !card.dataset.id, it = BY[sel];
    card.dataset.id = sel;
    card.innerHTML = `<p class="kind">${kinds[it.kind]}</p><h3>${it.title}</h3>${it.org ? `<p class="org">${it.org}</p>` : ""}<p class="meta">${it.meta}</p><p class="d">${it.desc}</p>`
      + `<p class="in">Nearest neighbours: ${nb.map((j) => `<button type="button" data-go="${j}">${BY[j].short}</button>`).join(" · ")}</p>`
      + `<a href="mailto:${contact.email}?subject=${encodeURIComponent(it.title.replace(/&amp;/g, "&"))}">${it.cta}</a>`;
    if (!reduce && !first) card.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: "cubic-bezier(.16,1,.3,1)" });   // crossfade, in place
  }

  function choose(id: string, focus = false) {
    if (id !== sel) { sel = id; paint(); }
    if (focus) svg.querySelector<SVGGElement>(`.pt[data-id="${id}"]`)?.focus();
  }
  const idOf = (e: Event) => (e.target as Element).closest<SVGElement>("[data-id]")?.dataset.id;
  const hover = (id?: string) => svg.querySelectorAll<SVGElement>("[data-id]").forEach((e) => e.classList.toggle("hov", e.dataset.id === id));

  svg.addEventListener("click", (e) => { const id = idOf(e); if (id) choose(id); });
  svg.addEventListener("pointerover", (e) => { if (e.pointerType === "mouse") hover(idOf(e)); });   // touch has no hover to leave behind
  svg.addEventListener("pointerleave", () => hover());
  svg.addEventListener("keydown", (e) => {   // an arrow goes to the nearest point in that direction
    const d = ({ ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] } as Record<string, Pt>)[e.key];
    if (!d) return;
    e.preventDefault();
    let best = "", score = Infinity;
    for (const it of items) {
      const dx = it.at[0] - BY[sel].at[0], dy = it.at[1] - BY[sel].at[1], along = dx * d[0] + dy * d[1], across = Math.abs(dx * d[1] - dy * d[0]);
      if (along > .01 && along + 2 * across < score) { score = along + 2 * across; best = it.id; }
    }
    if (best) choose(best, true);
  });
  card.addEventListener("click", (e) => { const b = (e.target as Element).closest<HTMLElement>("[data-go]"); if (b) choose(b.dataset.go!, true); });

  const fit = (w: number) => { w = Math.round(w); if (w && w !== width) { width = w; draw(w); } };
  const ro = new ResizeObserver(([en]) => fit(en.contentRect.width));
  ro.observe(stage);
  fit(stage.getBoundingClientRect().width);   // draw now if laid out, so the card is there on the first frame
  return () => ro.disconnect();
}
