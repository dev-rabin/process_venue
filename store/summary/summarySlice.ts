import { SummaryState } from "@/types/summaryType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SummaryState = {
    content: "",
    isStreaming: false,
    isComplete: false,
    error: null,
};

const summarySlice = createSlice({
    name: "summary",
    initialState,
    reducers: {
        startStreaming: (state) => {
            state.content = "";
            state.isStreaming = true;
            state.isComplete = false;
            state.error = null;
        },

        appendChunk: (state, action: PayloadAction<string>) => {
            state.content += action.payload;
        },

        completeStreaming: (state) => {
            state.isStreaming = false;
            state.isComplete = true;
        },

        streamingError: (state, action: PayloadAction<string>) => {
            state.isStreaming = false;
            state.isComplete = false;
            state.error = action.payload;
        },

        clearSummary: (state) => {
            state.content = "";
            state.isStreaming = false;
            state.isComplete = false;
            state.error = null;
        },
    },
});

export const {
    startStreaming,
    appendChunk,
    completeStreaming,
    streamingError,
    clearSummary,
} = summarySlice.actions;

export default summarySlice.reducer;