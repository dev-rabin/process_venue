import { api } from "@/services/api";
import { AppDispatch } from "../index";
import {
    appendChunk,
    completeStreaming,
    startStreaming,
    streamingError,
} from "./summarySlice";

class SummaryService {
    private eventSource: EventSource | null = null;

    start(taskId: string, dispatch: AppDispatch) {
        const url = `${api.defaults.baseURL}/tasks/${taskId}/summary`;
        let isCompleted = false
        this.stop();
        dispatch(startStreaming());

        this.eventSource = new EventSource(url);
        this.eventSource.onmessage = (event) => {
            dispatch(appendChunk(event.data));
        };
        this.eventSource.addEventListener("done", () => {
            isCompleted = true
            dispatch(completeStreaming());
            this.stop();
        });
        this.eventSource.addEventListener("end", () => {
            isCompleted = true;
            dispatch(completeStreaming());
            this.stop();
        });
        this.eventSource.onerror = () => {
            if (isCompleted) return
            dispatch(streamingError("Failed to stream summary."));
            this.stop();
        };
    }
    stop() {
        if (!this.eventSource) return;
        this.eventSource.close();
        this.eventSource = null;
    }
}

export const summaryService = new SummaryService();