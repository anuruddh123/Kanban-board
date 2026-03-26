import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function EditModal({ task, close }) {
  const { updateTask } = useTasks();
  const [form, setForm] = useState(task);

  const handleSave = () => {
    updateTask(task.id, form);
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
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <X size={22} />
        </motion.button>

        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Task</h2>

        {/* TITLE */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Task Title</label>
          <input
            value={form.title}
            className="w-full border border-gray-200 rounded-2xl p-3 mt-1 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Description</label>
          <textarea
            value={form.description}
            className="w-full border border-gray-200 rounded-2xl p-3 mt-1 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-none"
            rows={3}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* PRIORITY & DEADLINE */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm text-gray-500">Priority</label>
            <select
              value={form.priority}
              className="w-full border border-gray-200 rounded-2xl p-3 mt-1 focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
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
              value={form.deadline || ""}
              className="w-full border border-gray-200 rounded-2xl p-3 mt-1 focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            />
          </div>
        </div>

        {/* SAVE BUTTON */}
        <motion.button
          onClick={handleSave}
          whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-2xl font-semibold shadow-md transition-all"
        >
          Save Changes
        </motion.button>
      </motion.div>
    </div>
  );
}