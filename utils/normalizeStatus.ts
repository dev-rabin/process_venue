import { Status } from "@/types/taskType";

export const normalizeStatus = (status: string): Status => {
  switch (status.trim().toLowerCase()) {
    case "inprogress":
    case "in_progress":
      return "In Progress";
    case "done":
      return "Done";
    case "blocked":
      return "Blocked";
    case "todo":
      return "Todo";
    case "qa":
      return "QA";
    default:
      console.warn(`Unknown status received: ${status}`);
      return "Todo";
  }
};

export const statusStyles: Record<Status, string> = {
  "In Progress": "bg-amber-100 text-amber-700",
  Done: "bg-emerald-100 text-emerald-700",
  Blocked: "bg-red-100 text-red-600",
  Todo: "bg-amber-50 text-amber-600",
  QA: "bg-sky-100 text-sky-600",
};