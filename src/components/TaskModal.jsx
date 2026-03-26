import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function TaskModal({ close, defaultStatus }) {
  const { addTask } = useTasks();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: defaultStatus || "todo",
    priority: "Medium",
    deadline: "",
  });

  const handleSubmit = () => {
    if (!form.title) return;
    addTask(form);
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 50 }}
        transition={{ type: "spring", stiffness: 120, damping: 15 }}
        className="bg-white/80 backdrop-blur-lg border border-white/20 w-full max-w-lg rounded-3xl shadow-2xl p-6 relative"
      >
        {/* CLOSE BUTTON */}
        <motion.button
          onClick={close}
          whileHover={{ rotate: 90, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-all"
        >
          <X size={22} />
        </motion.button>

        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Task</h2>

        {/* TITLE */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Task Title</label>
          <input
            placeholder="Enter task title..."
            className="w-full border border-gray-200 rounded-2xl p-3 mt-1 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Description</label>
          <textarea
            placeholder="Enter description..."
            rows={3}
            className="w-full border border-gray-200 rounded-2xl p-3 mt-1 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all resize-none"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* STATUS */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Status</label>
          <select
            value={form.status}
            className="w-full border border-gray-200 rounded-2xl p-3 mt-1 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        {/* GRID: PRIORITY & DEADLINE */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm text-gray-500">Priority</label>
            <select
              className="w-full border border-gray-200 rounded-2xl p-3 mt-1 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-500">Deadline</label>
            <input
              type="date"
              className="w-full border border-gray-200 rounded-2xl p-3 mt-1 focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <motion.button
          onClick={handleSubmit}
          whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-2xl font-semibold shadow-md transition-all"
        >
          Add Task
        </motion.button>
      </motion.div>
    </div>
  );
}