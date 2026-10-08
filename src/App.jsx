import { useEffect, useMemo, useRef, useState } from "react";

const DATA_URL =
  "https://raw.githubusercontent.com/emmabostian/developer-portfolios/master/feed.json";

const ALPHABET = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

function App() {
  const [portfolios, setPortfolios] = useState([]);
  const [search, setSearch] = useState("");
  const [randomMode, setRandomMode] = useState(false);
  const [randomResults, setRandomResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const sectionRefs = useRef({});

  useEffect(() => {
    async function loadPortfolios() {
      try {
        const response = await fetch(DATA_URL);

        if (!response.ok) {
          throw new Error("Failed to load portfolios");
        }

        const data = await response.json();

        setPortfolios(
          data
            .filter((item) => item.name && item.url)
            .sort((a, b) => a.name.localeCompare(b.name)),
        );
      } catch (err) {
        setError("Couldn't load portfolios.");
      } finally {
        setLoading(false);
      }
    }

    loadPortfolios();
  }, []);

  const visiblePortfolios = useMemo(() => {
    if (randomMode) return portfolios;

    const query = search.trim().toLowerCase();

    if (!query) return portfolios;

    return portfolios.filter((portfolio) => {
      const name = portfolio.name?.toLowerCase() || "";
      const tagline = portfolio.tagline?.toLowerCase() || "";

      return name.includes(query) || tagline.includes(query);
    });
  }, [portfolios, search, randomMode]);

  const grouped = useMemo(() => {
    const groups = {};

    visiblePortfolios.forEach((portfolio) => {
      const first = portfolio.name?.charAt(0).toUpperCase() || "#";
      const letter = /[A-Z]/.test(first) ? first : "#";

      if (!groups[letter]) {
        groups[letter] = [];
      }

      groups[letter].push(portfolio);
    });

    return groups;
  }, [visiblePortfolios]);

  function getRandomTen() {
    const shuffled = [...portfolios].sort(() => Math.random() - 0.5);

    setSearch("");
    setRandomMode(true);
    setRandomResults(shuffled.slice(0, 10));
  }

  function jumpTo(letter) {
    const element = sectionRefs.current[letter];

    if (element) {
      const top =
        element.getBoundingClientRect().top + window.scrollY - 120;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  }

  function showAll() {
    setRandomMode(false);
    setRandomResults([]);
    setSearch("");
  }

  return (
    <main className="min-h-screen bg-background text-primary">
      {/* Header */}
      <header className="mx-auto max-w-6xl px-5 pb-10 pt-8 sm:px-8">
        <nav className="flex items-center justify-between">
          <button
            onClick={showAll}
            className="text-sm font-bold tracking-tight transition-colors hover:text-accent"
          >
            folio<span className="text-muted">/</span>index
          </button>

          <a
            href="https://github.com/emmabostian/developer-portfolios"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-secondary transition-colors hover:text-accent"
          >
            source ↗
          </a>
        </nav>

        <div className="max-w-3xl pt-24 sm:pt-32">
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

      {/* Controls */}
      <section className="sticky top-0 z-20 border-y border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="flex flex-1 items-center rounded-lg border border-border bg-surface px-4 transition-colors focus-within:border-accent">
              <span className="mr-3 text-muted">⌕</span>

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setRandomMode(false);
                }}
                placeholder="Search by name or role..."
                className="h-11 w-full bg-transparent text-sm text-primary outline-none placeholder:text-muted"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="shrink-0 text-xs text-muted transition-colors hover:text-accent"
                >
                  clear
                </button>
              )}
            </div>

            {/* Random */}
            <button
              onClick={getRandomTen}
              className="h-11 rounded-lg bg-highlight px-5 text-xs font-medium text-primary transition-all hover:-translate-y-0.5 hover:shadow-sm"
            >
              ✦ Surprise me
            </button>
          </div>

          {/* Alphabet */}
          {!randomMode && !search && (
            <div className="flex gap-1 overflow-x-auto pb-4 scrollbar-none">
              <button
                onClick={showAll}
                className="mr-2 shrink-0 rounded-md px-2 py-1 text-xs font-medium text-secondary transition-colors hover:bg-surface-hover hover:text-primary"
              >
                ALL
              </button>

              {ALPHABET.slice(1).map((letter) => (
                <button
                  key={letter}
                  onClick={() => jumpTo(letter)}
                  disabled={!grouped[letter]}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-xs transition-colors ${
                    grouped[letter]
                      ? "text-secondary hover:bg-accent hover:text-white"
                      : "text-muted/40"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-5 pb-32 pt-10 sm:px-8">
        {loading && (
          <div className="py-20 text-center font-mono text-xs text-muted">
            Loading portfolios...
          </div>
        )}

        {error && (
          <div className="py-20 text-center text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Random Mode */}
        {!loading && !error && randomMode && (
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
                onClick={getRandomTen}
                className="hidden text-xs text-secondary transition-colors hover:text-accent sm:block"
              >
                ↻ another 10
              </button>
            </div>

            <PortfolioList portfolios={randomResults} startIndex={0} />

            <button
              onClick={getRandomTen}
              className="mt-10 w-full rounded-lg border border-border py-4 text-xs font-medium text-secondary transition-colors hover:border-accent hover:bg-surface sm:hidden"
            >
              ↻ another 10
            </button>
          </div>
        )}

        {/* Search Results */}
        {!loading && !error && !randomMode && search && (
          <div>
            <div className="mb-8 border-b border-border pb-5">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">
                Search results
              </p>

              <h2 className="mt-2 text-2xl font-medium">
                {visiblePortfolios.length}{" "}
                {visiblePortfolios.length === 1
                  ? "portfolio"
                  : "portfolios"}
              </h2>
            </div>

            {visiblePortfolios.length > 0 ? (
              <PortfolioList portfolios={visiblePortfolios} />
            ) : (
              <EmptyState search={search} />
            )}
          </div>
        )}

        {/* Main Archive */}
        {!loading && !error && !randomMode && !search && (
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

                  <span className="font-mono text-[10px] text-muted">
                    {String(items.length).padStart(2, "0")}
                  </span>

                  <div className="h-px flex-1 bg-border" />
                </div>

                <PortfolioList portfolios={items} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>{portfolios.length.toLocaleString()} portfolios</span>

          <span>Built with React + Tailwind</span>
        </div>
      </footer>
    </main>
  );
}

function PortfolioList({ portfolios, startIndex = 0 }) {
  return (
    <div className="border-t border-border">
      {portfolios.map((portfolio, index) => (
        <a
          key={`${portfolio.name}-${portfolio.url}-${index}`}
          href={portfolio.url}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-4 border-b border-border py-5 transition-colors hover:bg-surface-hover sm:gap-8 sm:px-4"
        >
          <span className="w-7 shrink-0 font-mono text-[10px] text-muted">
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

function EmptyState({ search }) {
  return (
    <div className="rounded-lg border border-dashed border-border py-20 text-center">
      <p className="text-sm text-secondary">
        No portfolios found for{" "}
        <span className="font-medium text-primary">"{search}"</span>
      </p>

      <p className="mt-2 text-xs text-muted">
        Try searching for a different name or role.
      </p>
    </div>
  );
}

export default App;