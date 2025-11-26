'use client'
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation"

import { useState } from "react"
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { orderData } from "@/app/constants/data"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"

const RevenueChart = dynamic(
    () => import('@/app/component/dashboard/revenue-chart'),
    { ssr: false } // only render on client
);

const ReceiptChart = dynamic(
    () => import('@/app/component/dashboard/receipt-chart'),
    { ssr: false } // only render on client
);


function Page() {



    const [objData, setObjData] = useState(orderData)
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = useState(undefined)

    const [secopen, setSecOpen] = React.useState(false)
    const [secdate, setSecDate] = useState(undefined)
    const dashboardCards = [
        {
            title: "Total Revenue", value: "$32,143", icon: <svg width="121" height="121" viewBox="0 0 121 121" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_f_2_9371)"> <circle cx="60.5" cy="60.5" r="28" fill="#00C853" fillOpacity="0.32" /> </g> <g filter="url(#filter1_ii_2_9371)"> <rect x="36.5" y="36.5" width="48" height="48" rx="24" fill="white" fillOpacity="0.02" /> <g clipPath="url(#clip0_2_9371)"> <path d="M60.5 48.8333C54.06 48.8333 48.8334 54.06 48.8334 60.5C48.8334 66.94 54.06 72.1667 60.5 72.1667C66.94 72.1667 72.1667 66.94 72.1667 60.5C72.1667 54.06 66.94 48.8333 60.5 48.8333ZM60.5 69.8333C55.355 69.8333 51.1667 65.645 51.1667 60.5C51.1667 55.355 55.355 51.1667 60.5 51.1667C65.645 51.1667 69.8334 55.355 69.8334 60.5C69.8334 65.645 65.645 69.8333 60.5 69.8333ZM60.8617 59.4967C58.7967 58.9717 58.1317 58.4 58.1317 57.5483C58.1317 56.5683 59.0534 55.88 60.5817 55.88C62.1917 55.88 62.7984 56.65 62.845 57.7933H64.84C64.7817 56.23 63.825 54.795 61.935 54.3283V52.3333H59.2167V54.305C57.455 54.6783 56.0434 55.8217 56.0434 57.5833C56.0434 59.6717 57.7817 60.7217 60.3134 61.3283C62.5884 61.865 63.0434 62.67 63.0434 63.51C63.0434 64.1283 62.5884 65.1317 60.5934 65.1317C58.7267 65.1317 57.9917 64.2917 57.8867 63.2183H55.88C55.9967 65.2017 57.4667 66.3217 59.2167 66.6833V68.6667H61.9467V66.7183C63.72 66.38 65.12 65.365 65.1317 63.4867C65.12 60.92 62.915 60.0333 60.8617 59.4967Z" fill="white" /> </g> </g> <defs> <filter id="filter0_f_2_9371" x="0" y="0" width="121" height="121" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="16.25" result="effect1_foregroundBlur_2_9371" /> </filter> <filter id="filter1_ii_2_9371" x="36.5" y="34.5" width="48" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="2" /> <feGaussianBlur stdDeviation="4" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_9371" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="-2" /> <feGaussianBlur stdDeviation="3" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" /> <feBlend mode="normal" in2="effect1_innerShadow_2_9371" result="effect2_innerShadow_2_9371" /> </filter> <clipPath id="clip0_2_9371"> <rect width="28" height="28" fill="white" transform="translate(46.5 46.5)" /> </clipPath> </defs> </svg>
        },
        { title: "Total Receipts", value: "2,321", icon: <svg width="121" height="121" viewBox="0 0 121 121" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_f_2_9379)"> <circle cx="60.5" cy="60.5" r="28" fill="#007BFF" fillOpacity="0.32" /> </g> <g filter="url(#filter1_ii_2_9379)"> <rect x="36.5" y="36.5" width="48" height="48" rx="24" fill="white" fillOpacity="0.02" /> <g opacity="0.8" clipPath="url(#clip0_2_9379)" filter="url(#filter2_d_2_9379)"> <path d="M69.25 50.5833L67.5 48.8333L65.75 50.5833L64 48.8333L62.25 50.5833L60.5 48.8333L58.75 50.5833L57 48.8333L55.25 50.5833L53.5 48.8333V65.1667H50V68.6667C50 70.6033 51.5633 72.1667 53.5 72.1667H67.5C69.4367 72.1667 71 70.6033 71 68.6667V48.8333L69.25 50.5833ZM64 69.8333H53.5C52.8583 69.8333 52.3333 69.3083 52.3333 68.6667V67.5H64V69.8333ZM68.6667 68.6667C68.6667 69.3083 68.1417 69.8333 67.5 69.8333C66.8583 69.8333 66.3333 69.3083 66.3333 68.6667V65.1667H55.8333V52.3333H68.6667V68.6667Z" fill="white" /> <path d="M64 54.6667H57V57H64V54.6667Z" fill="white" /> <path d="M67.5 54.6667H65.1666V57H67.5V54.6667Z" fill="white" /> <path d="M64 58.1667H57V60.5H64V58.1667Z" fill="white" /> <path d="M67.5 58.1667H65.1666V60.5H67.5V58.1667Z" fill="white" /> </g> </g> <defs> <filter id="filter0_f_2_9379" x="0" y="0" width="121" height="121" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="16.25" result="effect1_foregroundBlur_2_9379" /> </filter> <filter id="filter1_ii_2_9379" x="36.5" y="34.5" width="48" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="2" /> <feGaussianBlur stdDeviation="4" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_9379" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="-2" /> <feGaussianBlur stdDeviation="3" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" /> <feBlend mode="normal" in2="effect1_innerShadow_2_9379" result="effect2_innerShadow_2_9379" /> </filter> <filter id="filter2_d_2_9379" x="42.5" y="46.5" width="36" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="4" /> <feGaussianBlur stdDeviation="2" /> <feComposite in2="hardAlpha" operator="out" /> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.482353 0 0 0 0 1 0 0 0 0.01 0" /> <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_9379" /> <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_9379" result="shape" /> </filter> <clipPath id="clip0_2_9379"> <rect width="28" height="28" fill="white" transform="translate(46.5 46.5)" /> </clipPath> </defs> </svg> },
        { title: "Total Orders", value: "2,322", icon: <svg width="121" height="121" viewBox="0 0 121 121" fill="none" xmlns="http://www.w3.org/2000/svg"> <g filter="url(#filter0_f_2_9387)"> <circle cx="60.5" cy="60.5" r="28" fill="#FF9100" fillOpacity="0.32" /> </g> <g filter="url(#filter1_ii_2_9387)"> <rect x="36.5" y="36.5" width="48" height="48" rx="24" fill="white" fillOpacity="0.02" /> <path d="M65.1666 51.1666C66.2516 51.1666 66.7941 51.1666 67.2392 51.2859C68.447 51.6095 69.3904 52.553 69.714 53.7608C69.8333 54.2059 69.8333 54.7483 69.8333 55.8333V66.5666C69.8333 68.5268 69.8333 69.5069 69.4518 70.2556C69.1163 70.9142 68.5808 71.4496 67.9223 71.7852C67.1736 72.1666 66.1935 72.1666 64.2333 72.1666H56.7666C54.8064 72.1666 53.8264 72.1666 53.0777 71.7852C52.4191 71.4496 51.8837 70.9142 51.5481 70.2556C51.1666 69.5069 51.1666 68.5268 51.1666 66.5666V55.8333C51.1666 54.7483 51.1666 54.2059 51.2859 53.7608C51.6095 52.553 52.5529 51.6095 53.7608 51.2859C54.2058 51.1666 54.7483 51.1666 55.8333 51.1666M57.7 53.5H63.3C63.9534 53.5 64.2801 53.5 64.5296 53.3728C64.7491 53.261 64.9276 53.0825 65.0395 52.863C65.1666 52.6134 65.1666 52.2867 65.1666 51.6333V50.7C65.1666 50.0466 65.1666 49.7199 65.0395 49.4703C64.9276 49.2508 64.7491 49.0723 64.5296 48.9605C64.2801 48.8333 63.9534 48.8333 63.3 48.8333H57.7C57.0466 48.8333 56.7199 48.8333 56.4703 48.9605C56.2508 49.0723 56.0723 49.2508 55.9605 49.4703C55.8333 49.7199 55.8333 50.0466 55.8333 50.7V51.6333C55.8333 52.2867 55.8333 52.6134 55.9605 52.863C56.0723 53.0825 56.2508 53.261 56.4703 53.3728C56.7199 53.5 57.0466 53.5 57.7 53.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </g> <defs> <filter id="filter0_f_2_9387" x="0" y="0" width="121" height="121" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feGaussianBlur stdDeviation="16.25" result="effect1_foregroundBlur_2_9387" /> </filter> <filter id="filter1_ii_2_9387" x="36.5" y="34.5" width="48" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"> <feFlood floodOpacity="0" result="BackgroundImageFix" /> <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="2" /> <feGaussianBlur stdDeviation="4" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0" /> <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_9387" /> <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" /> <feOffset dy="-2" /> <feGaussianBlur stdDeviation="3" /> <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" /> <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" /> <feBlend mode="normal" in2="effect1_innerShadow_2_9387" result="effect2_innerShadow_2_9387" /> </filter> </defs> </svg> },
    ]


    const [openDropdown, setOpenDropdown] = useState(null);


    const dropdownRef = React.useRef(null);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const router = useRouter();

    // ---------------- Pagination State ----------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(objData.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = objData.slice(indexOfFirstItem, indexOfLastItem);

    // ------------ Pagination page number logic with dots ------------
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            pages.push(2);

            if (currentPage > 4) pages.push("...");

            const start = Math.max(3, currentPage - 1);
            const end = Math.min(totalPages - 2, currentPage + 1);

            for (let i = start; i <= end; i++) pages.push(i);

            if (currentPage < totalPages - 3) pages.push("...");

            pages.push(totalPages - 1);
            pages.push(totalPages);
        }

        return pages;
    };



    return (
        <div className="text-white px-5 pt-8">
            <h1 className="text-[32px] font-semibold uppercase">Dashboard</h1>
            <div className="grid lg:grid-cols-[3fr_1fr] md:grid-col-1 gap-4 mt-8 ">
                <div className="bg-(--dark1) border border-(--grey1) p-5 rounded-[20px]">
                    <div className="flex items-center justify-between">
                        <h1 className="text-white font-medium text-[24px]">Total Revenue</h1>
                        <div className="flex flex-col gap-3">

                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <div className="w-10 h-10 rounded-[8px] bg-[#FFFFFF14] flex items-center justify-center cursor-pointer">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                        {/* {date ? date.toLocaleDateString() : "Select date"} */}
                                    </div>

                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                            setDate(date)
                                            setOpen(false)
                                        }}

                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                    </div>
                    <Separator className='mt-3 bg-(--grey2)' />
                    <div className="mt-3">
                        <RevenueChart />
                    </div>
                </div>
                <div className="h-full flex flex-col justify-between gap-4">
                    {
                        dashboardCards.map((item, index) =>
                            <div key={index} className="bg-(--dark1) border border-(--grey1) p-5 rounded-3xl h-[33%] flex items-center justify-between">
                                <div className="flex flex-col justify-between h-full">
                                    <h2 className="text-white text-2xl font-medium">{item.title}</h2>
                                    <h1 className="text-white text-[48px] font-medium">{item.value}</h1>
                                </div>
                                <div >
                                    {item.icon}
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="bg-(--dark1) border border-(--grey1) p-5 rounded-[20px] overflow-hidden">
                    <div>
                        <h1 className="text-white font-medium text-[24px]">Recent Orders</h1>


                    </div>
                    <Separator className='mt-3 bg-(--grey2)' />
                    <Table className='mt-8 '>
                        <TableHeader>
                            <TableRow className='bg-[#FFFFFF1F] border-b border-[#FFFFFF1F] hover:bg-[#FFFFFF1F]'>
                                <TableHead className="text-white font-medium text-[12px] rounded-tl-[12px] py-4 text-center">ID</TableHead>
                                <TableHead className="text-white text-[12px]">Fiscal Invoice no.</TableHead>
                                <TableHead className="text-white text-[12px]">Nett</TableHead>
                                <TableHead className="text-white text-[12px]">Vatt</TableHead>
                                <TableHead className="text-white text-[12px]">Total</TableHead>
                                <TableHead className="text-white text-[12px]">Payment Method</TableHead>
                                <TableHead className="text-white text-[12px]">Client Name</TableHead>
                                <TableHead className="text-white text-[12px]">Address</TableHead>
                                <TableHead className="text-white text-[12px]">Phone Number</TableHead>
                                <TableHead className="text-white text-[12px]">Client VAT</TableHead>
                                <TableHead className="text-white text-[12px]">Client TIN</TableHead>
                                <TableHead className="text-white text-[12px]">Product</TableHead>
                                <TableHead className="text-white text-[12px]">Subcategory</TableHead>
                                <TableHead className="text-white text-[12px]">Main Category</TableHead>
                                <TableHead className="text-white text-[12px]">Unit number</TableHead>
                                <TableHead className="text-white text-[12px]">Unit Type</TableHead>
                                <TableHead className="text-white text-[12px]">Date of travel</TableHead>
                                <TableHead className="text-white text-[12px]">Date of payment</TableHead>
                                <TableHead className="text-white text-[12px]">Client Type</TableHead>
                                <TableHead className="text-white text-[12px]">Notes</TableHead>
                                <TableHead className="text-white text-[12px]">Payment Status</TableHead>
                                <TableHead className="text-white font-medium text-[12px] rounded-tr-[12px] py-4 "></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {currentItems.map((item) => (
                                <TableRow onClick={() => router.push(`/admin/order/${item.id}`)} key={item.id} className='bg-[#FFFFFF0F] border-t border-[#FFFFFF1F] hover:bg-[#f5f5f536] cursor-pointer'>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.id}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.fiscVoice}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.net}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.vat}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.total}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.paymentMethod}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.clientName}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.address}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.phone}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.clientVat}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.clientTIN}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.product}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.subCat}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.mainCat}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.unitNo}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.unitType}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.dateTravel}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.datePayment}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.clientType}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.Notes}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'> <div className="flex items-center justify-center">
                                        <span className="bg-[#1C412B] w-[53px] h-[23px] rounded-lg flex items-center justify-center">{item.PaymentStatus}</span>
                                        <span className="bg-[#514722] w-[53px] h-[23px] rounded-lg flex items-center justify-center">{item.PaymentStatus}</span>
                                    </div> </TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>
                                        <div className="relative">
                                            <button
                                                className="cursor-pointer px-2 py-1"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click
                                                    setOpenDropdown(openDropdown === item.id ? null : item.id);
                                                }}
                                            >
                                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 15.167C14.6444 15.167 15.1667 14.6447 15.1667 14.0003C15.1667 13.356 14.6444 12.8337 14 12.8337C13.3557 12.8337 12.8334 13.356 12.8334 14.0003C12.8334 14.6447 13.3557 15.167 14 15.167Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M14 7.00033C14.6444 7.00033 15.1667 6.47799 15.1667 5.83366C15.1667 5.18933 14.6444 4.66699 14 4.66699C13.3557 4.66699 12.8334 5.18933 12.8334 5.83366C12.8334 6.47799 13.3557 7.00033 14 7.00033Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M14 23.3337C14.6444 23.3337 15.1667 22.8113 15.1667 22.167C15.1667 21.5227 14.6444 21.0003 14 21.0003C13.3557 21.0003 12.8334 21.5227 12.8334 22.167C12.8334 22.8113 13.3557 23.3337 14 23.3337Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                            </button>

                                            {openDropdown === item.id && (
                                                <div

                                                    ref={dropdownRef}
                                                    className="absolute right-0 mt-2 w-40 bg-[#1E1E1E] border border-gray-700 rounded-md shadow-lg z-50 flex flex-col items-center"
                                                >
                                                    <button
                                                        className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                                                        onClick={(e) => {
                                                            console.log("Add New for ID:", item.id);
                                                            setOpenDropdown(null);
                                                            setSubModalOpen(true)
                                                        }}
                                                    >
                                                        View
                                                    </button>

                                                    <button
                                                        className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                                                        onClick={(e) => {
                                                            console.log("Edit:", item.id);
                                                            setOpenDropdown(null);
                                                            e.stopPropagation();
                                                        }}
                                                    >
                                                        Add New
                                                    </button>

                                                    <button
                                                        className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                                                        onClick={(e) => {
                                                            console.log("Delete:", item.id);
                                                            setOpenDropdown(null);
                                                            e.stopPropagation();
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="flex justify-center items-center gap-2 mt-6">

                        {/* Left Arrow */}
                        <button
                            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                            className="px-3 py-1 text-white bg-white/10 rounded hover:bg-white/20"
                        >
                            ←
                        </button>

                        {/* Page Numbers */}
                        {getPageNumbers().map((page, idx) => (
                            <button
                                key={idx}
                                onClick={() => page !== "..." && setCurrentPage(page)}
                                disabled={page === "..."}
                                className={`
                                              px-3 py-1 rounded text-sm
                                              ${page === currentPage ? "bg-white text-black" : "bg-white/10 text-white"}
                                              ${page === "..." ? "cursor-default" : "hover:bg-white/20"}
                                          `}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Right Arrow */}
                        <button
                            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                            className="px-3 py-1 text-white bg-white/10 rounded hover:bg-white/20"
                        >
                            →
                        </button>

                    </div>



                </div>
                <div className="bg-(--dark1) border border-(--grey1) p-5 rounded-[20px]">

                    <div className="flex items-center justify-between">
                        <h1 className="text-white font-medium text-[24px]">Recent Orders</h1>
                        <div className="flex flex-col gap-3">
                            <Popover open={secopen} onOpenChange={setSecOpen}>
                                <PopoverTrigger asChild>
                                    <div className="w-10 h-10 rounded-xl bg-[#FFFFFF14] flex items-center justify-center cursor-pointer">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                        {/* {date ? date.toLocaleDateString() : "Select date"} */}
                                    </div>

                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                            setSecDate(date)
                                            setSecOpen(false)
                                        }}

                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <Separator className='mt-3 bg-(--grey2)' />
                    <div>
                        <ReceiptChart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
