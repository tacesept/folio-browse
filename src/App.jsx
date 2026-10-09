import { useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import PortfolioArchive from "./components/PortfolioArchive";
import SearchResults from "./components/SearchResults";
import ErrorState from "./components/ErrorState";
import LoadingState from "./components/LoadingState";
import AlphabetNav from "./components/AlphabetNav";
import usePortfolios from "./hooks/usePortfolios";
import RandomResults from "./components/RandomResults";

function App() {
  const { portfolios, loading, error } = usePortfolios();

  const [search, setSearch] = useState("");
  const [randomMode, setRandomMode] = useState(false);
  const [randomResults, setRandomResults] = useState([]);
  const sectionRefs = useRef({});

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

      if (!groups[letter]) groups[letter] = [];
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
      const top = element.getBoundingClientRect().top + window.scrollY - 120;

      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  function showAll() {
    setRandomMode(false);
    setRandomResults([]);
    setSearch("");
  }

  function handleSearchChange(value) {
    setSearch(value);
    setRandomMode(false);
  }

  return (
    <main className="min-h-screen bg-background text-primary">
      <Header />

      <section className="sticky top-0 z-20 border-y border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SearchBar
            search={search}
            onSearchChange={handleSearchChange}
            onRandomClick={getRandomTen}
          />

          {!randomMode && !search ? (
            <AlphabetNav
              grouped={grouped}
              onJump={jumpTo}
            />
          ) : (
            <button
              onClick={showAll}
              className="h-11 rounded-lg bg-highlight px-5 font-medium text-surface transition-all hover:-translate-y-0.5 hover:shadow-sm mb-4"
            >
              Show All
            </button>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-32 pt-10 sm:px-8">
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}

        {!loading && !error && randomMode && (
          <RandomResults portfolios={randomResults} onRefresh={getRandomTen} />
        )}

        {!loading && !error && !randomMode && search && (
          <SearchResults portfolios={visiblePortfolios} search={search} />
        )}

        {!loading && !error && !randomMode && !search && (
          <PortfolioArchive grouped={grouped} sectionRefs={sectionRefs} />
        )}
      </section>

      <Footer portfolioCount={portfolios.length} />
    </main>
  );
}

export default App;
