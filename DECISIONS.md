# Architecture Decisions

## Redux Toolkit

Used Redux Toolkit for predictable global state management and simplified reducer logic.

---

## Entity Adapter

Used `createEntityAdapter` to normalize task data, enabling efficient updates from WebSocket events and reducing unnecessary re-renders.

---

## Async Thunks

Used `createAsyncThunk` instead of RTK Query because the assessment explicitly required async thunks and it provides full control over request handling.

---

## Feature-First Architecture

Grouped files by feature rather than file type to improve scalability and maintainability.

---

## Memoized Selectors

Used memoized selectors to avoid unnecessary recalculations for search, filtering, and sorting.

---

## Service Layer

Separated API logic from Redux to keep thunks focused on orchestration rather than HTTP implementation.

---

## localForage

Used localForage to persist task data in IndexedDB, allowing cached data to be displayed before fresh data is fetched.

---

## Cached/Fresh Indicator

Added a Redux `dataSource` flag to indicate whether the UI is currently displaying cached data or fresh network data.

---

## WebSocket

Centralized WebSocket handling using a dedicated service and Redux actions instead of allowing components to subscribe directly.

---

## Testing

Added reducer, selector, utility, and component tests to validate business logic and UI behavior.