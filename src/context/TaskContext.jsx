import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );

  // Save only JSON-safe fields to localStorage
  useEffect(() => {
    const safeTasks = tasks.map(t => ({
      id: t.id,
      title: t.title,
      description: t.description,
      status: t.status,
      priority: t.priority,
      deadline: t.deadline
    }));
    localStorage.setItem("tasks", JSON.stringify(safeTasks));
  }, [tasks]);

  const addTask = (task) => {
    // Strip any extra fields that could be DOM/React elements
    const safeTask = {
      id: uuid(),
      title: task.title,
      description: task.description,
      status: task.status || "todo",
      priority: task.priority || "Medium",
      deadline: task.deadline || ""
    };
    setTasks([...tasks, safeTask]);
  };

  const updateTask = (id, updated) => {
    setTasks(tasks.map(t =>
      t.id === id
        ? {
            ...t,
            title: updated.title ?? t.title,
            description: updated.description ?? t.description,
            status: updated.status ?? t.status,
            priority: updated.priority ?? t.priority,
            deadline: updated.deadline ?? t.deadline
          }
        : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);