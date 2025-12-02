"use client";
import * as React from "react"
import { useLayoutEffect, useState } from "react";
import Image from 'next/image'
import { useHotels } from "@/context/HotelContext";

import { ChevronDownIcon } from "lucide-react"
import toast, { Toaster } from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    NativeSelect,
    NativeSelectOptGroup,
    NativeSelectOption,
} from "@/components/ui/native-select"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Select from 'react-select';

import { Separator } from "@/components/ui/separator"
export default function Page() {
    // Step controller: categories → subcategories → products
    const options = [
        { value: 'Provisional ticket', label: 'Provisional ticket' },
        { value: 'Payment', label: 'Payment' },
    ]

    const { hotel, hotelData, step, setStep } = useHotels();

    // Selected values
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [cart, setCart] = useState({});
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);

    const [date1, setDate1] = useState(undefined);
    const [date2, setDate2] = useState(undefined);
    const [date3, setDate3] = useState(undefined);


    console.log('cart', cart)
    const handleAdd = (item) => {
        setCart((prev) => {
            const existing = prev[item.id];

            return {
                ...prev,
                [item.id]: existing
                    ? { ...existing, quantity: existing.quantity + 1 }
                    : { ...item, quantity: 1 }
            };
        });
    };

    const handleRemove = (item) => {
        setCart((prev) => {
            const existing = prev[item.id];
            if (!existing) return prev;

            if (existing.quantity <= 1) {
                const updated = { ...prev };
                delete updated[item.id];
                return updated;
            }

            return {
                ...prev,
                [item.id]: { ...existing, quantity: existing.quantity - 1 }
            };
        });
    };


    const removeItemFromCart = (item, setCart) => {
        setCart((prev) => {
            const existing = prev[item.id];
            if (!existing) return prev;

            if (existing.quantity <= 1) {
                const updated = { ...prev };
                delete updated[item.id];
                return updated;
            }

            return {
                ...prev,
                [item.id]: { ...existing, quantity: existing.quantity - 1 }
            };
        });
    };

    // const quantity = cart[item.id]?.quantity || 0;


    // useLayoutEffect(() => {
    //     setStep("categories");
    // }, [hotel]);



    // Dummy data (replace with API data)
    const categories = [
        { id: 1, value: 'Accommodation', name: "Accommodation", icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M44.496 21.168L50.904 27.576C52.344 28.944 52.344 31.248 50.904 32.616L34.2 49.248V34.056V26.352L39.384 21.096C40.752 19.728 43.128 19.728 44.496 21.168Z" fill="white" /> <path d="M27 14.3999H18C15.984 14.3999 14.4 15.9839 14.4 17.9999V49.5359C14.4 53.9999 18 57.5999 22.464 57.5999C26.928 57.5999 30.528 53.9999 30.528 49.5359V17.9999C30.6 15.9839 28.944 14.3999 27 14.3999ZM22.464 53.1359C20.448 53.1359 18.864 51.5519 18.864 49.5359C18.864 47.5199 20.448 45.9359 22.464 45.9359C24.48 45.9359 26.064 47.5199 26.064 49.5359C26.064 51.5519 24.48 53.1359 22.464 53.1359Z" fill="white" /> <path d="M54 41.3999H47.664L43.344 45.7199H53.28L53.208 53.2799H35.856L31.536 57.5999H54C56.016 57.5999 57.6 56.0159 57.6 53.9999V44.9999C57.6 43.0559 56.016 41.3999 54 41.3999Z" fill="white" /> </svg> },
        { id: 2, value: 'Activity', name: "Activity", icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M44.496 21.168L50.904 27.576C52.344 28.944 52.344 31.248 50.904 32.616L34.2 49.248V34.056V26.352L39.384 21.096C40.752 19.728 43.128 19.728 44.496 21.168Z" fill="white" /> <path d="M27 14.3999H18C15.984 14.3999 14.4 15.9839 14.4 17.9999V49.5359C14.4 53.9999 18 57.5999 22.464 57.5999C26.928 57.5999 30.528 53.9999 30.528 49.5359V17.9999C30.6 15.9839 28.944 14.3999 27 14.3999ZM22.464 53.1359C20.448 53.1359 18.864 51.5519 18.864 49.5359C18.864 47.5199 20.448 45.9359 22.464 45.9359C24.48 45.9359 26.064 47.5199 26.064 49.5359C26.064 51.5519 24.48 53.1359 22.464 53.1359Z" fill="white" /> <path d="M54 41.3999H47.664L43.344 45.7199H53.28L53.208 53.2799H35.856L31.536 57.5999H54C56.016 57.5999 57.6 56.0159 57.6 53.9999V44.9999C57.6 43.0559 56.016 41.3999 54 41.3999Z" fill="white" /> </svg> },
        { id: 3, value: 'SwimmingBraai', name: "Swimming & Braai", icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M44.496 21.168L50.904 27.576C52.344 28.944 52.344 31.248 50.904 32.616L34.2 49.248V34.056V26.352L39.384 21.096C40.752 19.728 43.128 19.728 44.496 21.168Z" fill="white" /> <path d="M27 14.3999H18C15.984 14.3999 14.4 15.9839 14.4 17.9999V49.5359C14.4 53.9999 18 57.5999 22.464 57.5999C26.928 57.5999 30.528 53.9999 30.528 49.5359V17.9999C30.6 15.9839 28.944 14.3999 27 14.3999ZM22.464 53.1359C20.448 53.1359 18.864 51.5519 18.864 49.5359C18.864 47.5199 20.448 45.9359 22.464 45.9359C24.48 45.9359 26.064 47.5199 26.064 49.5359C26.064 51.5519 24.48 53.1359 22.464 53.1359Z" fill="white" /> <path d="M54 41.3999H47.664L43.344 45.7199H53.28L53.208 53.2799H35.856L31.536 57.5999H54C56.016 57.5999 57.6 56.0159 57.6 53.9999V44.9999C57.6 43.0559 56.016 41.3999 54 41.3999Z" fill="white" /> </svg> },
        { id: 4, value: 'FB', name: "F&B", icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M44.496 21.168L50.904 27.576C52.344 28.944 52.344 31.248 50.904 32.616L34.2 49.248V34.056V26.352L39.384 21.096C40.752 19.728 43.128 19.728 44.496 21.168Z" fill="white" /> <path d="M27 14.3999H18C15.984 14.3999 14.4 15.9839 14.4 17.9999V49.5359C14.4 53.9999 18 57.5999 22.464 57.5999C26.928 57.5999 30.528 53.9999 30.528 49.5359V17.9999C30.6 15.9839 28.944 14.3999 27 14.3999ZM22.464 53.1359C20.448 53.1359 18.864 51.5519 18.864 49.5359C18.864 47.5199 20.448 45.9359 22.464 45.9359C24.48 45.9359 26.064 47.5199 26.064 49.5359C26.064 51.5519 24.48 53.1359 22.464 53.1359Z" fill="white" /> <path d="M54 41.3999H47.664L43.344 45.7199H53.28L53.208 53.2799H35.856L31.536 57.5999H54C56.016 57.5999 57.6 56.0159 57.6 53.9999V44.9999C57.6 43.0559 56.016 41.3999 54 41.3999Z" fill="white" /> </svg> },
        { id: 5, value: 'Retail', name: "Retail", icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M44.496 21.168L50.904 27.576C52.344 28.944 52.344 31.248 50.904 32.616L34.2 49.248V34.056V26.352L39.384 21.096C40.752 19.728 43.128 19.728 44.496 21.168Z" fill="white" /> <path d="M27 14.3999H18C15.984 14.3999 14.4 15.9839 14.4 17.9999V49.5359C14.4 53.9999 18 57.5999 22.464 57.5999C26.928 57.5999 30.528 53.9999 30.528 49.5359V17.9999C30.6 15.9839 28.944 14.3999 27 14.3999ZM22.464 53.1359C20.448 53.1359 18.864 51.5519 18.864 49.5359C18.864 47.5199 20.448 45.9359 22.464 45.9359C24.48 45.9359 26.064 47.5199 26.064 49.5359C26.064 51.5519 24.48 53.1359 22.464 53.1359Z" fill="white" /> <path d="M54 41.3999H47.664L43.344 45.7199H53.28L53.208 53.2799H35.856L31.536 57.5999H54C56.016 57.5999 57.6 56.0159 57.6 53.9999V44.9999C57.6 43.0559 56.016 41.3999 54 41.3999Z" fill="white" /> </svg> },
        { id: 6, value: 'Gym', name: "Gym", icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M44.496 21.168L50.904 27.576C52.344 28.944 52.344 31.248 50.904 32.616L34.2 49.248V34.056V26.352L39.384 21.096C40.752 19.728 43.128 19.728 44.496 21.168Z" fill="white" /> <path d="M27 14.3999H18C15.984 14.3999 14.4 15.9839 14.4 17.9999V49.5359C14.4 53.9999 18 57.5999 22.464 57.5999C26.928 57.5999 30.528 53.9999 30.528 49.5359V17.9999C30.6 15.9839 28.944 14.3999 27 14.3999ZM22.464 53.1359C20.448 53.1359 18.864 51.5519 18.864 49.5359C18.864 47.5199 20.448 45.9359 22.464 45.9359C24.48 45.9359 26.064 47.5199 26.064 49.5359C26.064 51.5519 24.48 53.1359 22.464 53.1359Z" fill="white" /> <path d="M54 41.3999H47.664L43.344 45.7199H53.28L53.208 53.2799H35.856L31.536 57.5999H54C56.016 57.5999 57.6 56.0159 57.6 53.9999V44.9999C57.6 43.0559 56.016 41.3999 54 41.3999Z" fill="white" /> </svg> },
        { id: 7, value: 'LongTermRental', name: "Long Term Rental", icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M44.496 21.168L50.904 27.576C52.344 28.944 52.344 31.248 50.904 32.616L34.2 49.248V34.056V26.352L39.384 21.096C40.752 19.728 43.128 19.728 44.496 21.168Z" fill="white" /> <path d="M27 14.3999H18C15.984 14.3999 14.4 15.9839 14.4 17.9999V49.5359C14.4 53.9999 18 57.5999 22.464 57.5999C26.928 57.5999 30.528 53.9999 30.528 49.5359V17.9999C30.6 15.9839 28.944 14.3999 27 14.3999ZM22.464 53.1359C20.448 53.1359 18.864 51.5519 18.864 49.5359C18.864 47.5199 20.448 45.9359 22.464 45.9359C24.48 45.9359 26.064 47.5199 26.064 49.5359C26.064 51.5519 24.48 53.1359 22.464 53.1359Z" fill="white" /> <path d="M54 41.3999H47.664L43.344 45.7199H53.28L53.208 53.2799H35.856L31.536 57.5999H54C56.016 57.5999 57.6 56.0159 57.6 53.9999V44.9999C57.6 43.0559 56.016 41.3999 54 41.3999Z" fill="white" /> </svg> },
        { id: 8, value: 'Utilities', name: "Utilities", icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M44.496 21.168L50.904 27.576C52.344 28.944 52.344 31.248 50.904 32.616L34.2 49.248V34.056V26.352L39.384 21.096C40.752 19.728 43.128 19.728 44.496 21.168Z" fill="white" /> <path d="M27 14.3999H18C15.984 14.3999 14.4 15.9839 14.4 17.9999V49.5359C14.4 53.9999 18 57.5999 22.464 57.5999C26.928 57.5999 30.528 53.9999 30.528 49.5359V17.9999C30.6 15.9839 28.944 14.3999 27 14.3999ZM22.464 53.1359C20.448 53.1359 18.864 51.5519 18.864 49.5359C18.864 47.5199 20.448 45.9359 22.464 45.9359C24.48 45.9359 26.064 47.5199 26.064 49.5359C26.064 51.5519 24.48 53.1359 22.464 53.1359Z" fill="white" /> <path d="M54 41.3999H47.664L43.344 45.7199H53.28L53.208 53.2799H35.856L31.536 57.5999H54C56.016 57.5999 57.6 56.0159 57.6 53.9999V44.9999C57.6 43.0559 56.016 41.3999 54 41.3999Z" fill="white" /> </svg> },
        { id: 9, value: 'Fine', name: "Fine", icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M44.496 21.168L50.904 27.576C52.344 28.944 52.344 31.248 50.904 32.616L34.2 49.248V34.056V26.352L39.384 21.096C40.752 19.728 43.128 19.728 44.496 21.168Z" fill="white" /> <path d="M27 14.3999H18C15.984 14.3999 14.4 15.9839 14.4 17.9999V49.5359C14.4 53.9999 18 57.5999 22.464 57.5999C26.928 57.5999 30.528 53.9999 30.528 49.5359V17.9999C30.6 15.9839 28.944 14.3999 27 14.3999ZM22.464 53.1359C20.448 53.1359 18.864 51.5519 18.864 49.5359C18.864 47.5199 20.448 45.9359 22.464 45.9359C24.48 45.9359 26.064 47.5199 26.064 49.5359C26.064 51.5519 24.48 53.1359 22.464 53.1359Z" fill="white" /> <path d="M54 41.3999H47.664L43.344 45.7199H53.28L53.208 53.2799H35.856L31.536 57.5999H54C56.016 57.5999 57.6 56.0159 57.6 53.9999V44.9999C57.6 43.0559 56.016 41.3999 54 41.3999Z" fill="white" /> </svg> },
    ];

    const subCategories = {
        Accommodation: [
            { id: 1, name: "Chalets", value: 'Chalets', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 2, name: "Safari Tent", value: 'SafariTent', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 3, name: "Lodge", value: 'Lodge', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 4, name: "Camping", value: 'Camping', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 5, name: "Luxury Tent", value: 'LuxuryTent', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 6, name: "Foreign Infant Tram", value: 'ForeignInfantTram', hotel: 'Bamba Tram', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 7, name: "Local Adult Tram", value: 'LocalAdultTram', hotel: 'Bamba Tram', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 8, name: "Local Child Tram", value: 'LocalChildTram', hotel: 'Bamba Tram', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 9, name: "Local Infant Tram", value: 'LocalInfantTram', hotel: 'Bamba Tram', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 10, name: "Single Room", value: 'SingleRoom', hotel: 'New Hotel', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 11, name: "Double Room", value: 'DoubleRoom', hotel: 'New Hotel', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
        ],
        Activity: [
            { id: 1, name: "Foreign Activity", value: 'ForeignActivity', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 2, name: "Local Activity", value: 'LocalActivity', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 3, name: "Foreign Adult Tram", value: 'ForeignAdultTram', hotel: 'Bamba Tram', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 4, name: "Foreign Child Tram", value: 'ForeignChildTram', hotel: 'Bamba Tram', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 5, name: "Foreign Activity", value: 'ForeignActivity', hotel: 'New Hotel', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 6, name: "Local Activity", value: 'LocalActivity', hotel: 'New Hotel', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
        ],
        SwimmingBraai: [
            { id: 1, name: "Swimming & Brai", value: 'Swimming&Brai', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
        ],
        FB: [
            { id: 1, name: "F&B", value: 'F&B', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 2, name: "Breakfast", value: 'Breakfast', hotel: 'New Hotel', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 3, name: "Lunch", value: 'Lunch', hotel: 'New Hotel', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 4, name: "Dinner", value: 'Dinner', hotel: 'New Hotel', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 5, name: "Beer", value: 'Beer', hotel: 'New Hotel', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 6, name: "Wine", value: 'Wine', hotel: 'New Hotel', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 7, name: "Cider", value: 'Cider', hotel: 'New Hotel', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 8, name: "Hot Beverage", value: 'HotBeverage', hotel: 'New Hotel', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
        ],
        Retail: [
            { id: 1, name: "Retail", value: 'Retail', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
        ],
        Gym: [
            { id: 1, name: "Gym", value: "Gym", hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
        ],
        LongTermRental: [
            { id: 1, name: "Long Term Rental", value: 'LongTermRental', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
        ],
        Utilities: [
            { id: 1, name: "Electricity", value: 'Electricity', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
            { id: 2, name: "Water", value: 'Water', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
        ],
        Fine: [
            { id: 1, name: "Fine", value: 'Fine', hotel: 'Rest Camp', icon: <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_6410)"> <path d="M36 6L19.5 33H52.5L36 6ZM36 17.52L41.79 27H30.18L36 17.52ZM52.5 39C45.03 39 39 45.03 39 52.5C39 59.97 45.03 66 52.5 66C59.97 66 66 59.97 66 52.5C66 45.03 59.97 39 52.5 39ZM52.5 60C48.36 60 45 56.64 45 52.5C45 48.36 48.36 45 52.5 45C56.64 45 60 48.36 60 52.5C60 56.64 56.64 60 52.5 60ZM9 64.5H33V40.5H9V64.5ZM15 46.5H27V58.5H15V46.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_6410"> <rect width="72" height="72" fill="white" /> </clipPath> </defs> </svg> },
        ],
    };

    const products = {
        Chalets: [
            { id: 1, title: "Bed nights A", cat: 'Chalets', price: 229 },
            { id: 2, title: "Bed nights B", cat: 'Chalets', price: 399 },
            { id: 3, title: "Bed nights C", cat: 'Chalets', price: 499 },
            { id: 4, title: "Bed nights D", cat: 'Chalets', price: 599 },
            { id: 5, title: "Bed nights D", cat: 'Chalets', price: 599 },
        ],
        Lodge: [
            { id: 1, title: "Bed nights A", cat: 'Lodge', price: 229 },
            { id: 2, title: "Bed nights B", cat: 'Lodge', price: 399 },
            { id: 3, title: "Bed nights C", cat: 'Lodge', price: 499 },
            { id: 4, title: "Bed nights D", cat: 'Lodge', price: 599 },
            { id: 5, title: "Bed nights D", cat: 'Lodge', price: 599 },
        ],
        Camping: [
            { id: 1, title: "Bed nights A", cat: 'Lodge', price: 229 },
            { id: 2, title: "Bed nights B", cat: 'Lodge', price: 399 },
            { id: 3, title: "Bed nights C", cat: 'Lodge', price: 499 },
            { id: 4, title: "Bed nights D", cat: 'Lodge', price: 599 },
            { id: 5, title: "Bed nights D", cat: 'Lodge', price: 599 },
        ],
        SafariTent: [
            { id: 1, title: "Bed nights A", cat: 'Lodge', price: 229 },
            { id: 2, title: "Bed nights B", cat: 'Lodge', price: 399 },
            { id: 3, title: "Bed nights C", cat: 'Lodge', price: 499 },
            { id: 4, title: "Bed nights D", cat: 'Lodge', price: 599 },
            { id: 5, title: "Bed nights D", cat: 'Lodge', price: 599 },
        ],
    };


    const currentHotel = hotelData.find((item) => item.name === hotel);


    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
        setStep("subcategories");
    };

    const handleSubCategoryClick = (sub) => {
        setSelectedSubCategory(sub);
        setStep("products");
    };

    const goBack = () => {
        if (step === "products") {
            setStep("subcategories");
            setSelectedSubCategory(null);
        }
        else if (step === "subcategories") {
            setStep("categories");
            setSelectedCategory(null);
        }
        else if (step === 'checkout') {
            setStep("products");
        }
    };
    // const notify = () => toast('Here is your toast.');
    const notify = () => toast.success('Form Submit successfully!');


    // Here
    const handlePriceChange = (itemId, newPrice) => {
        setCart(prevCart => ({
            ...prevCart,
            [itemId]: {
                ...prevCart[itemId],
                price: parseFloat(newPrice) / prevCart[itemId].quantity // update unit price if needed
            }
        }));
    };





    return (
        <div className="p-4 text-white">
            {/* --------------- CATEGORIES -------------- */}
            {step === "categories" && (
                <div>

                    <h2 className="text-white font-semibold text-[32px] uppercase">CATEGORIES</h2>
                    <div className="border border-(--grey1) p-5 rounded-[20px] mt-4">
                        <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4">

                            {
                                currentHotel &&
                                categories
                                    .filter(cat => currentHotel.categories.includes(cat.name)) // ← Filter first
                                    .map((cat) => (
                                        <div
                                            key={cat.id}
                                            onClick={() => handleCategoryClick(cat.value)}
                                            className="
          bg-(--dark1) min-h-[194px] flex flex-col justify-center items-center gap-3 
          border-l-8 rounded-[20px] p-3 mb-3 cursor-pointer
          hover:bg-(--dark3) hover:shadow-[inset_0_0_20px_0_#ffffffb2]
        "
                                        >
                                            {cat.icon}
                                            <h1 className="text-[28px] font-medium text-white">{cat.name}</h1>
                                        </div>
                                    ))
                            }


                        </div>
                    </div>
                </div>
            )
            }

            {/* --------------- SUB-CATEGORIES ---------- */}
            {
                step === "subcategories" && (



                    <div>
                        <div className="flex items-center gap-3">
                            <button onClick={goBack} className="cursor-pointer">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_2_9771)"> <path d="M24.5 12.8333H7.96833L12.145 8.645L10.5 7L3.5 14L10.5 21L12.145 19.355L7.96833 15.1667H24.5V12.8333Z" fill="white" /> </g> <defs> <clipPath id="clip0_2_9771"> <rect width="28" height="28" fill="white" /> </clipPath> </defs> </svg>
                            </button>
                            <h2 className="text-white text-[28px] font-semibold" >SUBCATEGORIES
                                {/* {selectedCategory} */}
                            </h2>
                        </div>

                        <div className="border border-(--grey1) p-5 rounded-[20px] mt-4">

                            <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4">

                                {subCategories[selectedCategory]?.map((sub) =>
                                    subCategories[selectedCategory].length > 0 && currentHotel.name === sub.hotel ? <div
                                        key={sub.id}
                                        onClick={() => handleSubCategoryClick(sub.value)}
                                        className="bg-(--dark1) min-h-[194px] flex flex-col justify-center items-center gap-3 border-l-8 border-white rounded-[20px] p-3 mb-3 cursor-pointer hover:bg-(--dark3) hover:shadow-[inset_0_0_20px_0_#ffffffb2] "
                                    >

                                        {sub.icon}
                                        <h1 className="text-[28px] font-medium text-white">{sub.name}</h1>

                                    </div> : null
                                )}
                            </div>
                        </div>


                    </div>

                )
            }

            {/* ---------------- PRODUCTS -------------- */}
            {
                step === "products" && (
                    <div>
                        <div className="flex items-center gap-3">
                            <button onClick={goBack} className="inline-block cursor-pointer">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_2_9771)"> <path d="M24.5 12.8333H7.96833L12.145 8.645L10.5 7L3.5 14L10.5 21L12.145 19.355L7.96833 15.1667H24.5V12.8333Z" fill="white" /> </g> <defs> <clipPath id="clip0_2_9771"> <rect width="28" height="28" fill="white" /> </clipPath> </defs> </svg>
                            </button>
                            <h2 className="text-white text-[28px] font-semibold">PRODUCTS
                                {/* {selectedSubCategory} */}
                            </h2>
                        </div>

                        <div className={`grid ${Object.keys(cart).length ? 'grid grid-cols-2 gap-3' : 'grid-cols-1'}`}>
                            <div className="border border-(--grey1) p-5 rounded-[20px] mt-4">

                                <div className={`grid gap-5 ${Object.keys(cart).length ? 'lg:grid-cols-2 md:grid-cols-1' : 'xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-1'}`}>
                                    {products[selectedSubCategory]?.map((item) => {
                                        const quantity = cart[item.id]?.quantity || 0;

                                        return (
                                            <div key={item.id}
                                                className="border border-(--grey1) p-3 rounded-[20px] bg-(--dark1)"
                                            >
                                                <Image
                                                    src="/images/order/item.webp"
                                                    width={500}
                                                    height={500}
                                                    alt="Picture of the author"
                                                    className="w-full h-[180px] object-cover rounded-2xl"
                                                />

                                                <h2 className="text-white text-center mt-2">{item.cat}</h2>
                                                <h3 className="text-white text-center mt-1">{item.title}</h3>
                                                <h1 className="text-white text-center text-[32px]">$ {item.price}</h1>

                                                <div className="bg-[#FFFFFF1A] w-[60%] h-11 rounded-2xl flex items-center justify-between px-3 mx-auto mt-4">
                                                    {/* Minus */}
                                                    <div
                                                        onClick={() => handleRemove(item)}
                                                        className="h-6 w-6 bg-white rounded-full text-black flex items-center justify-center text-[24px] cursor-pointer"
                                                    >
                                                        -
                                                    </div>

                                                    {/* Quantity */}
                                                    <div className="text-white text-[20px]">
                                                        {quantity}
                                                    </div>

                                                    {/* Plus */}
                                                    <div
                                                        onClick={() => handleAdd(item)}
                                                        className="h-6 w-6 bg-white rounded-full text-black flex items-center justify-center text-[24px] cursor-pointer"
                                                    >
                                                        +
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                            </div>

                            {Object.keys(cart).length ? <div className={`border border-(--grey1) p-5 rounded-[20px] mt-4 bg-[#181A1D] `}>
                                <form action="
                              "
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        console.log("Submitting cart:", cart); // you can send this to API
                                        setStep('checkout'); // move to checkout step
                                    }}
                                >

                                    <table className="border-separate border-spacing-y-3 w-full">
                                        <thead>
                                            <tr className="border-b border-(--grey1)">
                                                <td className="text-white font-medium text-[20px]">Item</td>
                                                <td className="text-white font-medium text-[20px] text-center">Qty</td>
                                                <td className="text-white font-medium text-[20px]">Price</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Object.values(cart).map((item, i) => (
                                                    <tr key={i} className="bg-[#33333399]">
                                                        <td className="py-3 pl-4 rounded-l-2xl ">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-[72px] h-[45px] rounded-xl bg-[url(/images/order/item.webp)] bg-center bg-cover"></div>
                                                                <div>
                                                                    <h2 className="text-white font-medium text-[16px]">
                                                                        {item.title}  <span className="text-[#FFFFFFB2]">{item.unitType}</span>
                                                                    </h2>
                                                                    <p className="text-[#ABBBC2] text-[14px] font-normal">${item.price}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="flex items-center justify-center">
                                                                <div className="bg-[#FFFFFF1A] w-[137px] h-11 rounded-2xl flex items-center justify-between px-3 mx-auto">
                                                                    {/* Minus */}
                                                                    <div
                                                                        onClick={() => handleRemove(item)}
                                                                        className="h-6 w-6 bg-white rounded-full text-black flex items-center justify-center text-[24px] cursor-pointer"
                                                                    >
                                                                        -
                                                                    </div>

                                                                    {/* Quantity */}
                                                                    <div className="text-white text-[20px]">
                                                                        {item.quantity}
                                                                    </div>

                                                                    {/* Plus */}
                                                                    <div
                                                                        onClick={() => handleAdd(item)}
                                                                        className="h-6 w-6 bg-white rounded-full text-black flex items-center justify-center text-[24px] cursor-pointer"
                                                                    >
                                                                        +
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </td>
                                                        <td className="rounded-r-2xl">
                                                            {/* <p className="text-white font-medium text-[18px]">${item.price * item.quantity}</p> */}
                                                            <div className="flex items-center justify-between pr-5">
                                                                <div className="bg-[#FFFFFF1A] border border-[#FFFFFF0F] flex items-center gap-2 rounded-xl px-2 py-2 w-max">
                                                                    $ <input
                                                                        type="number"
                                                                        value={(item.price * item.quantity).toFixed(2)}
                                                                        onChange={(e) => handlePriceChange(item.id, e.target.value)}
                                                                        className="w-[72px] bg-transparent border-none text-white"
                                                                    />

                                                                </div>
                                                                {/* <div className="bg-[#FFFFFF1A] border border-[#FFFFFF0F] flex items-center gap-2 rounded-xl px-2 py-2 w-max">
                                                            $ <input type="number" value={item.price * item.quantity} className="w-[72px]" />
                                                        </div> */}
                                                                <span onClick={() => removeItemFromCart(item, setCart)} className="cursor-pointer">
                                                                    X
                                                                </span>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                ))

                                            }

                                        </tbody>
                                        <tfoot>
                                            <tr >
                                                <td className="py-2 pl-4 rounded-l-2xl text-white">
                                                    Type
                                                </td>
                                                <td>

                                                </td>
                                                <td className="rounded-r-2xl text-white text-center multiReactSelectContainer">
                                                    {/* <div className="bg-[#333333CC] h-8 rounded-xl flex items-center justify-center">Payment</div> */}
                                                    <Select options={options} classNamePrefix="react-select" className='mt-2 react-select-container' />

                                                </td>
                                            </tr>

                                            <tr >
                                                <td className="py-2 pl-4 rounded-l-2xl text-white">
                                                    Sub total
                                                </td>
                                                <td>

                                                </td>
                                                <td className="py-2 pl-4 rounded-l-2xl text-white text-end">
                                                    $ 21,03
                                                </td>
                                            </tr>
                                            <tr >
                                                <td className="py-2 pl-4 rounded-l-2xl text-white">
                                                    VAT
                                                </td>
                                                <td>

                                                </td>
                                                <td className="py-2 pl-4 rounded-l-2xl text-white text-end">
                                                    15%
                                                </td>
                                            </tr>

                                        </tfoot>
                                    </table>
                                    <button onClick={() => setStep('checkout')} type="submit" className="bg-[#FFFFFF2E] rounded-[12px] flex items-center justify-center h-11 shadow-[inset_0px_2px_8px_0px_#FFFFFF66] w-full hover:bg-[#e7e7e72e] cursor-pointer">Checkout</button>
                                </form>
                            </div> : null}

                        </div>

                    </div>
                )
            }


            {/* Check Out  */}

            {
                step === "checkout" && (
                    <div>
                        <div className="flex items-center gap-3">
                            <button onClick={goBack} className="inline-block cursor-pointer">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_2_9771)"> <path d="M24.5 12.8333H7.96833L12.145 8.645L10.5 7L3.5 14L10.5 21L12.145 19.355L7.96833 15.1667H24.5V12.8333Z" fill="white" /> </g> <defs> <clipPath id="clip0_2_9771"> <rect width="28" height="28" fill="white" /> </clipPath> </defs> </svg>
                            </button>
                            <h2 className="text-white text-[28px] font-semibold">Placing Order
                                {/* {selectedSubCategory} */}
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="bg-(--dark1) border border-(--grey1) rounded-2xl p-5">
                                <h1 className="text-white font-medium text-2xl">ID #34562</h1>
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <div className="col-span-2 w-full nativeSelect">
                                        <NativeSelect style={{ width: '100%' }} className="w-full flex bg-[#333333B2] h-[49px] rounded-xl border-none mt-4">
                                            <NativeSelectOption value="" className='bg-(--dark1) text-white border border-(--grey1)'>Order Details</NativeSelectOption>
                                            <NativeSelectOption value="OrderNo" className='bg-(--dark1) text-white border border-(--grey1)'>Order No</NativeSelectOption>
                                        </NativeSelect>
                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-white text-[14px] font-medium ">Name</label>
                                        <input type="text" className="form-control block w-full mt-1" />

                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-white text-[14px] font-medium ">Phone Number</label>
                                        <input type="number" className="form-control block w-full mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="" className="text-white text-[14px] font-medium ">Email</label>
                                        <input type="email" className="form-control block w-full mt-1" />
                                    </div>
                                    <div className="w-full nativeSelect">
                                        <label htmlFor="" className="text-white text-[14px] font-medium ">Client Type</label>

                                        <NativeSelect style={{ width: '100%' }} className="w-full flex bg-[#333333B2] h-10 mt-1 rounded-[13px] border border-(--grey1)">
                                            <NativeSelectOption value="" className='bg-(--dark1) text-white border border-(--grey1)' selected disabled>Select Client Type</NativeSelectOption>
                                            <NativeSelectOption value="Foreign" className='bg-(--dark1) text-white border border-(--grey1)'>Foreign</NativeSelectOption>
                                            <NativeSelectOption value="Local" className='bg-(--dark1) text-white border border-(--grey1)'>Local</NativeSelectOption>
                                        </NativeSelect>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="" className="text-white text-[14px] font-medium ">Address</label>
                                        <input type="text" className="form-control block w-full mt-1" />
                                    </div>
                                    <div >
                                        <label htmlFor="" className="text-white text-[14px] font-medium ">Client VAT</label>
                                        <input type="number" className="form-control block w-full mt-1" />
                                    </div>
                                    <div >
                                        <label htmlFor="" className="text-white text-[14px] font-medium ">Client TIN</label>
                                        <input type="number" className="form-control block w-full mt-1" />
                                    </div>

                                    <div>
                                        <div className="flex flex-col gap-3 datePickerContainer">
                                            <label htmlFor="" className="text-white text-[14px] font-medium ">Date of Travel</label>
                                            <Popover open={open1} onOpenChange={setOpen1}>
                                                <PopoverTrigger asChild className="w-full cursor-pointer bg-[#33333352] border border-(--grey1) rounded-xl h-10">
                                                    <Button
                                                        variant="outline"
                                                        id="date"
                                                        className="w-full justify-between font-normal"
                                                    >
                                                        {date1 ? date1.toLocaleDateString() : "Select date"}
                                                        <ChevronDownIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date1}
                                                        captionLayout="dropdown"
                                                        onSelect={(d) => {
                                                            setDate1(d)
                                                            setOpen1(false)
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>

                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col gap-3 datePickerContainer">
                                            <label htmlFor="" className="text-white text-[14px] font-medium ">Date of Travel</label>
                                            <Popover open={open2} onOpenChange={setOpen2}>
                                                <PopoverTrigger asChild className="w-full cursor-pointer bg-[#33333352] border border-(--grey1) rounded-xl h-10">
                                                    <Button
                                                        variant="outline"
                                                        id="date"
                                                        className="w-full justify-between font-normal"
                                                    >
                                                        {date2 ? date2.toLocaleDateString() : "Select date"}
                                                        <ChevronDownIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date2}
                                                        captionLayout="dropdown"
                                                        onSelect={(d) => {
                                                            setDate2(d)
                                                            setOpen2(false)
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>

                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <label htmlFor="" className="text-white text-[14px] font-medium ">Client TIN</label>
                                        <textarea name="" id="" className="border border-(--grey1)  bg-[#33333352] rounded-xl h-[70px] mt-1 resize-none p-2 block w-full"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-(--dark1) border border-(--grey1) rounded-2xl p-5">
                                <h1 className="text-white font-medium text-2xl">Payment</h1>
                                <Separator className='mt-3 bg-(--grey1)' />
                                <h2 className="text-white text-[20px] font-semibold mt-4">Payment Method</h2>

                                <Tabs defaultValue="creditCard" className="w-full mt-3">
                                    <TabsList className="w-full h-[139px] flex gap-3 bg-transparent">

                                        <TabsTrigger
                                            value="creditCard"
                                            className="bg-[#373737B2] cursor-pointer h-full text-white rounded-xl border border-(--grey1) data-[state=active]:border-[#ABBBC2] data-[state=active]:bg-(--grey1)"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <svg className="w-11 h-11 shrink-0 size-0" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M40.3333 18.3332H3.66663M20.1666 25.6665H11M3.66663 15.0332L3.66663 28.9665C3.66663 31.02 3.66663 32.0468 4.06627 32.8311C4.4178 33.5211 4.97873 34.082 5.66866 34.4335C6.453 34.8332 7.47977 34.8332 9.53329 34.8332L34.4666 34.8332C36.5202 34.8332 37.5469 34.8332 38.3313 34.4335C39.0212 34.082 39.5821 33.5211 39.9337 32.8311C40.3333 32.0468 40.3333 31.02 40.3333 28.9665V15.0332C40.3333 12.9796 40.3333 11.9529 39.9337 11.1685C39.5821 10.4786 39.0212 9.91768 38.3313 9.56615C37.5469 9.16651 36.5202 9.16651 34.4666 9.16651L9.53329 9.1665C7.47977 9.1665 6.453 9.1665 5.66866 9.56615C4.97873 9.91768 4.41781 10.4786 4.06627 11.1685C3.66663 11.9529 3.66663 12.9796 3.66663 15.0332Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                                <p className="text-white text-[14px] font-medium">Credit Card</p>
                                            </div>
                                        </TabsTrigger>

                                        <TabsTrigger
                                            value="cash"
                                            className="bg-[#373737B2] cursor-pointer h-full text-white rounded-xl border border-(--grey1) data-[state=active]:border-[#ABBBC2] data-[state=active]:bg-(--grey1)"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-3">
                                                <svg className="w-11 h-11 shrink-0 size-0" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M25.6666 16.4998H21.0833C19.5645 16.4998 18.3333 17.7311 18.3333 19.2498C18.3333 20.7686 19.5645 21.9998 21.0833 21.9998H22.9166C24.4354 21.9998 25.6666 23.2311 25.6666 24.7498C25.6666 26.2686 24.4354 27.4998 22.9166 27.4998H18.3333M22 14.6665V16.4998M22 27.4998V29.3332M33 21.9998H33.0183M11 21.9998H11.0183M3.66663 15.0332L3.66663 28.9665C3.66663 31.02 3.66663 32.0468 4.06627 32.8311C4.4178 33.5211 4.97873 34.082 5.66866 34.4335C6.453 34.8332 7.47977 34.8332 9.53329 34.8332L34.4666 34.8332C36.5202 34.8332 37.5469 34.8332 38.3313 34.4335C39.0212 34.082 39.5821 33.5211 39.9337 32.8311C40.3333 32.0468 40.3333 31.02 40.3333 28.9665V15.0332C40.3333 12.9796 40.3333 11.9529 39.9337 11.1685C39.5821 10.4786 39.0212 9.91768 38.3313 9.56615C37.5469 9.16651 36.5202 9.16651 34.4666 9.16651L9.53329 9.1665C7.47977 9.1665 6.453 9.1665 5.66866 9.56615C4.97873 9.91768 4.4178 10.4786 4.06627 11.1685C3.66663 11.9529 3.66663 12.9796 3.66663 15.0332ZM33.9166 21.9998C33.9166 22.5061 33.5062 22.9165 33 22.9165C32.4937 22.9165 32.0833 22.5061 32.0833 21.9998C32.0833 21.4936 32.4937 21.0832 33 21.0832C33.5062 21.0832 33.9166 21.4936 33.9166 21.9998ZM11.9166 21.9998C11.9166 22.5061 11.5062 22.9165 11 22.9165C10.4937 22.9165 10.0833 22.5061 10.0833 21.9998C10.0833 21.4936 10.4937 21.0832 11 21.0832C11.5062 21.0832 11.9166 21.4936 11.9166 21.9998Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                                <p className="text-white text-[14px] font-medium">Cash</p>
                                            </div>
                                        </TabsTrigger>

                                    </TabsList>

                                    <TabsContent value="creditCard">
                                        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-3">
                                            <div className="col-span-2">
                                                <label htmlFor="" className="text-white text-[14px] font-medium ">Cardholder Name</label>
                                                <input type="text" className="form-control block w-full mt-1" />

                                            </div>
                                            <div className="col-span-2">
                                                <label htmlFor="" className="text-white text-[14px] font-medium ">Card Number</label>
                                                <input type="number" className="form-control block w-full mt-1" />

                                            </div>
                                            <div >
                                                <label htmlFor="" className="text-white text-[14px] font-medium ">Expiration Date</label>
                                                <Popover open={open3} onOpenChange={setOpen3} >
                                                    <PopoverTrigger asChild className="w-full cursor-pointer bg-[#232528] border border-(--grey1) rounded-[10px] h-10">
                                                        <Button
                                                            variant="outline"
                                                            id="date"
                                                            className="w-full justify-between font-normal mt-1"
                                                        >
                                                            {date3 ? date3.toLocaleDateString() : "Select date"}
                                                            <ChevronDownIcon />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date3}
                                                            captionLayout="dropdown"
                                                            onSelect={(d) => {
                                                                setDate3(d)
                                                                setOpen3(false)
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>

                                            </div>
                                            <div >
                                                <label htmlFor="" className="text-white text-[14px] font-medium ">CVV</label>
                                                <input
                                                    type="password"
                                                    maxLength={3}
                                                    className="form-control block w-full mt-1"
                                                />


                                            </div>

                                            <div className="bg-[#333333B2] mt-3 h-[49px] rounded-xl col-span-2 flex items-center justify-between px-4">
                                                <span className="text-white font-medium text-[18px]">Total </span>
                                                <span className="text-white font-medium text-[18px]"> $ 32,03</span>
                                            </div>
                                            <div className="col-span-2 mt-3">
                                                <button
                                                    className="btn btn-primary w-full"
                                                    onClick={notify}
                                                >
                                                    Proceed
                                                </button>
                                                <Toaster />

                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="cash">
                                        <div className="bg-[#333333B2] mt-3 h-[49px] rounded-xl col-span-2 flex items-center justify-between px-4">
                                            <span className="text-white font-medium text-[18px]">Total </span>
                                            <span className="text-white font-medium text-[18px]"> $ 32,03</span>
                                        </div>
                                        <div className="col-span-2 mt-3">
                                            <button
                                                className="btn btn-primary w-full"
                                                onClick={notify}
                                            >
                                                Proceed
                                            </button>
                                            <Toaster />

                                        </div>
                                    </TabsContent>
                                </Tabs>

                            </div>
                        </div>
                    </div>
                )
            }

        </div >
    );
}
