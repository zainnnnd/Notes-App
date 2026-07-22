import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import toast from "react-hot-toast";
import { FaTrash, FaStar, FaThumbtack } from "react-icons/fa";
import { motion } from "framer-motion";

function NoteCard({ note, setSelectedNote, fetchNotes }) {

  async function deleteNote() {
    try {
      await deleteDoc(doc(db, "notes", note.id));
      setSelectedNote(null);
      await fetchNotes();
      toast.success("Note Deleted");
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function toggleFavorite() {
    try {
      await updateDoc(doc(db, "notes", note.id), {
        favorite: !note.favorite,
      });

      await fetchNotes();
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function togglePinned() {
    try {
      await updateDoc(doc(db, "notes", note.id), {
        pinned: !note.pinned,
      });

      await fetchNotes();
    } catch (error) {
      toast.error(error.message);
    }
  }

  const date = note.createdAt?.toDate
    ? note.createdAt.toDate().toLocaleDateString()
    : "Today";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="bg-slate-900/70 backdrop-blur-xl border border-slate-700 rounded-3xl p-5 mb-5 shadow-xl hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all duration-300"
    >

      {/* Click only here to edit */}
      <div
        onClick={() => setSelectedNote(note)}
        className="cursor-pointer"
      >

        <div className="flex justify-between items-start">

          <h2 className="text-2xl font-bold text-cyan-400 break-words">
            {note.title}
          </h2>

          {note.pinned && (
            <FaThumbtack className="text-cyan-400 text-lg" />
          )}

        </div>

        <p className="text-slate-300 mt-3 line-clamp-4 min-h-[90px] leading-7">
          {note.content}
        </p>

      </div>

      <div className="flex justify-between items-center mt-6">

        <span className="text-sm text-slate-500">
          📅 {date}
        </span>

        <div className="flex gap-3">

          <button
            onClick={async (e) => {
              e.stopPropagation();
              await toggleFavorite();
            }}
            className={`p-3 rounded-xl transition-all duration-300 ${
              note.favorite
                ? "bg-yellow-500 text-white"
                : "bg-slate-800 hover:bg-yellow-500"
            }`}
          >
            <FaStar />
          </button>

          <button
            onClick={async (e) => {
              e.stopPropagation();
              await togglePinned();
            }}
            className={`p-3 rounded-xl transition-all duration-300 ${
              note.pinned
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 hover:bg-cyan-500"
            }`}
          >
            <FaThumbtack />
          </button>

          <button
            onClick={async (e) => {
              e.stopPropagation();
              await deleteNote();
            }}
            className="p-3 rounded-xl bg-slate-800 hover:bg-red-500 transition-all duration-300"
          >
            <FaTrash />
          </button>

        </div>

      </div>

    </motion.div>
  );
}

export default NoteCard;