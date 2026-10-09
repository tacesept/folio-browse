import EmptyState from "./EmptyState";
import PortfolioList from "./PortfolioList";

export default function SearchResults({ portfolios, search }) {
  return (
    <div>
      <div className="mb-8 border-b border-border pb-5">
        <p className="font-mono uppercase tracking-widest text-muted">
          Search results
        </p>

        <h2 className="mt-2 text-3xl font-medium">
          {portfolios.length}{" "}
          {portfolios.length === 1 ? "portfolio" : "portfolios"}
        </h2>
      </div>

      {portfolios.length > 0 ? (
        <PortfolioList portfolios={portfolios} />
      ) : (
        <EmptyState search={search} />
      )}
    </div>
  );
}
