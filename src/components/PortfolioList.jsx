export default function PortfolioList({ portfolios, startIndex = 0 }) {
  return (
    <div className="border-t border-border">
      {portfolios.map((portfolio, index) => (
        <a
          key={`${portfolio.name}-${portfolio.url}-${index}`}
          href={portfolio.url}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-4 border-b border-border py-5 transition-colors hover:bg-amber-400 sm:gap-8 sm:px-4"
        >
          <span className="w-7 shrink-0 font-mono text-xs text-muted">
            {String(startIndex + index + 1).padStart(2, "0")}
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-medium tracking-tight sm:text-lg">
              {portfolio.name}
            </h3>

            {portfolio.tagline && (
              <p className="mt-1 truncate text-xs text-secondary sm:text-sm">
                {portfolio.tagline}
              </p>
            )}
          </div>

          <span className="shrink-0 text-lg text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
            ↗
          </span>
        </a>
      ))}
    </div>
  );
}
