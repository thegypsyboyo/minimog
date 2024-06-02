import Layout from '@/components/layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toggleSidebar } from '@/store/ExpandSlice';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import { FaRegBell, FaPowerOff, FaRegUser, FaUserAlt } from 'react-icons/fa';
import { HiOutlineMenuAlt1 } from 'react-icons/hi';
import { MdLogout, MdOutlineChevronRight, MdOutlineMail, MdSearch } from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';

const AdminNavbar = () => {
    const dispatch = useDispatch();
    const { expandSidebar } = useSelector((state) => ({ ...(state as Record<string, any>) }));
    const expand = expandSidebar.expandSidebar;
    const { data: session } = useSession();
    const handleExpand = () => {
        dispatch(toggleSidebar());
    };
    return (
        <section className={`h-[70px] fixed !bg-white z-10 border-b border-b-[#eae8f1] flex items-center justify-between px-[20px] ${expand ? "w-full md:w-[calc(100%-250px)]" : "w-full md:w-[calc(100%-80px)]"}`}>
            <div className="flex items-center">
                <div className="w-fit md:block hidden cursor-pointer " onClick={() => handleExpand()}>
                    < HiOutlineMenuAlt1 className='text-2xl' />
                </div>
                <div className="w-auto md:hidden block">
                    <Sheet>
                        <SheetTrigger asChild className='lg:hidden'>
                            <div className="bar-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </SheetTrigger>
                        <SheetContent className="z-[99] bg-white lg:hidden w-full text-primaryForground" side={"left"} >
                            <div className="w-full h-full relative flex flex-col justify-between">
                                <ul className="">
                                    <li className="flex items-center">
                                        <Link href={""} className='flex items-center w-full justify-between py-[8px] px-[16px] relative'>
                                            <span>Home</span>
                                            <span className="flex items-center justify-center flex-grow-0 flex-shrink-0 basis-[48px] h-full min-h-[48px] cursor-pointer">
                                                <MdOutlineChevronRight className='text-2xl' />
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="flex items-center">
                                        <Link href={""} className='flex items-center w-full justify-between py-[8px] px-[16px] relative'>
                                            <span>Shop</span>
                                            <span className="flex items-center justify-center flex-grow-0 flex-shrink-0 basis-[48px] h-full min-h-[48px] cursor-pointer">
                                                <MdOutlineChevronRight className='text-2xl' />
                                            </span>
                                        </Link>
                                    </li>
                                    <li className="flex items-center">
                                        <Link href={""} className='flex items-center w-full justify-between py-[8px] px-[16px] relative'>
                                            <span>Collections</span>
                                            <span className="flex items-center justify-center flex-grow-0 flex-shrink-0 basis-[48px] h-full min-h-[48px] cursor-pointer">
                                                <MdOutlineChevronRight className='text-2xl' />
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                                <div className="w-full">
                                    <div className="mb-[15px] py-[16px] block w-full">
                                        <h2 className="text-[20px] font-medium mb-[24px] text-black">My Account</h2>
                                        <div className="w-full mb-[12px] bg-black px-[30px] py-[10px] rounded-[5px] relative text-center text-white cursor-pointer" onClick={() => signOut()} >
                                            Sign In
                                        </div>
                                        <div className="w-full px-[30px] py-[10px] rounded-[5px] text-center  border-[1px] border-solid border-primaryForground text-black relative cursor-pointer ">
                                            Sign Up
                                            {/* <Link href={""} className='absolute left-0 top-0 right-0 bottom-0' /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
                <div className="">
                    <form action="">
                        <div className="flex items-center">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="link"><MdSearch className='text-2xl' /></Button>
                                </SheetTrigger>
                                <SheetContent className="w-full h-[200px] py-[32px] bg-white font-noto" side={"top"}>
                                    <Layout className='font-noto'>
                                        content
                                    </Layout>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </form>
                </div>
            </div>
            <ul className="flex items-center gap-8">
                <li className="">
                    {session ? (
                        <div className="block">
                            <div className="flex items-center gap-3">
                                <HoverCard>
                                    <HoverCardTrigger asChild className='flex items-center'>
                                        <div className='pt-0 mt-0 flex items-center place-content-center cursor-pointer gap-5'>
                                            <div className="w-fit relative">
                                                <Avatar>
                                                    <AvatarImage src={`${session.user?.image}`} alt="user-image" className='rounded-full' />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <span className="absolute w-[10px] h-[10px] rounded-full bg-[#1bc4b4] transform -translate-y-1/2 top-1/2 -right-[3px]" />
                                            </div>
                                            <div className="flex flex-col h-[25px] justify-center place-content-center">
                                                <h3 className="text-primaryForground font-medium leading-[20px] text-sm flex items-center gap-2 h-fit">
                                                    Bonjour 👋,
                                                </h3>
                                                <h1 className='text-black text-xs font-medium capitalize p-0 leading-0 m-0 w-[90px] '>{`${session.user?.name}`}</h1>
                                            </div>

                                        </div>

                                    </HoverCardTrigger>
                                    <HoverCardContent className="min-w-[330px]  w-full  bg-white flex flex-col justify-between">
                                        <div className="">
                                            <h2 className="text-[18px] leading-10 font-medium mb-[24px] text-black border-b border-b-borderColor">My Account</h2>
                                            {session ? (
                                                <div className="flex items-center gap-5">
                                                    <Avatar className='relative'>
                                                        <AvatarImage src={`${session.user?.image}`} alt="user-image" className=" bg-yellow-400" />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                        <span className="absolute w-[10px] h-[10px] rounded-full bg-[#1bc4b4]"></span>
                                                    </Avatar>
                                                    <h3 className="text-primaryForground flex flex-col items-start font-normal ">
                                                        <span>Hi there,</span>
                                                        <span className="text-primaryForground capitalize font-medium text-sm">{session.user?.name}</span>
                                                    </h3>
                                                </div>
                                            ) : (
                                                <div className=""></div>
                                            )}
                                        </div>
                                        <div className="mt-6">
                                            <h3 className=" text-black underline underline-offset-2 text-[20px] font-medium">Welcome back to Minimog</h3>
                                            <p className="text-sm mt-2 max-w-[330px] ">Its really nice to have you back. use this menu to navigate with ease. Mimimog says thank you for choosing us</p>
                                            <ul className="w-full">
                                                <li className="relative py-3.5 flex gap-4 items-center text-base font-normal text-primaryForground   border-b-borderColor border-b  w-full">
                                                    <FaUserAlt />
                                                    <span className="">Profile</span>
                                                </li>
                                                <li>
                                                    <Link href="/profile">Account</Link>
                                                </li>
                                                <li>
                                                    <Link href="/profile/orders">My Orders</Link>
                                                </li>
                                                <li>
                                                    <Link href="/profile/messages">Message Center</Link>
                                                </li>
                                                <li>
                                                    <Link href="/profile/address">Address</Link>
                                                </li>
                                                <li>
                                                    <Link href="/profile/whishlist">Whishlist</Link>
                                                </li>
                                            </ul>
                                        </div>
                                        {session ? (
                                            <div className="w-full relative text-center text-black flex items-center text-lg gap-5 font-medium mt-8 bg-transparent border border-borderColor rounded-[5px] justify-center py-[10px] px-[20px] hover:bg-black hover:text-white transition-all duration-300 ease-in  cursor-pointer" onClick={() => signOut()}>
                                                <MdLogout />
                                                Sign out
                                            </div>
                                        ) : (
                                            <div className="">
                                                <div className="w-full mb-[12px] bg-black px-[30px] py-[10px] rounded-[5px] relative text-center text-white">
                                                    Login
                                                    <Link href={""} className='absolute left-0 top-0 right-0 bottom-0' />
                                                </div>
                                                <div className="w-full px-[30px] py-[10px] rounded-[5px] text-center  border-[1px] border-solid border-primaryForground text-black relative ">
                                                    Register
                                                    <Link href={""} className='absolute left-0 top-0 right-0 bottom-0' />
                                                </div>
                                            </div>
                                        )}
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        </div>
                    ) : (
                        <Link href="" className="block">
                            <div className="flex items-center gap-3">
                                <HoverCard>
                                    <HoverCardTrigger asChild>
                                        <Button variant="link" className='pt-0 mt-0 flex gap-4 items-center outline-none !no-underline '>
                                            <FaRegUser className='text-2xl' />
                                            <div className="flex items-start flex-col">
                                                <h3 className="text-primaryForground font-medium leading-[20px] text-sm">New here?</h3>
                                                <span className='text-black text-sm font-medium'>Sign In / Register</span>
                                            </div>
                                        </Button>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="min-w-72  w-full  bg-white flex flex-col justify-between">
                                        <div className="">
                                            <h2 className="text-[18px] leading-10 font-medium mb-[24px] text-black border-b border-b-borderColor">My Account</h2>
                                        </div>
                                        <div className="mt-0">
                                            <h3 className="font-medium text-black text-lg underline underline-offset-2">Hello and Welcome to Minimog</h3>
                                            <p className="mt-2 text-sm font-normal max-w-[330px] ">For maximum experience please create an account with us. Once you have creeated one, an email will be sent to your email for verification. Mimimog awaits your application.</p>

                                        </div>
                                    </HoverCardContent>
                                </HoverCard>

                            </div>
                        </Link>
                    )}
                </li>
                <li>
                    <MdOutlineMail className='text-2xl' />
                </li>
                <li>
                    <FaRegBell className='text-2xl' />
                </li>
                <li>
                    <FaPowerOff className='text-2xl' />
                </li>
            </ul>
        </section>
    )

}

export default AdminNavbar