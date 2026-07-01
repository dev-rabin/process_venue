export function FieldRow({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-3 py-4">
      <div className="w-5 h-5 mt-0.5 text-slate-400 shrink-0">{icon}</div>
      <div className="flex justify-between">
        <div>
          <div className="text-xs text-slate-500 mb-0.5">{label}</div>
          <div className="text-[15px] font-medium text-slate-800">{value}</div>
        </div>
        {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}
