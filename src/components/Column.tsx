import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import useStore from "../store/useStore";
import { columnColors } from "../utils/statusColor";
import type { Task } from "../types/type";

type ColumnProps = {
  title: string;
  status: string;
  tasks: Task[];
};

function Column({ title, status, tasks }: ColumnProps) {
  const { addTask } = useStore();
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const filtered = tasks.filter((task) => task.status === status);

  const handleAddTask = (status: string) => {
    const newTask: Task = {
      id: Date.now(),
      title: "",
      description: "",
      status: status,
    };
    addTask(newTask);
  };

  return (
    <div
      ref={setNodeRef}
      className={`border p-3 group rounded-md w-1/5  ${columnColors[status]} `}
    >
      <h3 className={`font-bold text-lg p-2 text-center bg-white`}>{title}</h3>

      {filtered.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      <div className={`group ${status === "done" ? "hidden" : ""}`}>
        <div
          className="border border-gray-200 w-full flex items-center justify-center mt-2 p-2 cursor-pointer text-gray-400 invisible group-hover:visible"
          onClick={() => handleAddTask(status)}
        >
          <Plus />
        </div>
      </div>
    </div>
  );
}

export default Column;
