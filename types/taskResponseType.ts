import { Task } from "./taskType";

export interface FetchTaskResponse {
    page: number;
    pageSize: number;
    total: number;
    items: Task[];
}