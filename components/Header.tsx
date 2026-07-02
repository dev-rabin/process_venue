import { useAppSelector } from "@/store/hooks";
import { ChevronDown, FileText } from "lucide-react";

const Header = () => {
  const dataSource = useAppSelector((state) => state.tasks.dataSource);
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200">
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 flex items-center justify-center text-white">
          <FileText className="w-5 h-5" />
        </div>
        <h1 className="text-lg font-semibold text-slate-900">
          Annotation Activity Console
        </h1>
        {dataSource === "cache" ? (
          <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
            Cached Data
          </span>
        ) : (
          <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            Live Data
          </span>
        )}
      </div>
      <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-50 transition-colors">
        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-semibold flex items-center justify-center">
          RS
        </div>
        <span className="text-sm font-medium text-slate-700">Robin Singh</span>
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </button>
    </header>
  );
};

export default Header;
