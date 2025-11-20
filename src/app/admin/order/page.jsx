'use client'
import { useState } from "react"
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import RevenueChart from "@/app/component/dashboard/revenue-chart"

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
} from "@/components/ui/table"

import {orderData} from "@/app/constants/data"   

export default function Page(){
    
    const [objData,setObjData]=useState(orderData)

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


    return(
        <>
        <div className="text-white px-5 pt-8">

            <div className="flex items-center justify-between">
                <h1 className="text-[32px] font-semibold uppercase">Orders</h1>
                <button className="bg-[#FFFFFF29] border border-[#FFFFFF3D] ">ss</button>
            </div>
        
            <Table className='mt-8'>
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
                        <TableRow key={item.id} className='bg-[#FFFFFF0F] border-t border-[#FFFFFF1F] hover:bg-[#f5f5f536]'>
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
                            <TableCell className='text-white text-[12px] font-medium py-4 text-center'>{item.PaymentStatus}</TableCell>
                            <TableCell className='text-white text-[12px] font-medium py-4 text-center'>ss</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* ---------------- Pagination UI ---------------- */}
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
