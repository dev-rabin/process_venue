import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks/taskSlice";
import summaryReducer from "./summary/summarySlice"

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        summary: summaryReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;