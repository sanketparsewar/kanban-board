import { useDraggable } from "@dnd-kit/core";
import useStore from "../store/useStore";
import { useEffect, useRef, useState } from "react";
import { Check, GripHorizontal, Trash2 } from "lucide-react";
import type { Task } from "../types/type";
import successToaster from "../utils/toaster";

type TaskCardProps = {
  task: Task;
};
function TaskCard({ task }: TaskCardProps) {
  const { deleteTask, updateTask } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleEditTask = (setter: (field: string) => void, value: string) => {
    setIsEditing(true);
    setter(value);
  };
  const handleUpdateTask = () => {
    updateTask({ ...task, title, description });
    setIsEditing(false);
  };
  const handleDeleteTask = () => {
    deleteTask(task.id);
    successToaster("Task deleted successfully!");
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [description]);

  const taskId = task.id % 100000;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border border-gray-400 mt-2 p-2  cursor-grab`}
    >
      <div className="flex justify-between items-center">
        <div
          className={`${task.status === "done" ? "line-through" : ""} font-medium border inline-block px-1 bg-white`}
        >
          KB-{taskId}
        </div>

        {isEditing ? (
          <button
            className="cursor-pointer text-green-600 hover:text-green-500 transition"
            onClick={handleUpdateTask}
          >
            <Check size={18} />
          </button>
        ) : (
          <button
            className="cursor-pointer text-red-500 hover:text-red-400 transition"
            onClick={() => handleDeleteTask()}
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => handleEditTask(setTitle, e.target.value)}
        maxLength={25}
        max={25}
        readOnly={task.status === "done"}
        className="text-lg font-semibold bg-transparent border-none focus:outline-none placeholder:text-gray-400"
      />

      <textarea
        ref={textareaRef}
        value={description}
        placeholder="Task description..."
        rows={1}
        readOnly={task.status === "done"}
        onChange={(e) => handleEditTask(setDescription, e.target.value)}
        className="bg-transparent border-none focus:outline-none resize-none text-gray-700 placeholder:text-gray-400 leading-relaxed"
        style={{ overflow: "hidden" }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = "auto";
          target.style.height = target.scrollHeight + "px";
        }}
      />
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab pr-2 text-center flex items-center justify-center"
      >
        <GripHorizontal />
      </div>

      {/* {task.title}
      <p className="text-sm text-gray-500">{task.description}</p> */}
    </div>
  );
}

export default TaskCard;
