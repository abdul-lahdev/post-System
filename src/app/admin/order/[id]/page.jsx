'use client';

import { useParams } from 'next/navigation'
import { useCallback, useState } from "react";
import { orderData } from "@/app/constants/data";
import BackButton from "@/app/component/order/back-button";
import { Separator } from "@/components/ui/separator"

export default function Page() {

    const params = useParams();

    const order = orderData.find((item) => item.id === params.id);

    if (!order) {
        return <div className="text-white">Order not found</div>;
    }

    const [formData, setFormData] = useState({
        id: order.id,
        fiscVoice: order.fiscVoice,
        net: order.net,
        vat: order.vat,
        total: order.total,
        paymentMethod: order.paymentMethod,
        clientName: order.clientName,
        address: order.address,
        phone: order.phone,
        email: order.email,
        clientVat: order.clientVat,
        clientTIN: order.clientTIN,
        product: order.product,
        subCat: order.subCat,
        mainCat: order.mainCat,
        unitNo: order.unitNo,
        unitType: order.unitType,
        dateTravel: order.dateTravel,
        datePayment: order.datePayment,
        clientType: order.clientType,
        Notes: order.Notes,
        PaymentStatus: order.PaymentStatus,
    });

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("FORM SUBMITTED:", formData);
        alert("Form submitted! Check console.");
    };

    return (
        <div className="px-5 pt-8">
            <form onSubmit={handleSubmit}>


                <div className='flex justify-between'>
                    <div className="flex items-center gap-2">
                        <BackButton />
                        <h1 className="text-[32px] font-semibold uppercase text-white">ORDER VIEW</h1>
                    </div>
                    <button type='submit' className='text-white form-control px-8 cursor-pointer'>
                        Save
                    </button>
                </div>

                <div className="border border-(--grey1) p-4 rounded-2xl">

                    {/* GENERAL INFO */}
                    <div className="border border-(--grey1) rounded-[12px] p-4 bg-(--dark1)">

                        <div className="flex items-center justify-between">
                            <p className="text-[18px] font-normal text-white">{formData.id}</p>
                            <div className="bg-[#FFFFFF24] px-2 py-2 rounded-[6px] text-[18px] font-normal text-white">
                                Fiscal ID: {formData.fiscVoice}
                            </div>
                        </div>

                        <h1 className="text-[20px] font-medium text-white">General Info</h1>
                        <Separator className='bg-(--grey3) mt-3' />

                        <div className="grid grid-cols-2 gap-3">
                            <div className="mt-3">
                                <label className="block text-white text-[12px] mb-3">Name</label>
                                <input
                                    type="text"
                                    name="clientName"
                                    value={formData.clientName}
                                    onChange={handleChange}
                                    className="form-control rounded-xl bg-[#33333347] w-full text-(--grey4)"
                                />
                            </div>

                            <div className="mt-3">
                                <label className="block text-white text-[12px] mb-3">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="form-control rounded-xl bg-[#33333347] w-full text-(--grey4)"
                                />
                            </div>

                            <div className="mt-3">
                                <label className="block text-white text-[12px] mb-3">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control rounded-xl bg-[#33333347] w-full text-(--grey4)"
                                />
                            </div>

                            <div className="mt-3">
                                <label className="block text-white text-[12px] mb-3">Client Type</label>
                                <input
                                    type="text"
                                    name="clientType"
                                    value={formData.clientType}
                                    onChange={handleChange}
                                    className="form-control rounded-xl bg-[#33333347] w-full text-(--grey4)"
                                />
                            </div>

                            <div className="mt-3">
                                <label className="block text-white text-[12px] mb-3">Client VAT</label>
                                <input
                                    type="number"
                                    name="clientVat"
                                    value={formData.clientVat}
                                    onChange={handleChange}
                                    className="form-control rounded-xl bg-[#33333347] w-full text-(--grey4)"
                                />
                            </div>

                            <div className="mt-3">
                                <label className="block text-white text-[12px] mb-3">Client TIN</label>
                                <input
                                    type="number"
                                    name="clientTIN"
                                    value={formData.clientTIN}
                                    onChange={handleChange}
                                    className="form-control rounded-xl bg-[#33333347] w-full text-(--grey4)"
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <label className="block text-white text-[12px] mb-3">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="form-control rounded-xl bg-[#33333347] w-full text-(--grey4)"
                            />
                        </div>

                    </div>

                    {/* ORDER DETAILS */}
                    <div className="border border-(--grey1) rounded-[12px] p-4 bg-(--dark1) mt-6">

                        <h1 className="text-[20px] font-medium text-white">Order Details</h1>
                        <Separator className='bg-(--grey3) mt-3' />

                        <div className="grid grid-cols-2 gap-3 mt-3">
                            <div className="border border-(--grey1) rounded-[12px] p-4 bg-(--dark1)">

                                <div className="mt-3">
                                    <label className="block text-white text-[12px] mb-3">Category</label>
                                    <input
                                        type="text"
                                        name="mainCat"
                                        value={formData.mainCat}
                                        onChange={handleChange}
                                        className="form-control rounded-xl bg-[#33333347] w-full"
                                    />
                                </div>

                                <div className="mt-3">
                                    <label className="block text-white text-[12px] mb-3">Sub Category</label>
                                    <input
                                        type="text"
                                        name="subCat"
                                        value={formData.subCat}
                                        onChange={handleChange}
                                        className="form-control rounded-xl bg-[#33333347] w-full"
                                    />
                                </div>

                                <div className="mt-3">
                                    <label className="block text-white text-[12px] mb-3">Unit</label>
                                    <input
                                        type="number"
                                        name="unitNo"
                                        value={formData.unitNo}
                                        onChange={handleChange}
                                        className="form-control rounded-xl bg-[#33333347] w-full"
                                    />
                                </div>

                                <div className="mt-3">
                                    <label className="block text-white text-[12px] mb-3">Unit Type</label>
                                    <input
                                        type="text"
                                        name="unitType"
                                        value={formData.unitType}
                                        onChange={handleChange}
                                        className="form-control rounded-xl bg-[#33333347] w-full"
                                    />
                                </div>

                                <div className="mt-3">
                                    <label className="block text-white text-[12px] mb-3">Date of Travel</label>
                                    <input
                                        type="text"
                                        name="dateTravel"
                                        value={formData.dateTravel}
                                        onChange={handleChange}
                                        className="form-control rounded-xl bg-[#33333347] w-full"
                                    />
                                </div>

                                <div className="mt-3">
                                    <label className="block text-white text-[12px] mb-3">Date of Payment</label>
                                    <input
                                        type="text"
                                        name="datePayment"
                                        value={formData.datePayment}
                                        onChange={handleChange}
                                        className="form-control rounded-xl bg-[#33333347] w-full"
                                    />
                                </div>

                                <div className="mt-3">
                                    <label className="block text-white text-[12px] mb-3">Notes</label>
                                    <textarea
                                        name="Notes"
                                        value={formData.Notes}
                                        onChange={handleChange}
                                        className="border rounded-xl bg-[#3333334D] w-full h-[104px] p-3 resize-none text-white"
                                    />
                                </div>

                            </div>

                            {/* RIGHT TABLE PART — untouched (static for now) */}
                            <div className="border border-(--grey1) rounded-[12px] p-4 bg-(--dark1)">
                                <table className="border-separate border-spacing-y-3 w-full">
                                    <thead>
                                        <tr className="border-b border-(--grey1)">
                                            <td className="text-white text-[20px]">Item</td>
                                            <td className="text-white text-[20px]">Qty</td>
                                            <td className="text-white text-[20px]">Price</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {[1, 2, 3].map((i) => (
                                            <tr key={i} className="bg-[#33333399]">
                                                <td className="py-3 pl-4 rounded-l-2xl">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-[72px] h-[45px] rounded-xl bg-[url(/images/order/item.webp)] bg-cover"></div>
                                                        <div>
                                                            <h2 className="text-white text-[16px]">Lodge - <span className="text-[#FFFFFFB2]">Bed nights</span></h2>
                                                            <p className="text-[#ABBBC2]">$ 2.29</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="bg-[#FFFFFF1A] rounded-2xl h-9 text-white w-7 flex items-center justify-center">1</div>
                                                </td>
                                                <td className="rounded-r-2xl">
                                                    <p className="text-white">$ 4,58</p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                    <tfoot>
                                        <tr>
                                            <td className="py-2 pl-4 text-white">Type</td>
                                            <td></td>
                                            <td className="text-white text-end">
                                                <div className="bg-[#333333CC] h-8 rounded-xl flex items-center justify-center">
                                                    Payment
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="py-2 pl-4 text-white">Payment Method</td>
                                            <td></td>
                                            <td className="text-white text-end">
                                                <div className="bg-[#333333CC] h-8 rounded-xl flex items-center justify-center">
                                                    Card
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="py-2 pl-4 text-white">Sub total</td>
                                            <td></td>
                                            <td className="py-2 pl-4 text-white text-end">
                                                $ 21,03
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="py-2 pl-4 text-white">VAT</td>
                                            <td></td>
                                            <td className="py-2 pl-4 text-white text-end">
                                                12%
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="py-2 pl-4 text-white">Total</td>
                                            <td></td>
                                            <td className="py-2 pl-4 text-white text-end">
                                                $ 32,03
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
}
