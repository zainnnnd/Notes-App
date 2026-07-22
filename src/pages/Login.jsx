import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login(){

    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const navigate=useNavigate();

    async function loginUser(){
        if(!email || !password){
            // alert("Please fill the fields!");
            toast.error("Please fill the fields!")
            return;
        }

        try{
            const userCredential=await signInWithEmailAndPassword(
            auth, 
            email, 
            password
        );

        // alert("Logged in Successfully!");
        toast.success("Account Created Successfully🎉")
        navigate("/dashboard");
        }

        catch(error){
            // alert(error.message);
            toast.error("Invalid Email or Password "+error.message);
        }
    }

    return(
        <div className="bg-slate-950 min-h-screen items-center flex justify-center text-white">
            <div className="bg-slate-900 p-8 rounded-2xl w-[400px] flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-center">
                    Login
                </h1>

                <input type="text" placeholder="Enter email..." value={email} onChange={(e)=>setEmail(e.target.value)}
                className="p-3 bg-slate-800 rounded-lg outline-none" />

                <input type="password" placeholder="Enter password..." value={password} onChange={(e)=>setPassword(e.target.value)}
                className="p-3 bg-slate-800 rounded-lg outline-none" />

                <button className="bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg" onClick={loginUser}>
                    Login
                </button>

                <p className="text-center">
                    Don't have an account?   
                     <Link to="/register" className="ml-2 text-cyan-400">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Login;