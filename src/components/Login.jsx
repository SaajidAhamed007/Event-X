import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup,setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { auth, provider,db } from "../utils/firebase";
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthStore } from '../stores/useAuthStore';

const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [rememberMe,setRememberMe] = useState(true)

    const { setUser } = useAuthStore();


    const loginWithEmail = async (e) => {
        e.preventDefault();
        try {
            await setPersistence(
                auth,
                rememberMe?browserLocalPersistence:browserSessionPersistence
            )
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;

            const userRef = doc(db,'users',user.uid);
            const snapShot = await getDoc(userRef);


            if(!snapShot.exists()){
                let role = window.prompt("Enter the role(User/Organizer)","user");

                if(role.toLowerCase() != "organizer" && role.toLowerCase()){
                    role = "user";
                };

                const userData = {
                    uid: user.uid,
                    name: user.displayName || "Guest",
                    email: user.email,
                    role,
                    createdAt: new Date(),
                };

                console.log(user)

                await setDoc(userRef,userData);
                setUser(userData);

            } else {
                const userData = snapShot.data()
                setUser(userData);
            }


            console.log("Email login user:", result.user);
        } catch (error) {
            console.error("Email login failed:", error.message);
        }
    };

    const loginWithGoogle = async (e) => {
        e.preventDefault()
        try {
            const result = await signInWithPopup(auth,provider );
            const user = result.user;

            const userRef = doc(db, "users", user.uid);
            const snapShot = await getDoc(userRef);

            if(!snapShot.exists()){

                let role = window.prompt("Enter your role (organizer/user):", "user");

                if (role.toLowerCase() !== "organizer" && role.toLowerCase() !== "user") {
                    role = "user";
                }

                const userData = {
                    uid: user.uid,
                    name: user.displayName || "Guest",
                    email: user.email,
                    role,
                    createdAt: new Date(),
                };

                await setDoc(userRef,userData)
                setUser(userData);

            } else {
                const userData = snapShot.data();
                setUser(userData);
            }

            console.log(user);
        } catch (error) {
            console.error(error.code,error.message);
        }
    };

  return (
    <div>
        <div
        className="min-h-screen flex flex-col items-center justify-around bg-white px-4"
        style={{ fontFamily: 'Plus Jakarta Sans, Noto Sans, sans-serif' }}
        >
        <div>
            <h2 className="text-2xl font-bold text-center text-gray-900">Campus Connect</h2>
        </div>
        <form onSubmit={loginWithEmail} className="w-full max-w-md p-6 bg-white shadow-md rounded-xl space-y-6">
            {/* Email */}
            <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input
                type="email"
                value={email}
                id="email"
                placeholder="Enter your email"
                className="w-full h-12 px-4 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e)=>{setEmail(e.target.value)}}
            />
            </div>

            {/* Password */}
            <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input
                type="password"
                value={password}
                id="password"
                placeholder="Enter your password"
                className="w-full h-12 px-4 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e)=>{setPassword(e.target.value)}}
            />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={rememberMe} onChange={(e) => {setRememberMe(e.target.checked)}} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                Remember me
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>

            {/* Login Button */}
            <button type='submit' className="w-full h-12 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition duration-200">
            Login
            </button>

            {/* Google Button */}
            <button onClick={loginWithGoogle} className="w-full h-12 bg-gray-100 text-gray-900 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-200 transition duration-200">
                Continue with Google
            </button>

            {/* Footer */}
            <p className="text-sm text-center text-gray-600">
            Don’t have an account? <a href="#" className="text-blue-600 hover:underline">Create an account</a>
            </p>
        </form>
        </div>
    </div>
  );
};

export default Login;

