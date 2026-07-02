"use client";

import React, { useEffect, useMemo, useState } from "react";

type Task = {
  id: string;
  title: string;
  updatedAt: number;
};

export function TaskTicker({ apiBase }: { apiBase: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  // (A) Keep a running clock for "x seconds ago"
  useEffect(() => {
    const id = setInterval(() => {
      // FIX 1: Use functional update to avoid stale closure.
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  // (B) Refetch whenever selection changes
  useEffect(() => {
    // FIX 2: Prevent unnecessary API call on initial render.
    if (!selectedId) return;
    fetch(`${apiBase}/api/tasks/${selectedId}`)
      .then((r) => r.json())
      .then((t) => {
        // FIX 3: Never mutate React state.
        // push() mutates the existing array, so create a new one instead.
        setTasks((prev) => [...prev, t]);
      });
    // FIX 4: Include all external dependencies used inside the effect.
  }, [apiBase, selectedId]);

  // (C) Newest first
  // FIX 5: sort() mutates the original array.
  // Copy the array before sorting and memoize the result.
  const sorted = useMemo(() => {
    return [...tasks].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [tasks]);

  return (
    <ul>
      {sorted.map((t) => (
        // FIX 6: Use a stable key instead of array index.
        <li key={t.id} onClick={() => setSelectedId(t.id)}>
          {t.title} (updated {Math.floor((Date.now() - t.updatedAt) / 1000)}s
          ago)
        </li>
      ))}
    </ul>
  );
}
