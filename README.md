# Annotation Activity Console

A production-oriented frontend assessment built with Next.js, React, TypeScript, Redux Toolkit, and Tailwind CSS.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Redux Toolkit
- React Redux
- Tailwind CSS v4
- Axios
- Jest
- React Testing Library
- localForage
- WebSocket
- Server-Sent Events (SSE)

## Features

- Task List
- Task Detail
- Pagination
- Search
- Filtering
- Sorting
- Entity Adapter
- Memoized Selectors
- WebSocket Live Updates
- SSE Summary
- Offline Cache (localForage)
- Cached/Fresh Data Indicator
- Unit & Component Tests

## Installation

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

## Run Mock Server

```bash
npm run server
```

## Run Tests

```bash
npm test
```

## Architecture

```
Components
     ↓
Selectors
     ↓
Redux Toolkit
     ↓
Async Thunks
     ↓
Service Layer
     ↓
REST API
```

## Project Structure

```
src/
 ├── components/
 ├── services/
 ├── store/
 ├── websocket/
 ├── utils/
 └── tests/
```