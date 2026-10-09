const ALPHABET = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

export default function AlphabetNav({ grouped, onJump }) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-4 scrollbar-none">
      {ALPHABET.slice(1).map((letter) => (
        <button
          key={letter}
          onClick={() => onJump(letter)}
          disabled={!grouped[letter]}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors ${
            grouped[letter]
              ? "text-secondary hover:bg-amber-400 "
              : "text-muted/40"
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
