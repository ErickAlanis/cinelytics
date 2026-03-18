import type { ReactNode } from 'react';
import { TooltipInfo } from './TooltipInfo';

type WidgetHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  tooltipText?: string;
};

export function WidgetHeader({
  title,
  subtitle,
  action,
  tooltipText,
}: WidgetHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold tracking-tight text-slate-50">
            {title}
          </h3>

          {tooltipText ? <TooltipInfo text={tooltipText} /> : null}
        </div>

        {subtitle ? (
          <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
