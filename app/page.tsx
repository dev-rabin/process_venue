import { FilterBar } from "@/components/FilterBar";
import Header from "@/components/Header";
import TaskInfo from "@/components/TaskInfo";
import { TaskList } from "@/components/TaskList";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <FilterBar />
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-2 p-3">
        <TaskList />
        <TaskInfo />
      </div>
    </div>
  );
}
