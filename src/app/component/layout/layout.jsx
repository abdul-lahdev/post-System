'use client'
import { PostProvider } from "@/context/HotelContext";
import LeftBar from "./left-bar";
import Header from "./header";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Layout({ children }) {

    const router = useRouter();
    const pathname = usePathname();
    const isLoggedIn = false; // replace with real auth check

    console.log('pathname', pathname)

    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/auth"); // redirect to login if not authenticated
        }
    }, [isLoggedIn, router]);
    return (


        <PostProvider>

            <div className={` ${pathname === '/auth' ? 'hidden' : 'fixed left-0 top-0 mt-4 ms-4 h-[96%] bg-[#181A1D] w-[97px] rounded-[20px] text-white p-3'}`}>
                <LeftBar />
            </div>
            <div className={` ${pathname === '/auth' ? '' : 'border border-[#373737] rounded-2xl mt-4 ml-32 mr-4 mb-4 pb-4'}`}>
                <div className={`${pathname === '/auth' ? 'hidden' : ''}`}>
                    <Header />
                </div>
                {children}
            </div>
        </PostProvider>

    )
}