import type { LucideIcon } from "lucide-react";

// Monkeytype-style group title: quiet, lowercase, with a leading icon
export function Heading({ icon: Icon, children, as: Tag = "h2" }: { icon: LucideIcon; children: React.ReactNode; as?: "h1" | "h2" }) {
  return (
    <Tag className={`flex items-center gap-2 text-sub ${Tag === "h1" ? "text-2xl" : "text-lg"}`}>
      <Icon size={Tag === "h1" ? 22 : 18} aria-hidden />
      {children}
    </Tag>
  );
}
