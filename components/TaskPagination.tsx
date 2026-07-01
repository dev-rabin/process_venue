import { ChevronLeft, ChevronRight } from "lucide-react";

interface TaskPaginationProps {
  page: number;
  onPageChange: (page: number) => void;
}

export default function TaskPagination({
  page,
  onPageChange,
}: TaskPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-1.5 px-5 py-4 border-t border-slate-100">
      <button
        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 disabled:opacity-50"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {[1, 2, 3, 4].map((n) => (
        <button
          key={n}
          onClick={() => onPageChange(n)}
          className={`w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
            page === n
              ? "bg-indigo-600 text-white"
              : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          {n}
        </button>
      ))}

      <span className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm">
        ...
      </span>

      <button
        onClick={() => onPageChange(7)}
        className={`w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
          page === 7
            ? "bg-indigo-600 text-white"
            : "text-slate-500 hover:bg-slate-50"
        }`}
      >
        7
      </button>

      <button
        className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50"
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
