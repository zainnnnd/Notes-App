import { FaStickyNote, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function Header({ search, setSearch }) {

    const navigate = useNavigate();

    async function logoutUser() {

        try {

            await signOut(auth);

            toast.success("Logged Out Successfully");

            navigate("/login");

        } catch (error) {

            toast.error(error.message);

        }

    }

    return (

        <motion.header

            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}

            className="sticky top-0 z-50 h-20 bg-slate-900/70 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl"

        >

            <div className="h-full px-8 flex items-center justify-between">

                {/* Logo */}

                <div className="flex items-center gap-3">

                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-3 rounded-2xl shadow-lg">

                        <FaStickyNote className="text-2xl text-white" />

                    </div>

                    <div>

                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

                            Notes App

                        </h1>

                        <p className="text-xs text-slate-400">

                            React • Firebase

                        </p>

                    </div>

                </div>

                {/* Search */}

                <div className="w-[420px]">

                    <input

                        type="text"

                        placeholder="🔍 Search your notes..."

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                        className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl px-5 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 focus:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"

                    />

                </div>

                {/* Logout */}

                <motion.button

                    whileHover={{ scale: 1.05 }}

                    whileTap={{ scale: 0.95 }}

                    onClick={logoutUser}

                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg hover:shadow-red-500/40 transition-all"

                >

                    <FaSignOutAlt />

                    Logout

                </motion.button>

            </div>

        </motion.header>

    );

}

export default Header;