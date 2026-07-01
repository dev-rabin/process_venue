export type TaskStatus =
    | "in_progress"
    | "done"
    | "todo"
    | "qa"
    | "blocked";

export type TaskType =
    | "image"
    | "audio"
    | "text"
    | "video";

export type SortBy =
    | "updatedAt"
    | "title"
    | "status";

export interface Assignee {
    id: string;
    name: string;
}

export interface TaskMeta {
    priority?: string;
    note?: string;
}

export interface Task {
    id: string;
    title: string;
    type: TaskType;
    status: TaskStatus;
    assignee: Assignee | null;
    annotationCount: number;
    updatedAt: string;
    meta: TaskMeta;
}