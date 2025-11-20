import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function GlobalTable({ columns, data }) {
    return (


        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
            <Table className='border border-(--grey1) '>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow className='bg-[#FFFFFF1F] border-b border-[#FFFFFF1F] hover:bg-[#FFFFFF1F]'>
                        <TableHead className="text-white font-medium text-[12px]">ID</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Fiscal Invoice no.</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Nett</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Vatt</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Total</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Payment Method</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Client Name</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Address</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Phone Number</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Client VAT</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Client TIN</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Product </TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Subcategory</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Main Category</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Unit number</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Unit Type</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Date of travel</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Date of payment</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Client Type</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Notes</TableHead>
                        <TableHead className="text-white font-medium text-[12px]">Payment Status</TableHead>
                        <TableHead className="text-white font-medium text-[12px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className='bg-[#FFFFFF0F] border-t border-[#FFFFFF1F] hover:bg-[#f5f5f536]'>
                        <TableCell className='text-white text-[12px] font-medium'>RN00001</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>648493</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>100</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>15</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>115</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>Cash</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>Bezi  Hotel</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>123 Apple Street</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>263787988479</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>40000007</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>30000008</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>Lodge</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>Lodge</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>Accomodation</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>4</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>Bed nights</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>3/9/2025</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>1/1/2025</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>Foreign</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>2 pax 3 nights</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>Paid</TableCell>
                        <TableCell className='text-white text-[12px] font-medium'>ss</TableCell>
                    </TableRow>



                </TableBody>
            </Table>
        </ScrollArea>
    )
}
