import reducer, { annotationCreatedFromWebSocket, setAllTasks, setSearch, setSortBy, setStatusFilter, setTypeFilter, tasksAssignedFromWebSocket, tasksUpdatedFromWebSocket } from "./taskSlice";

describe("taskSlice", () => {
    it("sets search and resets page to 1", () => {
        const initialState = reducer(undefined, { type: "@@INIT" });

        const state = reducer(initialState, setSearch("login"));

        expect(state.search).toBe("login");
        expect(state.page).toBe(1);
    });
    it("sets status filter and resets page to 1", () => {
        let state = reducer(undefined, { type: "@@INIT" });

        state = {
            ...state,
            page: 5,
        };

        state = reducer(state, setStatusFilter("Todo"));

        expect(state.statusFilter).toBe("Todo");
        expect(state.page).toBe(1);
    });
    it("sets type filter and resets page to 1", () => {
        let state = reducer(undefined, { type: "@@INIT" });

        state = {
            ...state,
            page: 5,
        };

        state = reducer(state, setTypeFilter("Bug"));

        expect(state.typeFilter).toBe("Bug");
        expect(state.page).toBe(1);
    });
    it("sets sort order and resets page to 1", () => {
        let state = reducer(undefined, { type: "@@INIT" });

        state = {
            ...state,
            page: 5,
        };

        state = reducer(state, setSortBy("desc"));

        expect(state.sortBy).toBe("desc");
        expect(state.page).toBe(1);
    });
    it("updates task status and updatedAt from websocket", () => {
        let state = reducer(undefined, { type: "@@INIT" });

        state = reducer(
            state,
            setAllTasks([
                {
                    id: "1",
                    title: "Task",
                    type: "Bug",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 100,
                    meta: {},
                },
            ])
        );

        state = reducer(
            state,
            tasksUpdatedFromWebSocket({
                id: "1",
                status: "Done",
                updatedAt: 200,
            })
        );

        expect(state.entities["1"]?.status).toBe("Done");
        expect(state.entities["1"]?.updatedAt).toBe(200);
    });
    it("updates task assignee from websocket", () => {
        let state = reducer(undefined, { type: "@@INIT" });

        state = reducer(
            state,
            setAllTasks([
                {
                    id: "1",
                    title: "Task",
                    type: "Bug",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 0,
                    updatedAt: 100,
                    meta: {},
                },
            ])
        );

        state = reducer(
            state,
            tasksAssignedFromWebSocket({
                id: "1",
                assignee: {
                    id: "u1",
                    name: "Robin",
                },
            })
        );

        expect(state.entities["1"]?.assignee?.name).toBe("Robin");
    });
    it("increments annotation count and updates updatedAt", () => {
        let state = reducer(undefined, { type: "@@INIT" });

        state = reducer(
            state,
            setAllTasks([
                {
                    id: "1",
                    title: "Task",
                    type: "Bug",
                    status: "Todo",
                    assignee: null,
                    annotationCount: 2,
                    updatedAt: 100,
                    meta: {},
                },
            ])
        );

        state = reducer(
            state,
            annotationCreatedFromWebSocket({
                taskId: "1",
                at: 500,
            })
        );

        expect(state.entities["1"]?.annotationCount).toBe(3);
        expect(state.entities["1"]?.updatedAt).toBe(500);
    });
});