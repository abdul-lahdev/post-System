'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function BackButtonComponent() {
    const router = useRouter();

    return (
        <Link href="#" onClick={(e) => {
            e.preventDefault();
            router.back();
        }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2_9508)">
                    <path d="M23.115 24.885L16.245 18L23.115 11.115L21 9L12 18L21 27L23.115 24.885Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_2_9508">
                        <rect width="36" height="36" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </Link>
    );
}

// React.memo se wrap kar diya
const BackButton = React.memo(BackButtonComponent);

export default BackButton;
