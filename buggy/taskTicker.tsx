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

  // (A) Keep updating time every second
  useEffect(() => {
    const id = setInterval(() => {
      // FIX 1:
      // Old code always used the old value of tick.
      // Functional update always gets the latest value.
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  // (B) Fetch task when a task is selected
  useEffect(() => {
    // FIX 2:
    // Don't call the API if no task is selected.
    if (!selectedId) return;

    fetch(`${apiBase}/api/tasks/${selectedId}`)
      .then((r) => r.json())
      .then((t) => {
        // FIX 3:
        // Don't change the existing array.
        // Create a new array instead.
        setTasks((prev) => [...prev, t]);
      });

    // FIX 4:
    // Add apiBase because it is used inside this effect.
  }, [apiBase, selectedId]);

  // (C) Show newest task first

  // FIX 5:
  // sort() changes the original array.
  // Copy the array first, then sort it.
  const sorted = useMemo(() => {
    return [...tasks].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [tasks]);

  return (
    <ul>
      {sorted.map((t) => (
        // FIX 6:
        // Use task id as the key.
        // Don't use array index because it can change.
        <li key={t.id} onClick={() => setSelectedId(t.id)}>
          {t.title} (updated {Math.floor((Date.now() - t.updatedAt) / 1000)}s
          ago)
        </li>
      ))}
    </ul>
  );
}
