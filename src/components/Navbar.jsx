import { motion } from "framer-motion";

export default function Navbar({ onAdd }) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 drop-shadow-md">
            Kanban Board
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Organize your tasks efficiently
          </p>
        </div>

        <motion.button
          onClick={() => onAdd("todo")} // Default to "todo"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-2xl font-semibold shadow-md transition-all"
        >
          + New Task
        </motion.button>
      </div>

      <div className="relative mb-6 h-1">
        <div className="absolute inset-0 bg-gray-300/30 rounded-full blur-sm"></div>
        <div className="absolute inset-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-200 rounded-full opacity-60 animate-pulse"></div>
      </div>
    </>
  );
}