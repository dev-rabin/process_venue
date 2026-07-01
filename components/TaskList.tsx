"use client";

import { useState } from "react";
import { TaskType, TypeBadgeIcon } from "./TypeBadgeIcon";
import {
  ExternalLink,
  Volume2,
  Type as TypeIcon,
  Image as ImageIcon,
  Flag,
  Calendar,
  Hash,
  User,
  BarChart3,
  FileText,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TaskPagination from "./TaskPagination";
type Status = "In Progress" | "Done" | "Blocked" | "Todo" | "QA";

export interface Task {
  id: string;
  title: string;
  type: TaskType;
  status: Status;
  assignee: string;
  updated: string;
}

const statusStyles: Record<Status, string> = {
  "In Progress": "bg-amber-100 text-amber-700",
  Done: "bg-emerald-100 text-emerald-700",
  Blocked: "bg-red-100 text-red-600",
  Todo: "bg-amber-50 text-amber-600",
  QA: "bg-sky-100 text-sky-600",
};
const tasks: Task[] = [
  {
    id: "t1",
    title: "Task 1",
    type: "Audio",
    status: "In Progress",
    assignee: "Ben",
    updated: "2m ago",
  },
  {
    id: "t2",
    title: "Task 2",
    type: "Text",
    status: "Done",
    assignee: "Chen",
    updated: "4m ago",
  },
  {
    id: "t3",
    title: "Task 3",
    type: "Image",
    status: "Blocked",
    assignee: "Unassigned",
    updated: "5m ago",
  },
  {
    id: "t4",
    title: "Task 4",
    type: "Text",
    status: "Todo",
    assignee: "Asha",
    updated: "6m ago",
  },
  {
    id: "t5",
    title: "Task 5",
    type: "Audio",
    status: "Blocked",
    assignee: "Ben",
    updated: "8m ago",
  },
  {
    id: "t6",
    title: "Task 6",
    type: "Text",
    status: "In Progress",
    assignee: "Chen",
    updated: "10m ago",
  },
  {
    id: "t7",
    title: "Task 7",
    type: "Image",
    status: "QA",
    assignee: "Unassigned",
    updated: "12m ago",
  },
  {
    id: "t8",
    title: "Task 8",
    type: "Text",
    status: "Done",
    assignee: "Asha",
    updated: "14m ago",
  },
];
export const TaskList = () => {
  const [selectedId, setSelectedId] = useState("t1");
  const [page, setPage] = useState(1);
  const selectedTask = tasks.find((t) => t.id === selectedId) ?? tasks[0];

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h2 className="text-[15px] font-semibold text-slate-900">
            Tasks <span className="text-slate-400 font-normal">(20)</span>
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {tasks.map((task) => {
            const isSelected = task.id === selectedId;
            return (
              <button
                key={task.id}
                onClick={() => setSelectedId(task.id)}
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
                    {task.assignee}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[task.status]}`}
                  >
                    {task.status}
                  </span>
                  <span className="text-xs text-slate-400">{task.updated}</span>
                </div>
              </button>
            );
          })}
        </div>
        <TaskPagination page={page} onPageChange={setPage} />
      </div>
    </div>
  );
};
