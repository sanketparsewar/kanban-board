import { useEffect, useState } from "react";
import Column from "./Column";
import { DndContext } from "@dnd-kit/core";
import useStore from "../store/useStore";

function Board() {
  const { tasks, updateTaskList } = useStore();
  const [allTasks, setAllTasks] = useState(tasks);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    setAllTasks((prev) => {
      const updatedTasks = prev.map((task) =>
        task.id === active.id ? { ...task, status: over.id } : task,
      );

      updateTaskList(updatedTasks);

      return updatedTasks;
    });
  };
  useEffect(() => {
    setAllTasks(tasks);
  }, [tasks]);
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className=" flex items-start justify-between gap-4 w-max-screen">
        <Column title="To Do" status="todo" tasks={allTasks}></Column>
        <Column
          title="Need changes"
          status="need-changes"
          tasks={allTasks}
        ></Column>
        <Column
          title="In Progress"
          status="in-progress"
          tasks={allTasks}
        ></Column>
        <Column
          title="Pull Request"
          status="pull-request"
          tasks={allTasks}
        ></Column>
        <Column title="In QA" status="in-qa" tasks={allTasks}></Column>
        <Column title="Done" status="done" tasks={allTasks}></Column>
      </div>
    </DndContext>
  );
}

export default Board;
