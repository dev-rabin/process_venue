import {
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { tasksAdapter } from "./taskAdapter";
import { fetchTasks } from "./taskThunks";

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
        },
        setStatusFilter(state, action: PayloadAction<string>) {
            state.statusFilter = action.payload;
        },
        setTypeFilter(state, action: PayloadAction<string>) {
            state.typeFilter = action.payload;
        },
        setSortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setPageSize(state, action: PayloadAction<number>) {
            state.pageSize = action.payload;
        },

        setAllTasks: tasksAdapter.setAll,
        addTask: tasksAdapter.addOne,
        updateTask: tasksAdapter.updateOne,
        upsertTask: tasksAdapter.upsertOne,
        removeTask: tasksAdapter.removeOne,
        clearTasks: tasksAdapter.removeAll,
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
} = tasksSlice.actions;

export default tasksSlice.reducer;