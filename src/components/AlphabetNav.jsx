const ALPHABET = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

export default function AlphabetNav({ grouped, onJump, onShowAll }) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-4 scrollbar-none">
      <button
        onClick={onShowAll}
        className="mr-2 shrink-0 rounded-md px-2 py-1 font-medium text-secondary transition-colors hover:bg-amber-400 hover:text-primary"
      >
        ALL
      </button>

      {ALPHABET.slice(1).map((letter) => (
        <button
          key={letter}
          onClick={() => onJump(letter)}
          disabled={!grouped[letter]}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors ${
            grouped[letter]
              ? "text-secondary hover:bg-accent hover:text-white"
              : "text-muted/40"
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
