import { ChevronDown } from "lucide-react";

export function Dropdown({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <button className="flex items-center justify-between gap-3 min-w-[150px] px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 hover:border-slate-300 transition-colors">
        {value}
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>
    </div>
  );
}
