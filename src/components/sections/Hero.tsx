import Link from "next/link";
import GitHubGrid from "@/components/ui/GitHubGrid";

export default function Hero() {
  return (
    <section
      id="home"
      className="flex flex-col md:flex-row"
      style={{ minHeight: "calc(100vh - 57px)" }}
    >
      {/* Left panel — washi paper */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16 md:py-0">
        <h1
          className="font-display font-extrabold leading-[0.88] tracking-tight text-fg uppercase"
          style={{ fontSize: "clamp(3.8rem, 8.5vw, 9rem)" }}
        >
          Gordon
          <br />
          Bie.
        </h1>

        <div className="mt-8 h-[2px] bg-fg" />

        <div className="mt-6 grid grid-cols-2 gap-y-6 gap-x-6">
          <div>
            <p className="font-mono text-[10px] text-fg-subtle uppercase tracking-[0.18em] mb-1">
              Discipline
            </p>
            <p className="font-sans text-sm text-fg">ML / AI Engineering</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-fg-subtle uppercase tracking-[0.18em] mb-1">
              Study
            </p>
            <p className="font-sans text-sm text-fg">Northeastern &apos;26</p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-fg-subtle uppercase tracking-[0.18em] mb-1">
              Next
            </p>
            <Link
              href="https://www.flowtraders.com"
              target="_blank"
              className="font-sans text-sm text-accent hover:underline underline-offset-2"
            >
              @Flow Traders
            </Link>
          </div>
          <div>
            <p className="font-mono text-[10px] text-fg-subtle uppercase tracking-[0.18em] mb-1">
              Based
            </p>
            <p className="font-sans text-sm text-fg">Boston → New York</p>
          </div>
        </div>
      </div>

      {/* Right panel — concrete texture with GitHub activity */}
      <div
        className="w-full md:w-[42%] border-t-2 md:border-t-0 md:border-l-2 border-fg flex flex-col justify-end p-8 min-h-[40vh] md:min-h-0 texture-concrete"
      >
        <div className="mt-auto">
          <GitHubGrid />
        </div>
      </div>
    </section>
  );
}
