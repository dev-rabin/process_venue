import { Image as ImageIcon, Sparkles } from "lucide-react";

export default function TaskSummary() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500" />

          <h2 className="text-lg font-semibold text-slate-900">
            AI Generated Summary
          </h2>
        </div>

        <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Streaming Complete
        </span>
      </div>

      {/* Summary Card */}
      <div className="space-y-5 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <h3 className="text-2xl font-bold text-indigo-600">Summary for t1</h3>

        <p className="text-base text-slate-700">
          This task is <strong>in progress</strong>. Recent activity:
        </p>

        <ul className="list-disc space-y-2 pl-6 text-slate-700">
          <li>3 annotations added</li>
          <li>1 review pending</li>
        </ul>

        {/* Code Block */}
        <div className="overflow-x-auto rounded-lg bg-slate-900 p-4 font-mono text-sm text-slate-100">
          <span className="text-purple-400">const</span> score =
          computeQuality(task);
          <span className="text-slate-400"> // sample code block</span>
        </div>

        <p className="text-base text-slate-700">
          Reviewer note: looks good, <em>ship it</em>.
        </p>

        <div className="border-t border-slate-200 pt-5">
          <div className="flex items-center gap-2 text-sm italic text-slate-500">
            <ImageIcon className="h-4 w-4" />
            (image with onerror removed for safety)
          </div>

          <p className="mt-3 text-sm text-red-500">
            (script removed for safety)
          </p>
        </div>

        <p className="text-base text-slate-700">Done.</p>
      </div>
    </div>
  );
}
