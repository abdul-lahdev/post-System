
'use client'
import { useEffect, useRef, useState } from "react"

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
} from "@/components/ui/table"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


import { categories } from "@/app/constants/categories";

export default function Page() {

    const [modalopen, setModalOpen] = useState(false);
    const [subModalOpen, setSubModalOpen] = useState(false);
    const [currTab, setCurrTab] = useState('profile')

    const [openDropdown, setOpenDropdown] = useState(null);
    const colourOptions = [
        { value: 'water', label: 'Water' },
        { value: 'electricity', label: 'Electricity' },
    ]

    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const [objData, setObjData] = useState(categories)


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
        <>
            <div className="grid grid-cols-[1fr_3fr] gap-5 mt-5">
                <div className="bg-(--dark5) min-h-lvw rounded-bl-xl rounded-r-xl rounded-tl-none p-5">
                    <h1 className="text-white text-[20px] font-medium mt-3">Settings</h1>

                    <ul className="mt-8 flex flex-col gap-3">
                        <li className={`flex items-center gap-3  py-4 rounded-[6px] hover:bg-[#2A2C2F] cursor-pointer px-3 ${currTab === 'profile' ? 'bg-[#2A2C2F]' : ''}`} onClick={() => setCurrTab('profile')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                            <span className="text-white font-medium text-[16px]">Profile</span>
                        </li>
                        <li className={`flex items-center gap-3  py-4 rounded-[6px] hover:bg-[#2A2C2F] cursor-pointer px-3 ${currTab === 'security' ? 'bg-[#2A2C2F]' : ''}`} onClick={() => setCurrTab('security')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17 11V8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8V11M8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V15.8C20 14.1198 20 13.2798 19.673 12.638C19.3854 12.0735 18.9265 11.6146 18.362 11.327C17.7202 11 16.8802 11 15.2 11H8.8C7.11984 11 6.27976 11 5.63803 11.327C5.07354 11.6146 4.6146 12.0735 4.32698 12.638C4 13.2798 4 14.1198 4 15.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                            <span className="text-white font-medium text-[16px]">Security</span>
                        </li>
                        <li className={`flex items-center gap-3  py-4 rounded-[6px] hover:bg-[#2A2C2F] cursor-pointer px-3 ${currTab === 'category' ? 'bg-[#2A2C2F]' : ''}`} onClick={() => setCurrTab('category')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.832 7.05642L16.968 9.19242C17.448 9.64842 17.448 10.4164 16.968 10.8724L11.4 16.4164V11.3524V8.78442L13.128 7.03242C13.584 6.57642 14.376 6.57642 14.832 7.05642Z" fill="white" /> <path d="M6.0002 5.2998H9.0002C9.38225 5.29991 9.68927 5.61042 9.67598 5.98242V16.5117C9.67598 17.7234 8.70012 18.6999 7.48848 18.7002C6.27662 18.7002 5.3 17.7236 5.3 16.5117V6C5.3 5.65348 5.53303 5.37696 5.85664 5.31348L6.0002 5.2998ZM7.48848 14.8115C6.54037 14.8115 5.78833 15.5636 5.78828 16.5117C5.78828 17.4599 6.54034 18.2119 7.48848 18.2119C8.4364 18.2117 9.1877 17.4597 9.1877 16.5117C9.18765 15.5638 8.43637 14.8118 7.48848 14.8115Z" stroke="white" /> <path d="M18 13.7998H15.888L14.448 15.2398H17.76L17.736 17.7598H11.952L10.512 19.1998H18C18.672 19.1998 19.2 18.6718 19.2 17.9998V14.9998C19.2 14.3518 18.672 13.7998 18 13.7998Z" fill="white" /> </svg>
                            <span className="text-white font-medium text-[16px]">Category</span>
                        </li>
                        <li className={`flex items-center gap-3  py-4 rounded-[6px] hover:bg-[#2A2C2F] cursor-pointer px-3 ${currTab === 'subCategory' ? 'bg-[#2A2C2F]' : ''}`} onClick={() => setCurrTab('subCategory')}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_93_4579)"> <path d="M12 2L6.5 11H17.5L12 2ZM12 5.84L13.93 9H10.06L12 5.84ZM17.5 13C15.01 13 13 15.01 13 17.5C13 19.99 15.01 22 17.5 22C19.99 22 22 19.99 22 17.5C22 15.01 19.99 13 17.5 13ZM17.5 20C16.12 20 15 18.88 15 17.5C15 16.12 16.12 15 17.5 15C18.88 15 20 16.12 20 17.5C20 18.88 18.88 20 17.5 20ZM3 21.5H11V13.5H3V21.5ZM5 15.5H9V19.5H5V15.5Z" fill="white" /> </g> <defs> <clipPath id="clip0_93_4579"> <rect width="24" height="24" fill="white" /> </clipPath> </defs> </svg>
                            <span className="text-white font-medium text-[16px]">Subcategory</span>
                        </li>
                    </ul>
                </div>
                <div className="bg-(--dark5) p-5 rounded-[12px]">
                    {
                        currTab === 'profile' && (
                            <div>
                                <form action="">
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-white font-semibold text-2xl">
                                            Profile Details
                                        </h1>
                                        <button type="submit" className="btn btn-primary px-6 text-white">Save</button>
                                    </div>
                                    <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                                        <div>
                                            <label htmlFor="" className="text-white font-medium text-[14px] block mb-1">Name</label>
                                            <input type="text" name="name" placeholder="John Lewis" className="h-10 text-white placeholder:text-[#C3C3C3] px-3 border border-(--grey1) bg-(--dark6) shadow-[0px_1px_2px_0px_#1018280D] rounded-[7px] w-full " />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="text-white font-medium text-[14px] block mb-1">Email Address</label>
                                            <input type="email" name="emailAddress" placeholder="abc@mail.com" className="h-10 text-white placeholder:text-[#C3C3C3] px-3 border border-(--grey1) bg-(--dark6) shadow-[0px_1px_2px_0px_#1018280D] rounded-[7px] w-full " />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="text-white font-medium text-[14px] block mb-1">Phone Number</label>
                                            <input type="number" name="phoneNo" placeholder="+1 234 2345 " className="h-10 text-white placeholder:text-[#C3C3C3] px-3 border border-(--grey1) bg-(--dark6) shadow-[0px_1px_2px_0px_#1018280D] rounded-[7px] w-full " />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="text-white font-medium text-[14px] block mb-1">Country</label>
                                            <input type="number" name="country" placeholder="+1 234 2345 " className="h-10 text-white placeholder:text-[#C3C3C3] px-3 border border-(--grey1) bg-(--dark6) shadow-[0px_1px_2px_0px_#1018280D] rounded-[7px] w-full " />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="text-white font-medium text-[14px] block mb-1">City</label>
                                            <input type="number" name="city" placeholder="" className="h-10 text-white placeholder:text-[#C3C3C3] px-3 border border-(--grey1) bg-(--dark6) shadow-[0px_1px_2px_0px_#1018280D] rounded-[7px] w-full " />
                                        </div>
                                        <div>
                                            <label htmlFor="" className="text-white font-medium text-[14px] block mb-1">ZipCode</label>
                                            <input type="number" name="zipCode" placeholder="xxxxx" className="h-10 text-white placeholder:text-[#C3C3C3] px-3 border border-(--grey1) bg-(--dark6) shadow-[0px_1px_2px_0px_#1018280D] rounded-[7px] w-full " />
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="" className="text-white font-medium text-[14px] block mb-1">Address</label>
                                            <input type="number" name="address" placeholder="xxxxx" className="h-10 text-white placeholder:text-[#C3C3C3] px-3 border border-(--grey1) bg-(--dark6) shadow-[0px_1px_2px_0px_#1018280D] rounded-[7px] w-full " />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )

                    }
                    {
                        currTab === 'security' && (
                            <div>
                                <form action="">
                                    <div className="flex items-center justify-between">
                                        <h1 className="text-white font-semibold text-2xl">
                                            Security Details
                                        </h1>
                                        <button type="submit" className="btn btn-primary px-6 text-white">Save</button>
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="text-white font-medium text-[14px] block mb-1">Current Password</label>
                                        <input type="password" name="currPassword" placeholder="***************************" className="h-10 text-white placeholder:text-[#C3C3C3] px-3 border border-(--grey1) bg-(--dark6) shadow-[0px_1px_2px_0px_#1018280D] rounded-[7px] w-full " />
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="text-white font-medium text-[14px] block mb-1">New Password</label>
                                        <input type="password" name="newPass" placeholder="" className="h-10 text-white placeholder:text-[#C3C3C3] px-3 border border-(--grey1) bg-(--dark6) shadow-[0px_1px_2px_0px_#1018280D] rounded-[7px] w-full " />
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="" className="text-white font-medium text-[14px] block mb-1">Confirm Password</label>
                                        <input type="password" name="confirmPass" placeholder="" className="h-10 text-white placeholder:text-[#C3C3C3] px-3 border border-(--grey1) bg-(--dark6) shadow-[0px_1px_2px_0px_#1018280D] rounded-[7px] w-full " />
                                    </div>
                                </form>
                            </div>
                        )

                    }
                    {
                        currTab === 'category' && (
                            <div>
                                <div className="text-white px-5 pt-8">

                                    <div className="flex items-center justify-between">
                                        <h1 className="text-[32px] font-semibold uppercase">Category</h1>


                                        {/* 2nd button (anywhere else) */}
                                        <button
                                            onClick={() => setModalOpen(true)}
                                            className="btn-primary text-[14px] font-medium px-3  flex items-center justify-center gap-2 "
                                        >
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 9.33337V18.6667M9.33337 14H18.6667M25.6667 14C25.6667 20.4434 20.4434 25.6667 14 25.6667C7.55672 25.6667 2.33337 20.4434 2.33337 14C2.33337 7.55672 7.55672 2.33337 14 2.33337C20.4434 2.33337 25.6667 7.55672 25.6667 14Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                            Add New
                                        </button>


                                        <Dialog open={modalopen} onOpenChange={setModalOpen}>
                                            <DialogContent className='bg-(--dark7) shadow-[0_0_16.3px_0px_#FFFFFF7A] border-1 border-white'>
                                                <DialogHeader className='text-white font-semibold text-[32px]'>
                                                    <DialogTitle className='border-b border-[#FFFFFF3D] pb-3'>
                                                        ADD CATEGORY
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        <form action="">
                                                            <div className="mt-3">
                                                                <label htmlFor=" " className='text-white font-medium text-[14px]'>
                                                                    Category Name
                                                                </label>
                                                                <input type="text" className="form-control w-full block mt-2" />
                                                            </div>
                                                            <div className="mt-3 multiReactSelectContainer">
                                                                <label htmlFor=" " className='text-white font-medium text-[14px]'>
                                                                    Subcategory
                                                                </label>
                                                                <Select
                                                                    closeMenuOnSelect={false}
                                                                    defaultValue={[colourOptions[4], colourOptions[5]]}
                                                                    isMulti
                                                                    options={colourOptions}
                                                                    className='mt-2 react-select-container'
                                                                    classNamePrefix="react-select"
                                                                />
                                                            </div>

                                                            <div className="flex justify-end mt-4">
                                                                <button type="submit" className='btn-primary px-6 text-white' >Add</button>
                                                            </div>
                                                        </form>

                                                    </DialogDescription>

                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>


                                    </div>

                                    <div className="p-5 border border-(--grey1) mt-8 rounded-xl">


                                        <Table className=''>
                                            <TableHeader>
                                                <TableRow className='bg-[#FFFFFF1F] border-b border-[#FFFFFF1F] hover:bg-[#FFFFFF1F]'>
                                                    <TableHead className="text-white font-medium text-[12px] rounded-tl-[12px] py-4 text-center">ID</TableHead>
                                                    <TableHead className="text-white text-[12px] text-center">Main Category</TableHead>
                                                    <TableHead className="text-white text-[12px] text-center">Subcategory</TableHead>
                                                    <TableHead className="text-white font-medium text-[12px] rounded-tr-[12px] py-4 "></TableHead>
                                                </TableRow>
                                            </TableHeader>

                                            <TableBody>
                                                {currentItems.map((item) => (
                                                    <TableRow key={item.id} className='bg-[#FFFFFF0F] border-t border-[#FFFFFF1F] hover:bg-[#f5f5f536]'>
                                                        <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.id}</TableCell>
                                                        <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.category}</TableCell>
                                                        <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.subCategory}</TableCell>

                                                        <TableCell className='text-white text-[12px] font-medium py-4 text-center flex items-center'>
                                                            <div className="relative">
                                                                <button
                                                                    className="cursor-pointer px-2 py-1"
                                                                    onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
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
                                                                            onClick={() => {
                                                                                console.log("Add New for ID:", item.id);
                                                                                setOpenDropdown(null);
                                                                                setModalOpen(true)
                                                                            }}
                                                                        >
                                                                            Add New
                                                                        </button>

                                                                        <button
                                                                            className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                                                                            onClick={() => {
                                                                                console.log("Edit:", item.id);
                                                                                setOpenDropdown(null);
                                                                            }}
                                                                        >
                                                                            Edit
                                                                        </button>

                                                                        <button
                                                                            className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                                                                            onClick={() => {
                                                                                console.log("Delete:", item.id);
                                                                                setOpenDropdown(null);
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

                                </div>
                            </div>
                        )

                    }
                    {
                        currTab === 'subCategory' && (
                            <div>
                                <div className="text-white px-5 pt-8">

                                    <div className="flex items-center justify-between">
                                        <h1 className="text-[32px] font-semibold uppercase">Subcategory</h1>


                                        {/* 2nd button (anywhere else) */}
                                        <button
                                            onClick={() => setSubModalOpen(true)}
                                            className="btn-primary text-[14px] font-medium px-3  flex items-center justify-center gap-2 "
                                        >
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 9.33337V18.6667M9.33337 14H18.6667M25.6667 14C25.6667 20.4434 20.4434 25.6667 14 25.6667C7.55672 25.6667 2.33337 20.4434 2.33337 14C2.33337 7.55672 7.55672 2.33337 14 2.33337C20.4434 2.33337 25.6667 7.55672 25.6667 14Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                            Add New
                                        </button>


                                        <Dialog open={subModalOpen} onOpenChange={setSubModalOpen}>
                                            <DialogContent className='bg-(--dark7) shadow-[0_0_16.3px_0px_#FFFFFF7A] border-1 border-white'>
                                                <DialogHeader className='text-white font-semibold text-[32px]'>
                                                    <DialogTitle className='border-b border-[#FFFFFF3D] pb-3'>
                                                        ADD SUBCATEGORY
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        <form action="">
                                                            <div className="mt-3">
                                                                <label htmlFor=" " className='text-white font-medium text-[14px]'>
                                                                    Name
                                                                </label>
                                                                <input type="text" className="form-control w-full block mt-2" />
                                                            </div>


                                                            <div className="flex justify-end mt-4">
                                                                <button type="submit" className='btn-primary px-8 text-white' >Save</button>
                                                            </div>
                                                        </form>

                                                    </DialogDescription>

                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>


                                    </div>

                                    <div className="p-5 border border-(--grey1) mt-8 rounded-xl">


                                        <Table className=''>
                                            <TableHeader>
                                                <TableRow className='bg-[#FFFFFF1F] border-b border-[#FFFFFF1F] hover:bg-[#FFFFFF1F]'>
                                                    <TableHead className="text-white font-medium text-[12px] rounded-tl-[12px] py-4 text-center">ID</TableHead>
                                                    <TableHead className="text-white text-[12px] text-center">Subcategory</TableHead>
                                                    <TableHead className="text-white text-[12px] text-center">Main Category</TableHead>
                                                    <TableHead className="text-white font-medium text-[12px] rounded-tr-[12px] py-4 "></TableHead>
                                                </TableRow>
                                            </TableHeader>

                                            <TableBody>
                                                {currentItems.map((item) => (
                                                    <TableRow key={item.id} className='bg-[#FFFFFF0F] border-t border-[#FFFFFF1F] hover:bg-[#f5f5f536]'>
                                                        <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.id}</TableCell>
                                                        <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.subCategory}</TableCell>
                                                        <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.category}</TableCell>

                                                        <TableCell className='text-white text-[12px] font-medium py-4 text-center flex items-center'>
                                                            <div className="relative">
                                                                <button
                                                                    className="cursor-pointer px-2 py-1"
                                                                    onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
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
                                                                            onClick={() => {
                                                                                console.log("Add New for ID:", item.id);
                                                                                setOpenDropdown(null);
                                                                                setSubModalOpen(true)
                                                                            }}
                                                                        >
                                                                            Add New
                                                                        </button>

                                                                        <button
                                                                            className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                                                                            onClick={() => {
                                                                                console.log("Edit:", item.id);
                                                                                setOpenDropdown(null);
                                                                            }}
                                                                        >
                                                                            Edit
                                                                        </button>

                                                                        <button
                                                                            className="w-full text-left px-4 py-2 text-white hover:bg-gray-700"
                                                                            onClick={() => {
                                                                                console.log("Delete:", item.id);
                                                                                setOpenDropdown(null);
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

                                </div>
                            </div>
                        )

                    }
                </div>
            </div>
        </>
    )
}
