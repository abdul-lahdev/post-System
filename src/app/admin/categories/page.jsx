"use client";
import { useLayoutEffect, useState } from "react";
import Image from 'next/image'
import { useHotels } from "@/context/HotelContext";

export default function Page() {
    // Step controller: categories → subcategories → products


    const { hotel, hotelData, step, setStep } = useHotels();

    // Selected values
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [cart, setCart] = useState({});
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
    console.log('currentHotel', currentHotel)
    // -----------------------------
    // STEP HANDLERS
    // -----------------------------

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
    };

    // -----------------------------
    // RENDER LOGIC (UI tum customise kar lena)
    // -----------------------------

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
                            <button onClick={goBack}>
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
                            <button onClick={goBack} className="inline-block">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_2_9771)"> <path d="M24.5 12.8333H7.96833L12.145 8.645L10.5 7L3.5 14L10.5 21L12.145 19.355L7.96833 15.1667H24.5V12.8333Z" fill="white" /> </g> <defs> <clipPath id="clip0_2_9771"> <rect width="28" height="28" fill="white" /> </clipPath> </defs> </svg>
                            </button>
                            <h2>PRODUCTS
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
                                                        <div className="bg-[#FFFFFF1A] border border-[#FFFFFF0F] flex items-center gap-2 rounded-xl px-2 py-2 w-max">
                                                            $ <input type="number" value={item.price * item.quantity} className="w-[72px]" />
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
                                            <td className="rounded-r-2xl text-white text-end">
                                                <div className="bg-[#333333CC] h-8 rounded-xl flex items-center justify-center">Payment</div>
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
                                                12%
                                            </td>
                                        </tr>

                                    </tfoot>
                                </table>
                                <button className="bg-[#FFFFFF2E] rounded-[12px] flex items-center justify-center h-11 shadow-[inset_0px_2px_8px_0px_#FFFFFF66] w-full hover:bg-[#e7e7e72e] cursor-pointer">Checkout</button>
                            </div> : null}

                        </div>

                    </div>
                )
            }

        </div >
    );
}
