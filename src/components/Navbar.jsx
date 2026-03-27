import { motion } from "framer-motion";

export default function Navbar({ onAdd }) {
  return (
    <>
      <div
        className="
          flex items-center justify-between
          gap-3 md:gap-0
          mb-6
          p-3 md:p-4
          rounded-2xl
          bg-white/70 backdrop-blur-xl
          border border-gray-200
          shadow-sm
        "
      >
        {/* LEFT */}
        <div className="flex flex-col">

          {/* 🔥 PREMIUM HEADING */}
          <h1
            className="
              text-xl sm:text-2xl md:text-3xl
              font-extrabold
              bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500
              bg-clip-text text-transparent
              tracking-tight
            "
          >
            Kanban Board
          </h1>

          <p className="text-gray-500 text-[11px] sm:text-xs md:text-sm mt-1">
            Manage tasks like a pro
          </p>
        </div>

        {/* BUTTON */}
        <motion.button
          onClick={() => onAdd("todo")}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          className="
            bg-gradient-to-r from-blue-500 to-indigo-500
            text-white
            px-3 sm:px-4 md:px-5
            py-2
            rounded-xl md:rounded-2xl
            text-xs sm:text-sm md:text-base
            font-semibold
            shadow-md
            whitespace-nowrap
          "
        >
          + New Task
        </motion.button>
      </div>

      {/* 🔥 PREMIUM DIVIDER */}
      <div className="relative mb-5 md:mb-6 h-[2px]">
        <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
        <div className="absolute inset-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full opacity-70 animate-pulse"></div>
      </div>
    </>
  );
}