import { WebSocketEvent } from "@/types/websocketType";
import type { AppDispatch } from "../index";
import {
    annotationCreatedFromWebSocket,
    tasksAssignedFromWebSocket,
    tasksUpdatedFromWebSocket,
} from "../tasks/taskSlice";

export const handleWebSocketEvent = (dispatch: AppDispatch, event: WebSocketEvent) => {
    switch (event.kind) {
        case "task.updated":
            dispatch(tasksUpdatedFromWebSocket(event.payload));
            break;
        
        case "task.assigned":
            dispatch(tasksAssignedFromWebSocket(event.payload));
            break;

        case "annotation.created":
            dispatch(annotationCreatedFromWebSocket({
                taskId: event.payload.taskId,
                at: event.payload.at,
            }));
            break;

        default: console.warn("Unknown WebSocket event:", event);
            break;
    }
};