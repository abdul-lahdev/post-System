'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import * as React from "react"
import Link from "next/link"

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
} from "@/components/ui/table"

import { orderData } from "@/app/constants/data"

export default function Page() {
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
    const [objData, setObjData] = useState(orderData)

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
            <div className="text-white px-5 pt-8">

                <div className="flex items-center justify-between">
                    <h1 className="text-[32px] font-semibold uppercase">Orders</h1>
                    <div className="flex items-center gap-3">
                        <button className="btn-primary text-[14px] font-medium px-3  flex items-center justify-center gap-2 ">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8.16667 12.8333C7.0817 12.8333 6.53922 12.8333 6.09413 12.9526C4.88631 13.2762 3.94289 14.2196 3.61926 15.4275C3.5 15.8725 3.5 16.415 3.5 17.5V18.9C3.5 20.8602 3.5 21.8403 3.88148 22.589C4.21703 23.2475 4.75247 23.783 5.41103 24.1185C6.15972 24.5 7.13982 24.5 9.1 24.5H18.9C20.8602 24.5 21.8403 24.5 22.589 24.1185C23.2475 23.783 23.783 23.2475 24.1185 22.589C24.5 21.8403 24.5 20.8602 24.5 18.9V17.5C24.5 16.415 24.5 15.8725 24.3807 15.4275C24.0571 14.2196 23.1137 13.2762 21.9059 12.9526C21.4608 12.8333 20.9183 12.8333 19.8333 12.8333M18.6667 8.16667L14 3.5M14 3.5L9.33333 8.16667M14 3.5V17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                            Export CSV </button>
                        <Link href='/admin/categories'>
                            <button className="btn-primary text-[14px] font-medium px-3  flex items-center justify-center gap-2 ">
                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 9.33337V18.6667M9.33337 14H18.6667M25.6667 14C25.6667 20.4434 20.4434 25.6667 14 25.6667C7.55672 25.6667 2.33337 20.4434 2.33337 14C2.33337 7.55672 7.55672 2.33337 14 2.33337C20.4434 2.33337 25.6667 7.55672 25.6667 14Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                Add New </button>
                        </Link>

                    </div>
                </div>

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
        </>
    )
}
