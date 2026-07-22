import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import NoteList from "../components/NoteList";
import NoteEditor from "../components/NoteEditor";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { motion } from "framer-motion";

function Dashboard() {

    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    async function fetchNotes() {

        const user = auth.currentUser;

        if (!user) {
            setLoading(false);
            return;
        }

        try {

            setLoading(true);

            const q = query(
                collection(db, "notes"),
                where("userId", "==", user.uid)
            );

            const snapshot = await getDocs(q);

            const notesArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            setNotes(notesArray);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    // 📌 Pinned notes first
    const sortedNotes = [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned));

    if (loading) {

        return (

            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex justify-center items-center">

                <motion.div
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear"
                    }}
                    className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full"
                />

            </div>

        );

    }

    return (

        <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            transition={{ duration: 0.4 }}

            className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white"

        >

            <Header

                search={search}

                setSearch={setSearch}

            />

            <div className="grid grid-cols-12 gap-6 p-6 h-[calc(100vh-80px)]">

                {/* Sidebar */}

                <motion.div

                    initial={{ x: -40, opacity: 0 }}

                    animate={{ x: 0, opacity: 1 }}

                    transition={{ duration: 0.4 }}

                    className="col-span-3"

                >

                    <Sidebar />

                </motion.div>

                {/* Notes */}

                <motion.div

                    initial={{ y: 20, opacity: 0 }}

                    animate={{ y: 0, opacity: 1 }}

                    transition={{ delay: 0.15 }}

                    className="col-span-4 overflow-y-auto rounded-3xl"

                >

                    <NoteList

                        notes={sortedNotes}

                        search={search}

                        setSelectedNote={setSelectedNote}

                        fetchNotes={fetchNotes}

                    />

                </motion.div>

                {/* Editor */}

                <motion.div

                    initial={{ x: 40, opacity: 0 }}

                    animate={{ x: 0, opacity: 1 }}

                    transition={{ delay: 0.25 }}

                    className="col-span-5"

                >

                    <NoteEditor

                        fetchNotes={fetchNotes}

                        selectedNote={selectedNote}

                        setSelectedNote={setSelectedNote}

                    />

                </motion.div>

            </div>

        </motion.div>

    );

}

export default Dashboard;