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
        <div className="grid lg:grid-cols-[55%_45%] md:gird-col-1 min-h-screen">

            {/* Left Image Panel */}
            <div className=" relative">
                <Image
                    src='/images/login/loginImage.webp'
                    alt="POS login"
                    fill
                    className="object-cover"
                />
                <div className="absolute bottom-4 left-0 bg-white/70 backdrop-blur-sm p-5 rounded-tr-xl rounded-br-xl ">
                    <h2 className="text-[#404145] font-bold text-[28px]">Secure Access to Your POS System</h2>
                    <p className="text-[24px] text-[#404145] font-medium">Your branch sales, fiscal receipts, and reports just a login away.</p>
                </div>
            </div>

            {/* Right Login Form */}
            <div className="  bg-[#0E0F11] text-white p-12">
                <div className="w-full flex flex-col justify-between h-full ">
                    <div className="flex justify-center">
                        <Image
                            src='/images/login/enigmaPos.svg'
                            alt="POS login"
                            width={300}
                            height={300}
                            className="object-cover"
                        />
                    </div>

                    <form className="space-y-4 flex justify-center" onSubmit={handleLogin}>

                        <div className="xl:w-[80%] md:w-full">


                            <div className="mb-7">
                                <h1 className="text-white font-semibold text-[36px]">
                                    Log in
                                </h1>
                                <p className="text-white font-normal text-[20px]">
                                    Welcome! Please enter your details.
                                </p>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="email" className="block text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    placeholder="Enter your email"
                                    className="w-full shadow-[0_1px_2px_0_#1018280D] rounded-xl h-11 border border-(--grey1) px-3 bg-[#212224]"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm mb-1">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    placeholder="Enter password"
                                    className="w-full shadow-[0_1px_2px_0_#1018280D] rounded-xl h-11 border border-(--grey1) px-3 bg-[#212224]"
                                />
                            </div>

                            <div className="flex justify-between items-center text-sm text-gray-400 mt-8">
                                <label className="flex items-center gap-2 text-white text-[14px] font-normal">
                                    <input type="checkbox" className="w-4 h-4 rounded-sm" /> Remember for 30 days
                                </label>
                                <button type="button" className="text-white font-medium text-[14px] cursor-pointer hover:underline">Forgot password</button>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-700 hover:bg-gray-600 py-3 rounded-md transition-all mt-8 btn-primary shadow-[0_2px_8px_0_#FFFFFF66_inset]"
                            >
                                Sign in
                            </button>
                        </div>

                    </form>
                    <div></div>
                </div>
            </div>
        </div>

    );
}
