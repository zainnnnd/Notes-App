import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function NoteEditor({ fetchNotes, selectedNote, setSelectedNote }) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function addNote() {

    if (!title || !content) {
      toast.error("Please fill all fields");
      return;
    }

    try {

      const user = auth.currentUser;

      if (!user) {
        toast.error("Please login first");
        return;
      }

      if (selectedNote) {

        await updateDoc(
          doc(db, "notes", selectedNote.id),
          {
            title,
            content,
          }
        );

        toast.success("Note Updated Successfully 🎉");
        setSelectedNote(null);

      } else {

        await addDoc(collection(db, "notes"), {
          title,
          content,
          userId: user.uid,
          createdAt: new Date(),
          favorite: false,
          pinned: false,
          deleted: false,
        });

        toast.success("Note Saved Successfully 🎉");
      }

      await fetchNotes();

      setTitle("");
      setContent("");

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {

    if (selectedNote) {

      setTitle(selectedNote.title);
      setContent(selectedNote.content);

    } else {

      setTitle("");
      setContent("");

    }

  }, [selectedNote]);

  return (

    <motion.div

      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}

      className="w-full h-full bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-slate-700 p-7 shadow-xl"

    >

      <h2 className="text-3xl font-bold text-cyan-400 mb-6">

        {selectedNote ? "✏️ Edit Note" : "📝 Create Note"}

      </h2>

      <input

        type="text"
        placeholder="Enter title..."

        value={title}

        onChange={(e) => setTitle(e.target.value)}

        className="w-full p-4 rounded-2xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 transition text-white mb-5"

      />

      <textarea

        placeholder="Write your note here..."

        value={content}

        onChange={(e) => setContent(e.target.value)}

        className="w-full h-80 p-5 rounded-2xl bg-slate-800 border border-slate-700 outline-none resize-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 transition text-white"

      />

      <div className="flex gap-4 mt-6">

        <button

          onClick={addNote}

          className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:scale-105 hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 font-bold text-lg"

        >

          {selectedNote ? "Update Note" : "Save Note"}

        </button>

        {selectedNote && (

          <button

            onClick={() => {

              setSelectedNote(null);

              setTitle("");

              setContent("");

            }}

            className="px-6 rounded-2xl bg-slate-700 hover:bg-red-500 transition-all duration-300"

          >

            Cancel

          </button>

        )}

      </div>

    </motion.div>

  );
}

export default NoteEditor;