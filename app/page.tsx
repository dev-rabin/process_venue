"use client";
import { FilterBar } from "@/components/FilterBar";
import Header from "@/components/Header";
import TaskInfo from "@/components/TaskInfo";
import { TaskList } from "@/components/TaskList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentPage,
  selectPageSize,
  selectSearch,
  selectSortBy,
  selectStatusFilter,
  selectTypeFilter,
} from "@/store/tasks/taskSelector";
import { fetchTasks, loadCachedTasks } from "@/store/tasks/taskThunks";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectCurrentPage);
  const pageSize = useAppSelector(selectPageSize);

  const search = useAppSelector(selectSearch);
  const statusFilter = useAppSelector(selectStatusFilter);
  const typeFilter = useAppSelector(selectTypeFilter);
  const sortBy = useAppSelector(selectSortBy);

  useEffect(() => {
    dispatch(loadCachedTasks());
    dispatch(
      fetchTasks({
        page,
        pageSize,
        search,
        status: statusFilter,
        type: typeFilter,
        sortBy,
      }),
    );
  }, [dispatch, page, pageSize, search, statusFilter, typeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <FilterBar />
      <div className="grid grid-cols-1 gap-4 p-3 lg:grid-cols-[420px_1fr]">
        <TaskList />
        <div className="sticky top-3 self-start">
          <TaskInfo />
        </div>
      </div>
    </div>
  );
}
