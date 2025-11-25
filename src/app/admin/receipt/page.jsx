'use client'
import { useState } from "react"
import * as React from "react"


import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
} from "@/components/ui/table"


// importing here


import { orderData } from "@/app/constants/data"

export default function Page() {
    const [objData, setObjData] = useState(orderData)
    const [openDropdown, setOpenDropdown] = useState(null);


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

                <div >
                    <h1 className="text-[32px] font-semibold uppercase">RECEIPTS</h1>

                </div>

                <div className="p-5 border border-(--grey1) mt-8 rounded-xl">


                    <Table className=''>
                        <TableHeader>
                            <TableRow className='bg-[#FFFFFF1F] border-b border-[#FFFFFF1F] hover:bg-[#FFFFFF1F]'>
                                <TableHead className="text-white font-medium text-[12px] rounded-tl-[12px] py-4 text-center">ID</TableHead>
                                <TableHead className="text-white text-[12px] text-center">Fiscal Invoice no.</TableHead>
                                <TableHead className="text-white text-[12px] text-center">Date</TableHead>
                                <TableHead className="text-white text-[12px] text-center">Items</TableHead>
                                <TableHead className="text-white text-[12px] text-center">Total</TableHead>
                                <TableHead className="text-white text-[12px] text-center">Payment</TableHead>
                                <TableHead className="text-white font-medium text-[12px] rounded-tr-[12px] py-4 "></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {currentItems.map((item) => (
                                <TableRow key={item.id} className='bg-[#FFFFFF0F] border-t border-[#FFFFFF1F] hover:bg-[#f5f5f536]'>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.id}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.fiscVoice}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.datePayment}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.unitNo}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.total}</TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center'> <div className="flex items-center justify-center">

                                        {
                                            item.PaymentStatus === 'Paid' ?
                                                <span className="bg-[#1C412B] w-[53px] h-[23px] rounded-lg flex items-center justify-center">{item.PaymentStatus}</span>
                                                :
                                                <span className="bg-[#514722] w-[53px] h-[23px] px-8 rounded-lg flex items-center justify-center ">{item.PaymentStatus}</span>

                                        }
                                    </div> </TableCell>
                                    <TableCell className='text-white text-[12px] font-medium py-4 text-center flex items-center'>
                                        <div className="relative inline-block text-left">

                                            {/* Trigger */}
                                            <p
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    setOpenDropdown(openDropdown === item.id ? null : item.id)
                                                }
                                            >
                                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 15.167C14.6444 15.167 15.1667 14.6447 15.1667 14.0003C15.1667 13.356 14.6444 12.8337 14 12.8337C13.3557 12.8337 12.8334 13.356 12.8334 14.0003C12.8334 14.6447 13.3557 15.167 14 15.167Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M14 7.00033C14.6444 7.00033 15.1667 6.47799 15.1667 5.83366C15.1667 5.18933 14.6444 4.66699 14 4.66699C13.3557 4.66699 12.8334 5.18933 12.8334 5.83366C12.8334 6.47799 13.3557 7.00033 14 7.00033Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M14 23.3337C14.6444 23.3337 15.1667 22.8113 15.1667 22.167C15.1667 21.5227 14.6444 21.0003 14 21.0003C13.3557 21.0003 12.8334 21.5227 12.8334 22.167C12.8334 22.8113 13.3557 23.3337 14 23.3337Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                            </p>

                                            {/* Menu */}
                                            {openDropdown === item.id && (
                                                <div className="absolute right-0 mt-2 w-40 bg-[#1E1E1E] border border-gray-700 rounded-md shadow-lg z-50">
                                                    <div className="py-1">
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
        </>
    )
}
