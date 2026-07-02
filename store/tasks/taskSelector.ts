import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { tasksAdapter } from "./taskAdapter";

const selectTasksState = (state: RootState) => state.tasks;

export const {
    selectAll: selectAllTasks,
    selectById: selectTaskById,
    selectIds: selectTaskIds,
    selectEntities: selectTaskEntities,
    selectTotal: selectTaskCount,
} = tasksAdapter.getSelectors(selectTasksState);

// UI Selectors
export const selectLoading = (state: RootState) => state.tasks.loading;
export const selectError = (state: RootState) => state.tasks.error;

export const selectCurrentPage = (state: RootState) => state.tasks.page;
export const selectPageSize = (state: RootState) => state.tasks.pageSize;
export const selectTotalTasks = (state: RootState) => state.tasks.total;

export const selectSelectedTaskId = (state: RootState) => state.tasks.selectedTaskId;

export const selectSearch = (state: RootState) => state.tasks.search;
export const selectStatusFilter = (state: RootState) => state.tasks.statusFilter;
export const selectTypeFilter = (state: RootState) => state.tasks.typeFilter;
export const selectSortBy = (state: RootState) => state.tasks.sortBy;

// Memoized Selector
export const selectVisibleTasks = createSelector(
    [
        selectAllTasks,
        selectSearch,
        selectStatusFilter,
        selectTypeFilter,
        selectSortBy,
    ],
    (tasks, search, statusFilter, typeFilter, sortBy) => {
        let filteredTasks = tasks;

        if (search) {
            filteredTasks = filteredTasks.filter((task) =>
                task.title.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (statusFilter !== "all") {
            filteredTasks = filteredTasks.filter((task) => {
                if (statusFilter === "in_progress") {
                    return (
                        task.status === "InProgress" ||
                        task.status === "in_progress"
                    );
                }
                return task.status === statusFilter;
            });
        }

        if (typeFilter !== "all") {
            filteredTasks = filteredTasks.filter(
                (task) => task.type === typeFilter
            );
        }

        const sortedTasks = [...filteredTasks];

        switch (sortBy) {
            case "desc":
                sortedTasks.sort((a, b) => {
                    const dateA = new Date(a.updatedAt).getTime();
                    const dateB = new Date(b.updatedAt).getTime();

                    return dateB - dateA;
                });
                break;

            case "asc":
                sortedTasks.sort((a, b) => {
                    const dateA = new Date(a.updatedAt).getTime();
                    const dateB = new Date(b.updatedAt).getTime();

                    return dateA - dateB;
                });
                break;
        }

        return sortedTasks;
    }
);

export const selectSelectedTask = createSelector(
    [selectAllTasks, selectSelectedTaskId],
    (tasks, selectedTaskId) =>
        tasks.find((task) => task.id === selectedTaskId) ?? null
);