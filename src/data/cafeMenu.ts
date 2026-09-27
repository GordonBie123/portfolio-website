// Café-game view of the portfolio data: every job, project and side quest
// becomes something you can order. Source of truth stays in the other data files.
import { experiences } from "./experience";
import { projects } from "./projects";
import { sideQuests } from "./sidequests";
import { skillCategories } from "./skills";
import { profile } from "./profile";

export type ArtKind =
  | "bowl" | "latte" | "iced" | "cup"
  | "mochi" | "dango" | "dorayaki" | "yokan" | "monaka"
  | "onigiri" | "senbei" | "sando" | "gyoza" | "melonpan" | "takoyaki"
  | "tin";

export type MenuItem = {
  id: string;
  name: string;
  jp: string;
  price: number;
  art: ArtKind;
  color: string;
  kind: "drink" | "sweet" | "snack";
  title: string;
  subtitle: string;
  meta: { label: string; value: string }[];
  notes: string[];
  ingredients: string[];
  links?: { label: string; href: string }[];
  logo?: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  jp: string;
  blurb: string;
  items: MenuItem[];
};

const SHORT_COMPANY: Record<string, string> = {
  "Massachusetts Institute of Technology": "MIT",
  "Northeastern University": "Northeastern",
};

const shortCompany = (company: string) => {
  const base = company.split(" · ")[0];
  return SHORT_COMPANY[base] ?? base;
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const price = (i: number, base: number) => base + ((i * 170) % 600);

const DRINKS: { name: string; jp: string; art: ArtKind; color: string }[] = [
  { name: "Koicha", jp: "濃茶", art: "bowl", color: "#3F5E2E" },
  { name: "Iced Matcha", jp: "アイス抹茶", art: "iced", color: "#7FA65A" },
  { name: "Usucha", jp: "薄茶", art: "bowl", color: "#6E9A48" },
  { name: "Matcha Latte", jp: "抹茶ラテ", art: "latte", color: "#8DB26B" },
  { name: "Hojicha Latte", jp: "ほうじ茶ラテ", art: "latte", color: "#A7784F" },
  { name: "Genmaicha", jp: "玄米茶", art: "cup", color: "#C4A95E" },
];

const RESERVE: { name: string; jp: string; art: ArtKind; color: string }[] = [
  { name: "Ceremonial Reserve", jp: "儀式用", art: "bowl", color: "#2F4F24" },
  { name: "Gyokuro", jp: "玉露", art: "cup", color: "#8FB85C" },
];

const SWEETS: Record<string, { name: string; jp: string; art: ArtKind; color: string; short: string }> = {
  unsprawl: { short: "Unsprawl", name: "Mochi", jp: "餅", art: "mochi", color: "#A9C27F" },
  sp500: { short: "S&P 500", name: "Dorayaki", jp: "どら焼き", art: "dorayaki", color: "#B9814A" },
  relaylist: { short: "Relaylist", name: "Dango", jp: "団子", art: "dango", color: "#E8A7B4" },
  Opvol: { short: "Vol Surface", name: "Yōkan", jp: "羊羹", art: "yokan", color: "#5C3A34" },
  trading: { short: "Pairs Trade", name: "Monaka", jp: "最中", art: "monaka", color: "#D2A86B" },
  portfolio: { short: "Portfolio", name: "Sakura Mochi", jp: "桜餅", art: "mochi", color: "#F0B9C4" },
};

const SNACKS: { name: string; jp: string; art: ArtKind; color: string }[] = [
  { name: "Onigiri", jp: "おにぎり", art: "onigiri", color: "#F7F4EC" },
  { name: "Senbei", jp: "煎餅", art: "senbei", color: "#C98F4E" },
  { name: "Katsu Sando", jp: "カツサンド", art: "sando", color: "#D59A52" },
  { name: "Gyoza", jp: "餃子", art: "gyoza", color: "#E9D2A6" },
  { name: "Melon Pan", jp: "メロンパン", art: "melonpan", color: "#E8C476" },
  { name: "Takoyaki", jp: "たこ焼き", art: "takoyaki", color: "#B8733C" },
  { name: "Yaki Onigiri", jp: "焼きおにぎり", art: "onigiri", color: "#E2C08C" },
  { name: "Norimaki Senbei", jp: "海苔巻き煎餅", art: "senbei", color: "#DDB06E" },
  { name: "Tamago Sando", jp: "たまごサンド", art: "sando", color: "#F2D36B" },
  { name: "Age Gyoza", jp: "揚げ餃子", art: "gyoza", color: "#D9A95C" },
  { name: "Nikuman", jp: "肉まん", art: "melonpan", color: "#F6F0E4" },
  { name: "Karaage", jp: "唐揚げ", art: "takoyaki", color: "#C98A3E" },
];

const professional = experiences.filter((e) => e.type === "professional");
const research = experiences.filter((e) => e.type === "research");

function fromExperience(
  e: (typeof experiences)[number],
  style: { name: string; jp: string; art: ArtKind; color: string },
  i: number,
  base: number,
  kind: MenuItem["kind"],
  prefixCompany: boolean,
): MenuItem {
  const company = shortCompany(e.company);
  const name = prefixCompany ? `${company} ${style.name}` : style.name;
  return {
    id: slug(`${e.company}-${e.role}`),
    name,
    jp: style.jp,
    price: price(i, base),
    art: style.art,
    color: style.color,
    kind,
    title: e.role,
    subtitle: e.company,
    meta: [
      { label: "Brewed", value: e.duration },
      { label: "Origin", value: e.location },
    ],
    notes: [e.description, ...e.responsibilities].filter((n): n is string => Boolean(n)),
    ingredients: e.skills,
    logo: e.logo,
  };
}

export const menu: MenuCategory[] = [
  {
    id: "matcha",
    name: "Matcha Bar",
    jp: "抹茶",
    blurb: "Where I've worked. Each one whisked to order.",
    items: professional.map((e, i) => fromExperience(e, DRINKS[i % DRINKS.length], i, 620, "drink", true)),
  },
  {
    id: "reserve",
    name: "Seasonal Reserve",
    jp: "研究",
    blurb: "Research, in small batches.",
    items: research.map((e, i) => fromExperience(e, RESERVE[i % RESERVE.length], i, 980, "drink", true)),
  },
  {
    id: "wagashi",
    name: "Wagashi",
    jp: "和菓子",
    blurb: "Things I've built. Best with a koicha.",
    items: projects.map((p, i) => {
      const s = SWEETS[p.id] ?? { short: p.title, name: "Mochi", jp: "餅", art: "mochi" as ArtKind, color: "#A9C27F" };
      return {
        id: slug(`project-${p.id}`),
        name: `${s.short} ${s.name}`,
        jp: s.jp,
        price: price(i, 380),
        art: s.art,
        color: s.color,
        kind: "sweet" as const,
        title: p.title,
        subtitle: p.category,
        meta: [{ label: "Kitchen", value: p.category }],
        notes: [p.description],
        ingredients: p.techStack,
        links: [
          { label: "View recipe on GitHub", href: p.githubUrl },
          ...(p.liveUrl ? [{ label: "Try it live", href: p.liveUrl }] : []),
        ],
      };
    }),
  },
  {
    id: "plates",
    name: "Small Plates",
    jp: "小皿",
    blurb: "Side quests, odd jobs and hobbies.",
    items: sideQuests.map((q, i) => {
      const s = SNACKS[i % SNACKS.length];
      return fromExperience(q, s, i, 280, "snack", false);
    }),
  },
];

export const allItems = menu.flatMap((c) => c.items);

export const pantry = skillCategories.map((c, i) => ({
  ...c,
  color: ["#4A6741", "#7A9B72", "#A7784F", "#2F2C28", "#C4A95E"][i % 5],
}));

const stripTags = (html: string) => html.replace(/<[^>]+>/g, "");

// Bio broken into bite-size lines for the barista to say
export const baristaChat: string[] = [
  "Oh, you want to hear about me? Pull up a stool.",
  ...profile.aboutBio.flatMap((p) => stripTags(p).split(/(?<=[.!?])\s+(?=[A-Z])/)),
  "Anyway, that's enough about me. Can I get you something?",
];
