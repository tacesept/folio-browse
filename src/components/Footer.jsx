export default function Footer({ portfolioCount }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>{portfolioCount.toLocaleString()} portfolios</span>
        <span>Built with React + Tailwind</span>
      </div>
    </footer>
  );
}