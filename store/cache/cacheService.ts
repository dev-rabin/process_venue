import localforage from "localforage";
import { Tasks } from "@/types/taskType";

const TASKS_CACHE_KEY = "tasks-cache";

class CacheService {
    async saveTasks(tasks: Tasks[]) {
        await localforage.setItem(TASKS_CACHE_KEY, tasks);
    }

    async getTasks(): Promise<Tasks[]> {
        try {
            console.log("Loading tasks from cache");
            const tasks = await localforage.getItem<Tasks[]>(TASKS_CACHE_KEY);
            return tasks ?? [];
        } catch {
            return [];
        }
    }
    async clearTasks() {
        await localforage.removeItem(TASKS_CACHE_KEY);
    }
}

export const cacheService = new CacheService();