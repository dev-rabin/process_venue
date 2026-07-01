import {
  Volume2,
  Flag,
  Calendar,
  Hash,
  User,
  BarChart3,
  FileText,
  ExternalLink,
} from "lucide-react";
import { FieldRow } from "./FieldRow";
import TaskSummary from "./TaskSummary";

export default function TaskInfo() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-3xl font-bold text-slate-900">Task 1</h2>
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            View Full Details
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="divide-y divide-slate-100">
            <FieldRow
              icon={<Volume2 className="h-4 w-4 text-indigo-500" />}
              label="Type"
              value="Audio"
            />

            <FieldRow
              icon={
                <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-amber-500" />
              }
              label="Status"
              value="In Progress"
            />

            <FieldRow
              icon={<User className="h-4 w-4 text-slate-500" />}
              label="Assignee"
              value="Ben"
              sub="(u2)"
            />

            <FieldRow
              icon={<BarChart3 className="h-4 w-4 text-slate-500" />}
              label="Annotation Count"
              value="1"
            />
          </div>

          <div className="divide-y divide-slate-100">
            <FieldRow
              icon={<Flag className="h-4 w-4 text-red-500" />}
              label="Priority"
              value="High"
            />

            <FieldRow
              icon={<Calendar className="h-4 w-4 text-slate-500" />}
              label="Updated"
              value="2 minutes ago"
              sub="(Jun 28, 2024 6:40 PM)"
            />

            <FieldRow
              icon={<Hash className="h-4 w-4 text-slate-500" />}
              label="Task ID"
              value="t1"
            />

            <FieldRow
              icon={<FileText className="h-4 w-4 text-slate-500" />}
              label="Meta"
              value="Note: rush"
            />
          </div>
        </div>
      </div>
      <TaskSummary />
    </div>
  );
}
