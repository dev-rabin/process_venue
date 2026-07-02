import {
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { tasksAdapter } from "./taskAdapter";
import { fetchTasks } from "./taskThunks";
import { Assignee, Status } from "@/types/taskType";

const initialState = tasksAdapter.getInitialState({
    loading: false,
    error: null as string | null,
    page: 1,
    pageSize: 20,
    total: 0,
    selectedTaskId: null as string | null,
    search: "",
    statusFilter: "all",
    typeFilter: "all",
    sortBy: "updated",
    dataSource: "network" as "cache" | "network",
});

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setSelectedTask(state, action: PayloadAction<string | null>) {
            state.selectedTaskId = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
            state.page = 1;
        },
        setStatusFilter(state, action: PayloadAction<string>) {
            state.statusFilter = action.payload;
            state.page = 1;
        },
        setTypeFilter(state, action: PayloadAction<string>) {
            state.typeFilter = action.payload;
            state.page = 1;
        },
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
            state.page = 1;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setPageSize(state, action: PayloadAction<number>) {
            state.pageSize = action.payload;
            state.page = 1;
        },
        setAllTasks: tasksAdapter.setAll,
        addTask: tasksAdapter.addOne,
        updateTask: tasksAdapter.updateOne,
        upsertTask: tasksAdapter.upsertOne,
        removeTask: tasksAdapter.removeOne,
        clearTasks: tasksAdapter.removeAll,
        setDataSource(
            state,
            action: PayloadAction<"cache" | "network">
        ) {
            state.dataSource = action.payload;
        },

        tasksUpdatedFromWebSocket(state, action: PayloadAction<{
            id: string;
            status: Status;
            updatedAt: number;
        }>
        ) {
            tasksAdapter.updateOne(state, {
                id: action.payload.id,
                changes: {
                    status: action.payload.status,
                    updatedAt: action.payload.updatedAt,
                },
            });
        },

        tasksAssignedFromWebSocket(state, action: PayloadAction<{
            id: string;
            assignee: Assignee | null;
        }>
        ) {
            tasksAdapter.updateOne(state, {
                id: action.payload.id,
                changes: {
                    assignee: action.payload.assignee,
                },
            });
        },

        annotationCreatedFromWebSocket(state, action: PayloadAction<{
            taskId: string;
            at: number;
        }>
        ) {
            const task = state.entities[action.payload.taskId];
            if (!task) return;
            tasksAdapter.updateOne(state, {
                id: action.payload.taskId,
                changes: {
                    annotationCount: Number(task.annotationCount) + 1,
                    updatedAt: action.payload.at,
                },
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            tasksAdapter.setAll(state, action.payload.items);
            state.page = action.payload.page;
            state.pageSize = action.payload.pageSize;
            state.total = action.payload.total;
        });
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const {
    setSelectedTask,
    setSearch,
    setStatusFilter,
    setTypeFilter,
    setSortBy,
    setPage,
    setPageSize,
    setAllTasks,
    addTask,
    updateTask,
    upsertTask,
    removeTask,
    clearTasks,
    setDataSource,
    tasksUpdatedFromWebSocket,
    tasksAssignedFromWebSocket,
    annotationCreatedFromWebSocket,
} = tasksSlice.actions;

export default tasksSlice.reducer;