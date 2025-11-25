"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // yahan apna auth logic (API call ya state) lagao
        // agar success
        router.push("/admin/dashboard"); // redirect after login
    };

    return (
        <div className="flex min-h-screen">

            {/* Left Image Panel */}
            <div className="w-1/2 relative">
                <Image
                    src=''
                    alt="POS login"
                    fill
                    className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-sm p-4 rounded-md max-w-xs">
                    <h2 className="font-semibold text-gray-800">Secure Access to Your POS System</h2>
                    <p className="text-gray-700 text-sm">Your branch sales, fiscal receipts, and reports just a login away.</p>
                </div>
            </div>

            {/* Right Login Form */}
            <div className="w-1/2 flex flex-col justify-center items-center bg-gray-900 text-white p-12">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-2">enigma POS</h1>
                    <p className="mb-6 text-gray-300">Welcome! Please enter your details.</p>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="flex justify-between items-center text-sm text-gray-400">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4 rounded-sm" /> Remember for 30 days
                            </label>
                            <button type="button" className="hover:underline">Forgot password</button>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-md mt-4 transition-all"
                        >
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
}
