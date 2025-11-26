'use client'
import { Button } from "@/components/ui/button"
import { useHotels } from "@/context/HotelContext"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



export default function Header() {

    const { setHotel, hotelData, setStep } = useHotels();

    return (
        <div className="text-white bg-(--dark1) h-[98px] p-3 border-b border-(--grey1) flex justify-between items-center rounded-t-2xl flex-row">
            <div className="relative">
                <svg className="absolute left-0 top-0 translate-3 " width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.5 24.5L17.5001 17.5M19.8333 11.6667C19.8333 16.177 16.177 19.8333 11.6667 19.8333C7.15634 19.8333 3.5 16.177 3.5 11.6667C3.5 7.15634 7.15634 3.5 11.6667 3.5C16.177 3.5 19.8333 7.15634 19.8333 11.6667Z" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input type="text" className="rounded-2xl pl-11 pr-3 w-[451px] h-[50px] bg-(--dark2) border border-(--grey1) " placeholder="Search" />
            </div>
            <div className="flex items-center gap-3">
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="cursor-pointer relative bg-[#FFFFFF05] w-14 h-14 flex items-center justify-center rounded-full shadow-[inset_0px_2px_8px_0px_#FFFFFF66]">
                                <div className="w-2 h-2 bg-[#ED3333] rounded-full absolute right-0 top-0 -translate-x-3 translate-y-3"></div>
                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.75 21.75V15.45C14.75 14.7966 14.75 14.4699 14.6228 14.2203C14.511 14.0008 14.3325 13.8223 14.113 13.7105C13.8634 13.5833 13.5367 13.5833 12.8833 13.5833H9.61667C8.96327 13.5833 8.63657 13.5833 8.38701 13.7105C8.16749 13.8223 7.98901 14.0008 7.87716 14.2203C7.75 14.4699 7.75 14.7966 7.75 15.45V21.75M0.75 5.41667C0.75 7.34966 2.317 8.91667 4.25 8.91667C6.183 8.91667 7.75 7.34966 7.75 5.41667C7.75 7.34966 9.317 8.91667 11.25 8.91667C13.183 8.91667 14.75 7.34966 14.75 5.41667C14.75 7.34966 16.317 8.91667 18.25 8.91667C20.183 8.91667 21.75 7.34966 21.75 5.41667M4.48333 21.75H18.0167C19.3235 21.75 19.9768 21.75 20.476 21.4957C20.915 21.272 21.272 20.915 21.4957 20.476C21.75 19.9769 21.75 19.3235 21.75 18.0167V4.48333C21.75 3.17654 21.75 2.52315 21.4957 2.02402C21.272 1.58498 20.915 1.22802 20.476 1.00432C19.9768 0.75 19.3235 0.75 18.0167 0.75H4.48333C3.17654 0.75 2.52315 0.75 2.02402 1.00432C1.58498 1.22802 1.22802 1.58498 1.00432 2.02402C0.75 2.52315 0.75 3.17654 0.75 4.48333V18.0167C0.75 19.3235 0.75 19.9769 1.00432 20.476C1.22802 20.915 1.58498 21.272 2.02402 21.4957C2.52315 21.75 3.17654 21.75 4.48333 21.75Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-9999 bg-(--dark1) text-white border border-(--grey1)"
                            side="bottom"
                            align="end" >
                            <DropdownMenuGroup >

                                {
                                    hotelData.map((hotel, i) => (
                                        <DropdownMenuItem onSelect={() => {
                                            setHotel(hotel.name)

                                            setStep("categories")
                                        }
                                        } key={i}>
                                            {hotel.name}
                                        </DropdownMenuItem>
                                    ))
                                }



                            </DropdownMenuGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="cursor-pointer relative bg-[#FFFFFF05] w-14 h-14 flex items-center justify-center rounded-full shadow-[inset_0px_2px_8px_0px_#FFFFFF66]">
                                <div className="w-2 h-2 bg-[#ED3333] rounded-full absolute right-0 top-0 -translate-x-3 translate-y-3"></div>
                                <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11.489 19.75H7.48903M15.489 6.75C15.489 5.1587 14.8569 3.63258 13.7317 2.50736C12.6065 1.38214 11.0803 0.75 9.48903 0.75C7.89773 0.75 6.37161 1.38214 5.24639 2.50736C4.12117 3.63258 3.48903 5.1587 3.48903 6.75C3.48903 9.84018 2.7095 11.956 1.8387 13.3554C1.10416 14.5359 0.736891 15.1261 0.750357 15.2908C0.765269 15.4731 0.803892 15.5426 0.950808 15.6516C1.08349 15.75 1.68162 15.75 2.87789 15.75H16.1002C17.2964 15.75 17.8946 15.75 18.0273 15.6516C18.1742 15.5426 18.2128 15.4731 18.2277 15.2908C18.2412 15.1261 17.8739 14.5359 17.1394 13.3554C16.2686 11.956 15.489 9.84019 15.489 6.75Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="z-50 w-80 bg-(--dark1) text-white border border-(--grey1) rounded-lg shadow-lg p-2 overflow-hidden"
                            side="bottom"
                            align="end"
                        >
                            <div className="flex justify-between items-center px-3 py-2 border-b border-(--grey2)">
                                <span className="font-semibold text-sm">Notifications</span>
                                <button className="text-(--grey2) hover:text-white text-sm cursor-pointer">Clear all</button>
                            </div>

                            <div className="max-h-64 overflow-y-auto py-2">
                                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 px-3 hover:bg-[#ffffff10] rounded-lg">
                                    <span className="text-sm font-medium">New comment on your post</span>
                                    <span className="text-xs text-(--grey2)">2 min ago</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 px-3 hover:bg-[#ffffff10] rounded-lg">
                                    <span className="text-sm font-medium">Your order has been shipped</span>
                                    <span className="text-xs text-(--grey2)">1 hr ago</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 px-3 hover:bg-[#ffffff10] rounded-lg">
                                    <span className="text-sm font-medium">New friend request</span>
                                    <span className="text-xs text-(--grey2)">3 hr ago</span>
                                </DropdownMenuItem>
                            </div>


                        </DropdownMenuContent>

                    </DropdownMenu>
                </div>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div
                                style={{ backgroundImage: "url('/images/layout/profile.webp')" }}
                                className="cursor-pointer relative bg-[#FFFFFF05] w-14 h-14 flex items-center justify-center rounded-full shadow-[inset_0px_2px_8px_0px_#FFFFFF66] bg-center bg-cover"
                            >
                            </div>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 z-9999 bg-(--dark1) text-white border border-(--grey1)"
                            side="bottom"
                            align="end">
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div >
    )
}