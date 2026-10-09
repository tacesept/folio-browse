import PortfolioList from "./PortfolioList";

export default function RandomResults({ portfolios, onRefresh }) {
  return (
    <div>
      <div className="mb-10 flex items-end justify-between border-b border-border pb-5">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            Discovery
          </p>
          <h2 className="mt-2 text-3xl font-medium tracking-tight">
            10 random portfolios
          </h2>
        </div>

        <button
          onClick={onRefresh}
          className="hidden h-11 rounded-lg bg-highlight px-5 font-medium text-surface transition-all hover:-translate-y-0.5 hover:shadow-sm mb-4 sm:block"
        >
          ↻ another 10
        </button>
      </div>

      <PortfolioList portfolios={portfolios} />

      <button
        onClick={onRefresh}
        className="mt-10 w-full h-11 rounded-lg bg-highlight px-5 font-medium text-surface transition-all hover:-translate-y-0.5 hover:shadow-sm mb-4 sm:hidden"
      >
        ↻ another 10
      </button>
    </div>
  );
}
