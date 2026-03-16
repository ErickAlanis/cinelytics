type TooltipInfoProps = {
  text: string
  className?: string
}

export function TooltipInfo({ text, className = '' }: TooltipInfoProps) {
  return (
    <span
      title={text}
      aria-label={text}
      className={`inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-slate-600 text-[10px] font-black text-slate-400 ${className}`}
    >
      i
    </span>
  )
}
