import { Tasks } from "@/types/taskType";
import { createEntityAdapter } from "@reduxjs/toolkit";

export const tasksAdapter = createEntityAdapter<Tasks>();