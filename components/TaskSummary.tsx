"use client";

import { Image as ImageIcon, Loader2, Sparkles } from "lucide-react";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectIsStreaming,
  selectSummaryContent,
  selectSummaryError,
} from "@/store/summary/summarySelector";
import { summaryService } from "@/store/summary/summaryService";
import { clearSummary } from "@/store/summary/summarySlice";
import rehypeRaw from "rehype-raw";

interface TaskSummaryProps {
  taskId: string;
}

export default function TaskSummary({ taskId }: TaskSummaryProps) {
  const dispatch = useAppDispatch();

  const content = useAppSelector(selectSummaryContent);
  const isStreaming = useAppSelector(selectIsStreaming);
  const error = useAppSelector(selectSummaryError);

  useEffect(() => {
    return () => {
      summaryService.stop();
      dispatch(clearSummary());
    };
  }, [dispatch]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-8 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-500" />

          <h2 className="text-lg font-semibold text-slate-900">
            AI Generated Summary
          </h2>
        </div>

        <button
          disabled={isStreaming}
          onClick={() => summaryService.start(taskId, dispatch)}
          className="flex items-center gap-2 rounded-full bg-black px-3 py-2 text-xs font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {isStreaming && <Loader2 className="h-3 w-3 animate-spin" />}
          {isStreaming ? "Generating..." : "Generate Summary"}
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
        {error && <p className="text-sm text-red-500">{error}</p>}

        {!content && !isStreaming && !error && (
          <div className="flex flex-col items-center gap-3 py-10 text-slate-500">
            <ImageIcon className="h-8 w-8" />
            <p>Click "Generate Summary" to stream the task summary.</p>
          </div>
        )}

        {content && (
          <article className="prose prose-slate max-w-none">
            <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
              {content}
            </ReactMarkdown>
          </article>
        )}
      </div>
    </div>
  );
}
