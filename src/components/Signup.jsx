import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider,db } from "../utils/firebase";
import { getDoc,setDoc,doc } from 'firebase/firestore';
import { useAuthStore } from '../stores/useAuthStore';

const Signup = () => {

    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        role:"",
        confirmPassword:""
    })
    const [rememberMe,setRememberMe] = useState(false)

    const { setUser } = useAuthStore();

    const registerWithEmail = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const result = await createUserWithEmailAndPassword(auth,formData.email,formData.password);
            const user = result.user;

            const userData = {
                uid: user.uid,
                name: user.displayName || "Guest",
                email: user.email,
                role:formData.role,
                createdAt
            };

            await setDoc(doc(db, "users", user.uid),userData);

            setUser(userData)
            console.log("User registered successfully", user);
        } catch (error) {
            console.error("User registration failed:", error.message);
        }
    };


    const loginWithGoogle = async (e) => {
        e.preventDefault()
        try {
            const result = await signInWithPopup(auth,provider );
            const user = result.user;

            const userRef = doc(db, "users", user.uid);
            const snapShot = await getDoc(userRef);

            let userData;

            if(!snapShot.exists()){

                let role = window.prompt("Enter your role (organizer/user):", "user");

                if (role !== "organizer" && role !== "user") {
                    role = "user";
                }

                userData = {
                    uid: user.uid,
                    name: user.displayName || "Guest",
                    email: user.email,
                    role:formData.role ,
                    createdAt
                };

                await setDoc(userRef,userData)

                setUser(userData)

            } else {
                userData = snapShot.data();
            }
            console.log(user);
            setUser(userData);
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
        <form onSubmit={registerWithEmail} className="w-full max-w-md p-6 bg-white shadow-md rounded-xl space-y-6">

            {/* Name */}

            <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">Name</label>
            <input
                type="text"
                value={formData.name}
                placeholder="Enter your name"
                className="w-full h-12 px-4 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e)=>{setFormData({...formData,name:e.target.value})}}
            />
            </div>

            {/* Role */}

            <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">Role</label>
                <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-sm text-gray-800">
                        <input
                            type="radio"
                            name="role"
                            value="organizer"
                            checked={formData.role === "organizer"}
                            onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        Organizer
                    </label>

                    <label className="flex items-center gap-2 text-sm text-gray-800">
                        <input
                            type="radio"
                            name="role"
                            value="user"
                            checked={formData.role === "user"}
                            onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                            }
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        User
                    </label>
                </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input
                type="email"
                value={formData.email}
                id="email"
                placeholder="Enter your email"
                className="w-full h-12 px-4 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
            />
            </div>

            {/* Password */}
            <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input
                type="password"
                value={formData.password}
                id="password"
                placeholder="Enter your password"
                className="w-full h-12 px-4 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
            />
            </div>

            <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">Confirm-Password</label>
            <input
                type="password"
                value={formData.confirmPassword}
                placeholder="Enter your email"
                className="w-full h-12 px-4 rounded-xl border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e)=>{setFormData({...formData,confirmPassword:e.target.value})}}
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
            Sign up
            </button>

            {/* Google Button */}
            <button onClick={loginWithGoogle} className="w-full h-12 bg-gray-100 text-gray-900 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-200 transition duration-200">
                Continue with Google
            </button>

            {/* Footer */}
            <p className="text-sm text-center text-gray-600">
            Already have an account? <a href="#" className="text-blue-600 hover:underline">Log in to existing account</a>
            </p>
        </form>
        </div>
    </div>
  );
};

export default Signup;