import { DndContext } from "@dnd-kit/core";
import { useTasks } from "./context/TaskContext";
import Column from "./components/Column";
import Navbar from "./components/Navbar";
import TaskModal from "./components/TaskModal";
import EditModal from "./components/EditModal";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const { tasks, updateTask } = useTasks();

  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [status, setStatus] = useState("todo");

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    updateTask(active.id, { status: over.id });
  };

  return (
    <div className="
      p-6 min-h-screen
      bg-gradient-to-br from-gray-100 to-gray-200
      dark:from-gray-900 dark:to-black
      transition-all duration-500
    ">
      {/* NAVBAR */}
      <Navbar onAdd={(s) => { setStatus(s); setOpen(true); }} />

      {/* KANBAN COLUMNS */}
      <DndContext onDragEnd={handleDragEnd}>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
        >
          <Column
            id="todo"
            title="To Do"
            tasks={tasks.filter(t => t.status === "todo")}
            onEdit={setEditTask}
            onAdd={(s) => { setStatus(s); setOpen(true); }}
          />

          <Column
            id="inprogress"
            title="In Progress"
            tasks={tasks.filter(t => t.status === "inprogress")}
            onEdit={setEditTask}
            onAdd={(s) => { setStatus(s); setOpen(true); }}
          />

          <Column
            id="done"
            title="Done"
            tasks={tasks.filter(t => t.status === "done")}
            onEdit={setEditTask}
            onAdd={(s) => { setStatus(s); setOpen(true); }}
          />
        </motion.div>
      </DndContext>

      {/* MODALS */}
      <AnimatePresence>
        {open && (
          <TaskModal
            key="taskmodal"
            close={() => setOpen(false)}
            defaultStatus={status}
          />
        )}
        {editTask && (
          <EditModal
            key="editmodal"
            task={editTask}
            close={() => setEditTask(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;