import { Tasks } from "@/types/taskType";

const TASKS_CACHE_KEY = "tasks-cache";

class CacheService {
    saveTasks(tasks: Tasks[]) {
        localStorage.setItem(TASKS_CACHE_KEY, JSON.stringify(tasks));
    }

    getTasks(): Tasks[] {
        const data = localStorage.getItem(TASKS_CACHE_KEY);
        if (!data) {
            return [];
        }
        try {
            console.log("Loading tasks from cache");
            return JSON.parse(data) as Tasks[];
        } catch {
            return [];
        }
    }
    clearTasks() {
        localStorage.removeItem(TASKS_CACHE_KEY);
    }
}

export const cacheService = new CacheService();