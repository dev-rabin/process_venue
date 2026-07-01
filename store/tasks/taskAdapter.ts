import { Task } from "@/types/taskType";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const tasksAdapter = createEntityAdapter<Task>();