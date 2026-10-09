export default function SearchBar({ search, onSearchChange, onRandomClick }) {
  return (
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="flex flex-1 items-center rounded-lg border border-border bg-surface px-4 transition-colors focus-within:border-accent">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or role..."
          className="h-11 w-full bg-transparent text-normal text-primary outline-none placeholder:text-muted"
        />

        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="shrink-0 text-normal text-muted transition-colors hover:text-accent"
          >
            clear
          </button>
        )}
      </div>

      {/* Random */}
      <button
        onClick={onRandomClick}
        className="h-11 rounded-lg bg-highlight px-5 font-medium text-surface transition-all hover:-translate-y-0.5 hover:shadow-sm"
      >
        Random 10
      </button>
    </div>
  );
}
