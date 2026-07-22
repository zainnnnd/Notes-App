import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    async function registerUser() {

        if (!name || !email || !password || !confirmPassword) {
            // alert("Please fill all fields");
            toast.error("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            // alert("Passwords do not match");
            toast.error("Password do not match")
            return;
        }

        try {

            const userCredential =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                createdAt: new Date()
            });

            // alert("Account Created Successfully!");
            toast.success("Account Created Successfully!")

            navigate("/login");

        } catch (error) {

            // alert(error.message);
            toast.error(error.message);

        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-slate-950 text-white">

            <div className="bg-slate-900 p-8 rounded-2xl w-[400px] flex flex-col gap-4">

                <h1 className="text-3xl font-bold text-center">
                    Create Account
                </h1>

                <input
                    type="text"
                    placeholder="Enter Name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-3 rounded-lg bg-slate-800 outline-none"
                />

                <input
                    type="email"
                    placeholder="Enter Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 rounded-lg bg-slate-800 outline-none"
                />

                <input
                    type="password"
                    placeholder="Enter Password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 rounded-lg bg-slate-800 outline-none"
                />

                <input
                    type="password"
                    placeholder="Confirm Password..."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-3 rounded-lg bg-slate-800 outline-none"
                />

                <button
                    onClick={registerUser}
                    className="bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg"
                >
                    Create Account
                </button>

                <p className="text-center">
                    Already have an account?
                    <Link
                        to="/login"
                        className="text-cyan-400 ml-2"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;