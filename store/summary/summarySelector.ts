import { RootState } from "..";

const selectSummaryState = (state: RootState) => state.summary;

export const selectSummaryContent = (state: RootState) =>
    selectSummaryState(state).content;

export const selectIsStreaming = (state: RootState) =>
    selectSummaryState(state).isStreaming;

export const selectIsComplete = (state: RootState) =>
    selectSummaryState(state).isComplete;

export const selectSummaryError = (state: RootState) =>
    selectSummaryState(state).error;