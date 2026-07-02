export interface SummaryState {
    content: string;
    isStreaming: boolean;
    isComplete: boolean;
    error: string | null;
}