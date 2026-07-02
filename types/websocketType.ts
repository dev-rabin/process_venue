import { Assignee, Status } from "./taskType";

export interface TaskUpdatedEvent {
    kind: "task.updated";
    payload: {
        id: string;
        status: Status;
        updatedAt: number;
    };
}

export interface TaskAssignedEvent {
    kind: "task.assigned";
    payload: {
        id: string;
        assignee: Assignee | null;
    };
}

export interface AnnotationCreatedEvent {
    kind: "annotation.created";
    payload: {
        taskId: string;
        by: string;
        at: number;
    };
}

export type WebSocketEvent =
    | TaskUpdatedEvent
    | TaskAssignedEvent
    | AnnotationCreatedEvent;