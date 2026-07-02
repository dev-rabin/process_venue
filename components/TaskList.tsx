"use client";
import TaskPagination from "./TaskPagination";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentPage,
  selectLoading,
  selectPageSize,
  selectSearch,
  selectSelectedTaskId,
  selectSortBy,
  selectStatusFilter,
  selectTotalTasks,
  selectTypeFilter,
  selectVisibleTasks,
} from "@/store/tasks/taskSelector";
import { setPage, setSelectedTask } from "@/store/tasks/taskSlice";
import { TypeBadgeIcon } from "./TypeBadgeIcon";
import { User } from "lucide-react";
import { normalizeStatus, statusStyles } from "@/utils/normalizeStatus";
import { formatDate } from "@/utils/date";

export const TaskList = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const tasks = useAppSelector(selectVisibleTasks);
  const selectedTaskId = useAppSelector(selectSelectedTaskId);
  const totalTasks = useAppSelector(selectTotalTasks);
  const page = useAppSelector(selectCurrentPage);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-[15px] font-semibold text-slate-900">
            Tasks{" "}
            <span className="text-slate-400 font-normal">({totalTasks})</span>
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
            </div>
          ) : tasks.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-500">
              No tasks found.
            </div>
          ) : (
            tasks.map((task) => {
              const isSelected = task.id === selectedTaskId;
              const displayStatus = normalizeStatus(task.status);
              return (
                <button
                  key={task.id}
                  onClick={() => dispatch(setSelectedTask(task.id))}
                  className={`w-full flex items-start gap-3 px-5 py-4 border-b border-slate-100 text-left relative transition-colors ${
                    isSelected ? "bg-indigo-50/60" : "hover:bg-slate-50"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-600" />
                  )}

                  <TypeBadgeIcon type={task.type} />

                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-semibold text-slate-900">
                      {task.title}
                    </div>

                    <div className="text-xs text-slate-400">{task.type}</div>

                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                      <User className="w-3 h-3" />
                      {task.assignee?.name ?? "Unassigned"}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
                        statusStyles[displayStatus]
                      }`}
                    >
                      {displayStatus}
                    </span>
                    <span className="text-xs text-slate-400">
                      {formatDate(task.updatedAt)}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
        <TaskPagination page={page} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};
