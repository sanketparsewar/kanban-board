import { create } from "zustand";
import type { Task } from "../types/type";
import { persist } from "zustand/middleware";

interface Store {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  updateTaskList: (tasks: Task[]) => void;
  deleteTask: (id: number) => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task: Task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),
      updateTask: (task: Task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        })),
        updateTaskList: (tasks: Task[]) =>
        set(() => ({
          tasks: tasks,
        })),
      deleteTask: (id: number) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
    }),
    {
      name: "task-storage",
    },
  ),
);

export default useStore;
