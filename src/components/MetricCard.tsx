import type { PropsWithChildren, ReactNode } from 'react';
import { Card } from './Card';
import { TooltipInfo } from './TooltipInfo';

type MetricCardProps = PropsWithChildren<{
  label: string;
  value: ReactNode;
  helperText?: string;
  accentClassName?: string;
  tooltipText?: string;
  className?: string;
  dataTestId?: string;
}>;

export function MetricCard({
  label,
  value,
  helperText,
  accentClassName = '',
  tooltipText,
  className = '',
  dataTestId,
}: MetricCardProps) {
  return (
    <Card
      className={`relative p-6 hover:z-20 focus-within:z-20 ${accentClassName} ${className}`}
      data-testid={dataTestId}
    >
      <div className="mb-2 flex items-center gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </p>

        {tooltipText ? <TooltipInfo text={tooltipText} /> : null}
      </div>

      <div className="text-3xl font-black text-slate-50 md:text-4xl">
        {value}
      </div>

      {helperText ? (
        <div className="mt-2 text-[11px] font-medium italic text-slate-500">
          {helperText}
        </div>
      ) : null}
    </Card>
  );
}
