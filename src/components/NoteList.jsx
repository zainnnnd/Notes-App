import NoteCard from "./NoteCard";
import Empty from "./Empty";
import { motion } from "framer-motion";

function NoteList({ notes, setSelectedNote, fetchNotes, search }) {

    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.content.toLowerCase().includes(search.toLowerCase())
    );

    if (filteredNotes.length === 0) {
        return <Empty />;
    }

    return (

        <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            transition={{ duration: 0.35 }}

            className="space-y-5 pb-8"

        >

            {filteredNotes.map((note, index) => (

                <motion.div

                    key={note.id}

                    initial={{
                        opacity: 0,
                        y: 20
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}

                    transition={{
                        delay: index * 0.05
                    }}

                >

                    <NoteCard

                        note={note}

                        setSelectedNote={setSelectedNote}

                        fetchNotes={fetchNotes}

                    />

                </motion.div>

            ))}

        </motion.div>

    );
}

export default NoteList;