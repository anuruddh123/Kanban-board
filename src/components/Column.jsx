import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { motion, AnimatePresence } from "framer-motion";

export default function Column({ title, tasks, id, onEdit, onAdd }) {
  const { setNodeRef } = useDroppable({ id });

  const colors = {
    todo: "from-pink-200 to-pink-50",
    inprogress: "from-yellow-200 to-yellow-50",
    done: "from-green-200 to-green-50",
  };

  const mobileMinHeight = `${tasks.length * 120}px`;

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className={`
        bg-gradient-to-b ${colors[id]}
        p-6 rounded-3xl
        w-full flex flex-col
        shadow-2xl hover:shadow-3xl
        border border-white/20
        backdrop-blur-md
        transition-all duration-300
        min-h-[550px] md:min-h-[550px]
      `}
      style={{
        minHeight: window.innerWidth < 768 ? mobileMinHeight : undefined,
        maxHeight: "80vh",
      }}
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-gray-800 text-lg">{title}</h2>
        <span className="bg-white/80 px-3 py-1 rounded-full text-sm font-medium shadow-inner">
          {tasks.length}
        </span>
      </div>

      {/* Add Task button always visible */}
      <motion.button
        onClick={() => onAdd(id)}
        whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}
        whileTap={{ scale: 0.95 }}
        className="mb-4 bg-blue-500 text-white px-5 py-2 rounded-2xl font-semibold shadow-md transition-all"
      >
        + Add Task
      </motion.button>

      <div className="space-y-4 flex-1 overflow-y-auto">
        <AnimatePresence>
          {tasks.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 150, damping: 15 }}
            >
              <TaskCard task={task} onEdit={onEdit} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}