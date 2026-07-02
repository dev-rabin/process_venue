import { tasksAdapter } from "./taskAdapter";
import type { RootState } from "../index";
import { selectSelectedTask, selectVisibleTasks } from "./taskSelector";

describe("taskSelectors", () => {
    it("returns the selected task", () => {
        const tasksState = tasksAdapter.setAll(
            {
                ...tasksAdapter.getInitialState(),
                loading: false,
                error: null,
                page: 1,
                pageSize: 20,
                total: 2,
                selectedTaskId: "1",
                search: "",
                statusFilter: "all",
                typeFilter: "all",
                sortBy: "desc",
            },
            [
                {
                    id: "1",
                    title: "Task 1",
                    type: "Bug",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: Date.now(),
                    meta: {},
                },
                {
                    id: "2",
                    title: "Task 2",
                    type: "Feature",
                    status: "Done",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: Date.now(),
                    meta: {},
                },
            ]
        );

        const state = {
            tasks: tasksState,
            summary: {} as RootState["summary"],
        } as RootState;

        expect(selectSelectedTask(state)?.id).toBe("1");
    });

    it("filters tasks by search", () => {
        const tasksState = tasksAdapter.setAll(
            {
                ...tasksAdapter.getInitialState(),
                loading: false,
                error: null,
                page: 1,
                pageSize: 20,
                total: 2,
                selectedTaskId: null,
                search: "login",
                statusFilter: "all",
                typeFilter: "all",
                sortBy: "desc",
            },
            [
                {
                    id: "1",
                    title: "Fix login bug",
                    type: "Bug",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 1,
                    meta: {},
                },
                {
                    id: "2",
                    title: "Add dashboard",
                    type: "Feature",
                    status: "Done",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 2,
                    meta: {},
                },
            ]
        );

        const state = {
            tasks: tasksState,
            summary: {} as RootState["summary"],
        } as RootState;

        const visibleTasks = selectVisibleTasks(state);

        expect(visibleTasks).toHaveLength(1);
        expect(visibleTasks[0].title).toBe("Fix login bug");
    });

    it("filters tasks by status", () => {
        const tasksState = tasksAdapter.setAll(
            {
                ...tasksAdapter.getInitialState(),
                loading: false,
                error: null,
                page: 1,
                pageSize: 20,
                total: 3,
                selectedTaskId: null,
                search: "",
                statusFilter: "Todo",
                typeFilter: "all",
                sortBy: "desc",
            },
            [
                {
                    id: "1",
                    title: "Fix login bug",
                    type: "Bug",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 1,
                    meta: {},
                },
                {
                    id: "2",
                    title: "Add dashboard",
                    type: "Feature",
                    status: "Done",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 2,
                    meta: {},
                },
                {
                    id: "3",
                    title: "Write tests",
                    type: "Task",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 3,
                    meta: {},
                },
            ]
        );

        const state = {
            tasks: tasksState,
            summary: {} as RootState["summary"],
        } as RootState;

        const visibleTasks = selectVisibleTasks(state);

        expect(visibleTasks).toHaveLength(2);
        expect(visibleTasks.every((task) => task.status === "Todo")).toBe(true);
    });

    it("filters tasks by type", () => {
        const tasksState = tasksAdapter.setAll(
            {
                ...tasksAdapter.getInitialState(),
                loading: false,
                error: null,
                page: 1,
                pageSize: 20,
                total: 3,
                selectedTaskId: null,
                search: "",
                statusFilter: "all",
                typeFilter: "Bug",
                sortBy: "desc",
            },
            [
                {
                    id: "1",
                    title: "Fix login bug",
                    type: "Bug",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 1,
                    meta: {},
                },
                {
                    id: "2",
                    title: "Add dashboard",
                    type: "Feature",
                    status: "Done",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 2,
                    meta: {},
                },
                {
                    id: "3",
                    title: "Fix API",
                    type: "Bug",
                    status: "QA",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 3,
                    meta: {},
                },
            ]
        );

        const state = {
            tasks: tasksState,
            summary: {} as RootState["summary"],
        } as RootState;

        const visibleTasks = selectVisibleTasks(state);

        expect(visibleTasks).toHaveLength(2);
        expect(visibleTasks.every((task) => task.type === "Bug")).toBe(true);
    });

    it("sorts tasks by updatedAt in descending order", () => {
        const tasksState = tasksAdapter.setAll(
            {
                ...tasksAdapter.getInitialState(),
                loading: false,
                error: null,
                page: 1,
                pageSize: 20,
                total: 3,
                selectedTaskId: null,
                search: "",
                statusFilter: "all",
                typeFilter: "all",
                sortBy: "desc",
            },
            [
                {
                    id: "1",
                    title: "Old",
                    type: "Bug",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 100,
                    meta: {},
                },
                {
                    id: "2",
                    title: "Newest",
                    type: "Bug",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 300,
                    meta: {},
                },
                {
                    id: "3",
                    title: "Middle",
                    type: "Bug",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 200,
                    meta: {},
                },
            ]
        );

        const state = {
            tasks: tasksState,
            summary: {} as RootState["summary"],
        } as RootState;

        const visibleTasks = selectVisibleTasks(state);

        expect(visibleTasks.map((task) => task.id)).toEqual(["2", "3", "1"]);
    });

    it("sorts tasks by updatedAt in ascending order", () => {
        const tasksState = tasksAdapter.setAll(
            {
                ...tasksAdapter.getInitialState(),
                loading: false,
                error: null,
                page: 1,
                pageSize: 20,
                total: 3,
                selectedTaskId: null,
                search: "",
                statusFilter: "all",
                typeFilter: "all",
                sortBy: "asc",
            },
            [
                {
                    id: "1",
                    title: "Old",
                    type: "Bug",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 100,
                    meta: {},
                },
                {
                    id: "2",
                    title: "Newest",
                    type: "Bug",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 300,
                    meta: {},
                },
                {
                    id: "3",
                    title: "Middle",
                    type: "Bug",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 200,
                    meta: {},
                },
            ]
        );

        const state = {
            tasks: tasksState,
            summary: {} as RootState["summary"],
        } as RootState;

        const visibleTasks = selectVisibleTasks(state);

        expect(visibleTasks.map((task) => task.id)).toEqual(["1", "3", "2"]);
    });
});