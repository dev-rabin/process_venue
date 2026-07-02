import { ChevronDown } from "lucide-react";

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
}

export function Dropdown({ label, value, options, onChange }: DropdownProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-500">{label}</label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-w-[170px] appearance-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}
