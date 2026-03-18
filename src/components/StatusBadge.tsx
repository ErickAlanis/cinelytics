import type { PropsWithChildren } from 'react';

type StatusBadgeProps = PropsWithChildren<{
  className?: string;
}>;

export function StatusBadge({ children, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 ${className}`}
    >
      {children}
    </span>
  );
}
