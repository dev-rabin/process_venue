import { Search, SlidersHorizontal } from "lucide-react";
import { Dropdown } from "./DropDown";

export const FilterBar = () => {
  return (
    <div className="flex justify-center items-end gap-4 px-6 py-4">
      <div className="flex flex-col gap-1.5 flex-1 max-w-sm">
        <span className="text-xs font-medium text-transparent select-none">
          Search
        </span>
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            placeholder="Search tasks..."
            className="bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
          />
        </div>
      </div>
      <Dropdown label="Type" value="All Types" />
      <Dropdown label="Status" value="All Statuses" />
      <Dropdown label="Sort By" value="Updated: Newest" />
      <div>
        <button className="w-11 h-11 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:border-slate-300 transition-colors">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
        </button>
      </div>
    </div>
  );
};
