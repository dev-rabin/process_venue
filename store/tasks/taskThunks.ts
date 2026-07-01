import { createAsyncThunk } from "@reduxjs/toolkit";

import type { FetchTaskResponse } from "@/types/taskResponseType";
import { api } from "@/services/api";

export interface FetchTasksParams {
    page: number;
    pageSize: number;
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
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message ?? "Failed to fetch tasks"
            );
        }
    }
);