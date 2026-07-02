import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FetchTaskResponse } from "@/types/taskResponseType";
import { api } from "@/services/api";
import { cacheService } from "../cache/cacheService";
import { AppDispatch } from "..";
import { setAllTasks, setDataSource } from "./taskSlice";

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
    async (params, thunkAPI) => {
        try {
            const response = await api.get<FetchTaskResponse>("/tasks", {
                params,
            });
            await cacheService.saveTasks(response.data.items);
            thunkAPI.dispatch(setDataSource("network"));
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ?? "Failed to fetch tasks"
            );
        }
    }
);

export const loadCachedTasks =
    () => async (dispatch: AppDispatch) => {
        const tasks = await cacheService.getTasks();

        if (tasks.length > 0) {
            dispatch(setAllTasks(tasks));
            dispatch(setDataSource("cache"));
        }
    };