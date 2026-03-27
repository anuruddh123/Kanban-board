import { useDraggable } from "@dnd-kit/core";
import { Pencil, Trash2, GripVertical } from "lucide-react";
import { useTasks } from "../context/TaskContext";
import { motion } from "framer-motion";

export default function TaskCard({ task, onEdit }) {
  const { deleteTask } = useTasks();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    zIndex: isDragging ? 50 : 1, // ensure dragged card is always on top
  };


  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className="
        bg-white/70
        backdrop-blur-xl
        border border-white/20
        p-5 rounded-3xl
        shadow-lg shadow-gray-300/30
        relative
        group
      "
    >
      {/* DRAG HANDLE */}
      <div
        {...listeners}
        {...attributes}
        className="absolute top-3 left-3 cursor-grab active:cursor-grabbing text-gray-400"
      >
        <GripVertical size={18} />
      </div>

      {/* ACTION ICONS */}
    <div
  className="
    absolute top-3 right-3 flex gap-2
    opacity-100 md:opacity-0
    md:group-hover:opacity-100
    transition-all duration-300
  "
>
  <Pencil
    size={18}
    onClick={() => onEdit(task)}
    className="cursor-pointer text-gray-400 hover:text-blue-500 transition-all"
  />

  <Trash2
    size={18}
    onClick={() => deleteTask(task.id)}
    className="cursor-pointer text-gray-400 hover:text-red-500 transition-all"
  />
</div>

      {/* TITLE */}
      <h3 className="font-semibold text-gray-800 text-lg mb-1 mt-2">
        {task.title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 line-clamp-2 mb-4">
        {task.description}
      </p>

      {/* FOOTER */}
      <div className="flex justify-between items-center">
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold transition-all ${
            task.priority === "High"
              ? "bg-red-100 text-red-600 animate-pulse"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-600 animate-pulse"
              : "bg-green-100 text-green-600 animate-pulse"
          }`}
        >
          {task.priority}
        </span>

        {task.deadline && (
          <span className="text-xs text-gray-400 flex items-center gap-1">
            📅 {task.deadline}
          </span>
        )}
      </div>

      
      
    </motion.div>
  );
}