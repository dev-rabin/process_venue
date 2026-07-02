import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FetchTaskResponse } from "@/types/taskResponseType";
import { api } from "@/services/api";
import { cacheService } from "../cache/cacheService";
import { AppDispatch } from "..";
import { setAllTasks } from "./taskSlice";

export interface FetchTasksParams {
    page: number;
    pageSize: number;
    search: string;
    status: string;
    type: string;
    sortBy: string;
}

export const fetchTasks = createAsyncThunk<
    FetchTaskResponse,
    FetchTasksParams
>(
    "tasks/fetchTasks",
    async (params, { rejectWithValue }) => {
        try {
            const response = await api.get<FetchTaskResponse>("/tasks", {
                params,
            });
            cacheService.saveTasks(response.data.items)
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ?? "Failed to fetch tasks"
            );
        }
    }
);

export const loadCachedTasks =
    () => (dispatch: AppDispatch) => {
        const tasks = cacheService.getTasks();
        if (tasks.length > 0) {
            dispatch(setAllTasks(tasks));
        }
    };