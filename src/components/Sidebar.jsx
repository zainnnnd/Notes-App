import {
  FaStickyNote,
  FaStar,
  FaTrash,
  FaCog,
  FaRocket
} from "react-icons/fa";
import { motion } from "framer-motion";

function Sidebar() {

  const menuItems = [
    {
      icon: <FaStickyNote />,
      title: "All Notes"
    },
    {
      icon: <FaStar />,
      title: "Favorites"
    },
    {
      icon: <FaTrash />,
      title: "Trash"
    },
    {
      icon: <FaCog />,
      title: "Settings"
    }
  ];

  return (

    <motion.div

      initial={{ x: -60, opacity: 0 }}

      animate={{ x: 0, opacity: 1 }}

      transition={{ duration: 0.45 }}

      className="h-full rounded-3xl bg-slate-900/70 backdrop-blur-2xl border border-slate-700 shadow-2xl p-6 flex flex-col"

    >

      <div className="flex items-center gap-3 mb-10">

        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex justify-center items-center text-white text-xl shadow-lg">

          <FaRocket />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-white">
            Notes
          </h1>

          <p className="text-slate-400 text-sm">
            Personal Workspace
          </p>

        </div>

      </div>

      <div className="flex flex-col gap-4">

        {menuItems.map((item, index) => (

          <motion.button

            key={index}

            whileHover={{
              scale: 1.03,
              x: 8
            }}

            whileTap={{
              scale: 0.97
            }}

            className="flex items-center gap-4 bg-slate-800/70 rounded-2xl p-4 border border-slate-700 hover:border-cyan-400 hover:bg-slate-800 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]"

          >

            <span className="text-cyan-400 text-xl">

              {item.icon}

            </span>

            <span className="font-semibold text-white">

              {item.title}

            </span>

          </motion.button>

        ))}

      </div>

      <div className="mt-auto">

        <div className="rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 p-5 shadow-xl">

          <h2 className="text-white font-bold text-lg">
            🚀 Notes App
          </h2>

          <p className="text-slate-100 text-sm mt-2">
            Built with React, Firebase and Tailwind CSS.
          </p>

        </div>

      </div>

    </motion.div>

  );

}

export default Sidebar;