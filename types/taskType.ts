
export interface Assignee {
    id: string;
    name: string;
}

export interface TaskMeta {
    priority?: string;
    note?: string;
}

export interface Tasks {
    id: string;
    title: string;
    type: string;
    status: Status;
    assignee: Assignee | null;
    annotationCount: number | string;
    updatedAt: number | string;
    meta: TaskMeta;
}

export interface FetchTaskResponse {
    page: number;
    pageSize: number;
    total: number;
    items: Tasks[];
}

export type Status = "In Progress" | "Done" | "Blocked" | "Todo" | "QA";
