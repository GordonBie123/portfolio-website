const Em = ({ children }: { children: React.ReactNode }) => <span className="text-text">{children}</span>;

export function Intro() {
  return (
    <section aria-label="intro" className="flex flex-col gap-5">
      <h1 className="text-3xl text-text sm:text-4xl">hi, i&apos;m gordon.</h1>
      <p className="max-w-[60ch] text-lg leading-relaxed text-sub sm:text-xl sm:leading-relaxed">
        i study <Em>business analytics</Em> and <Em>international business</Em> at northeastern, and right now i&apos;m a{" "}
        <Em>software engineer intern</Em> at{" "}
        <a
          href="https://www.flowtraders.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-main underline decoration-main/30 underline-offset-4 transition-colors duration-150 hover:decoration-main"
        >
          flow traders
        </a>{" "}
        in new york, working on <Em>hft infrastructure, devops and reliability</Em>. i like <Em>machine learning</Em> and{" "}
        <Em>matcha</Em>.
      </p>
    </section>
  );
}
