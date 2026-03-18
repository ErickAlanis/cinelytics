type TooltipInfoProps = {
  text: string;
  className?: string;
};

export function TooltipInfo({ text, className = '' }: TooltipInfoProps) {
  return (
    <div className={`group relative inline-flex ${className}`}>
      <button
        type="button"
        aria-label={text}
        className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-600 text-[10px] font-black text-slate-400 transition-colors hover:border-indigo-400 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        i
      </button>

      <div
        role="tooltip"
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-left text-[11px] font-medium normal-case tracking-normal text-slate-300 opacity-0 shadow-xl transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {text}
      </div>
    </div>
  );
}
