import Link from "next/link";
import GitHubGrid from "@/components/ui/GitHubGrid";

export default function Hero() {
  return (
    <section id="home" className="pt-8 pb-16 w-full scroll-mt-28">
      <h1 className="font-display font-bold text-4xl md:text-5xl text-charcoal mb-4">
        Gordon Bie.
      </h1>
      <div className="space-y-1 text-lg text-charcoal/60 leading-relaxed">
        <p>Business major who codes — ML, AI, and everything in between.</p>
        <p>Northeastern &apos;26, Information Systems &amp; Data Science.</p>
        <p>
          Next up,{" "}
          <Link
            href="https://www.flowtraders.com"
            target="_blank"
            className="text-charcoal/80 underline underline-offset-2 hover:text-matcha transition-colors"
          >
            @Flow Traders
          </Link>
          .
        </p>
      </div>
      <GitHubGrid />
    </section>
  );
}
