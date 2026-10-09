import PortfolioList from "./PortfolioList";

export default function PortfolioArchive({ grouped, sectionRefs }) {
  return (
    <div className="space-y-16">
      {Object.entries(grouped).map(([letter, items]) => (
        <div
          key={letter}
          ref={(element) => {
            sectionRefs.current[letter] = element;
          }}
        >
          <div className="mb-4 flex items-center gap-4">
            <span className="text-4xl font-medium tracking-tight">
              {letter}
            </span>
            <span className="font-mono text-xs text-muted">
              {String(items.length).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <PortfolioList portfolios={items} />
        </div>
      ))}
    </div>
  );
}
