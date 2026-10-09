export default function Header() {
  return (
    <header className="mx-auto max-w-6xl px-5 pb-10 pt-8 sm:px-8">
      <nav className="flex items-center justify-between">
        <button className="text-3xl md:text-4xl font-bold tracking-tight font-sans">
          Folio Browse
        </button>

        <a
          href="https://github.com/emmabostian/developer-portfolios"
          target="_blank"
          rel="noreferrer"
          className="text-md text-secondary transition-colors hover:text-accent"
        >
          source ↗
        </a>
      </nav>

      <div className="max-w-3xl pt-24 sm:pt-20">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Developer portfolio archive
        </p>

        <h1 className="text-5xl font-medium leading-[0.95] tracking-[-0.055em] sm:text-7xl">
          Find a portfolio
          <br />
          worth exploring.
        </h1>

        <p className="mt-7 max-w-lg text-sm leading-6 text-secondary sm:text-base">
          A simple collection of developer portfolios for inspiration,
          discovery, and curiosity.
        </p>
      </div>
    </header>
  );
}
