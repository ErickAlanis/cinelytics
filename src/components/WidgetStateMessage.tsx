type WidgetStateMessageProps = {
  title: string;
  description?: string;
};

export function WidgetStateMessage({
  title,
  description,
}: WidgetStateMessageProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-6 text-sm">
      <p className="font-bold text-slate-200">{title}</p>

      {description ? (
        <p className="mt-2 text-slate-400">{description}</p>
      ) : null}
    </div>
  );
}
