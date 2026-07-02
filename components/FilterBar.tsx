"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import { Dropdown } from "./DropDown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectSearch,
  selectSortBy,
  selectStatusFilter,
  selectTypeFilter,
} from "@/store/tasks/taskSelector";
import {
  setSearch,
  setSortBy,
  setStatusFilter,
  setTypeFilter,
} from "@/store/tasks/taskSlice";
import {
  SORT_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from "@/constants/taskFilters";

export const FilterBar = () => {
  const dispatch = useAppDispatch();

  const search = useAppSelector(selectSearch);
  const statusFilter = useAppSelector(selectStatusFilter);
  const typeFilter = useAppSelector(selectTypeFilter);
  const sortBy = useAppSelector(selectSortBy);

  const [searchInput, setSearchInput] = useState(search);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const trimmed = searchInput.trim();
    if (trimmed === search) return;
    const timer = setTimeout(() => {
      dispatch(setSearch(trimmed));
    }, 300);
    return () => clearTimeout(timer);
  }, [dispatch, search, searchInput]);

  return (
    <div className="flex justify-center items-end gap-4 px-6 py-4">
      <div className="flex flex-col gap-1.5 flex-1 max-w-sm">
        <span className="text-xs font-medium text-transparent select-none">
          Search
        </span>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5">
          <Search className="h-4 w-4 text-slate-400" />

          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <Dropdown
        label="Type"
        value={typeFilter}
        options={TYPE_OPTIONS}
        onChange={(value) => dispatch(setTypeFilter(value))}
      />

      <Dropdown
        label="Status"
        value={statusFilter}
        options={STATUS_OPTIONS}
        onChange={(value) => dispatch(setStatusFilter(value))}
      />

      <Dropdown
        label="Sort By"
        value={sortBy}
        options={SORT_OPTIONS}
        onChange={(value) => dispatch(setSortBy(value))}
      />

      <button className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white transition-colors hover:border-slate-300">
        <SlidersHorizontal className="h-4 w-4 text-slate-500" />
      </button>
    </div>
  );
};
