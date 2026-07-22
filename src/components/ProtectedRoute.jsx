import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

function ProtectedRoute({ children }) {

    const [user, setUser] = useState(undefined);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();

    }, []);

    if (user === undefined) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-slate-950 text-white text-2xl">
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;