import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BsArrowUp, BsFacebook, BsGift, BsInstagram } from 'react-icons/bs';
import { FaOpencart, FaRegUser, FaUserAlt } from "react-icons/fa";
import { MdLogout, MdOutlineChevronRight, MdOutlineLogin, MdSearch } from "react-icons/md";
import { GiSelfLove } from "react-icons/gi";


import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

interface CountryInfo {
    name: string;
    flag: string;
    // flag?: {
    //     emojitwo: string;
    // };
}

interface CurrencyInfo {
    code: string;
    name: string;
    symbol: string;
}

interface Props {
    country: CountryInfo | null;
    currency: CurrencyInfo | null;
}

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]
const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => (
    <li>
        <NavigationMenuLink asChild>
            <a
                ref={ref}
                className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    className
                )}
                {...props}
            >
                <div className="text-sm font-medium leading-none">{title}</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {children}
                </p>
            </a>
        </NavigationMenuLink>
    </li>
))
ListItem.displayName = "ListItem"

const Navbar = ({ currency, country }: Props) => {
    const [isMetaHeaderSticky, setIsMetaHeaderSticky] = useState<boolean>(false);
    const [showButton, setShowButton] = useState(false);
    const router = useRouter();
    const currentPath = router.asPath;

    console.log("currentpath:", currentPath)

    const { data: session } = useSession();
    const { cart } = useSelector((state) => ({ ...(state as Record<string, any>) }));

    console.log("Your Country Info:", country);
    console.log("Your Session:", session);
    const isBrowser = () => typeof window !== 'undefined';

    const scrollToTop = () => {
        if (!isBrowser()) return;

        const scrollStep = -window.scrollY / (1200 / 15); // 500 is the duration of the scroll animation in milliseconds
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15); // 15 is the interval in milliseconds for the animation
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isBrowser() && window.scrollY > 120) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        function handleScroll() {
            const metaHeader = document.querySelector(".meta-header-area") as HTMLElement;
            // const mainHeader = document.querySelector(".header-main-2") as HTMLElement;
            const currentScrollPosition = window.scrollY;
            const scrollThreshold = 10; // Adjust this threshold as needed

            if (currentScrollPosition > scrollThreshold) {
                setIsMetaHeaderSticky(true);
                metaHeader.style.display = "block";
            } else if (window.scrollY <= 0) { // check if the user has scrolled to the top of the page
                setIsMetaHeaderSticky(false);
                metaHeader.style.display = "block"; // show the meta header
            } else {
                setIsMetaHeaderSticky(false);
                metaHeader.style.display = "none";
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className='font-noto'>
            <header className='w-full bg-white text-white font-noto relative'>
                <div className='hidden header-top-area relative max-h-[40px] text-base py-[14px] pb-[14px] w-full border-b border-b-borderColor text-primaryForground z-10 lg:flex items-center'>
                    <Layout>
                        <div className="flex flex-row flex-wrap justify-between w-full ">
                            <div className="w-[33.333%]">
                                <div className="flex gap-5 items-center">
                                    <div className="flex items-center gap-2">
                                        <BsInstagram />
                                        <span className="text-sm">
                                            104.1K Followers
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <BsFacebook />
                                        <span className="text-sm">
                                            10.1K Followers
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[33.333%]">
                                <div className="w-full font-normal text-sm capitalize flex gap-2">
                                    <span className="relative flex items-center">Open Doors to a world of fashion |
                                    </span>
                                    <Link href={""} className='underline underline-offset-2'>Discover more</Link>
                                </div>
                            </div>
                            <div className="w-[33.333%]">
                                <div className="w-full flex items-center gap-4 justify-end">
                                    <div className="flex items-center gap-2">
                                        <div className="">
                                            <Image src={`${country?.flag}`} alt='flag' width={90} height={90} className='object-cover rounded-full h-6 w-6' />
                                        </div>
                                        <div className="text-sm font-normal capitalize">{country?.name} ({currency?.code} {currency?.symbol})</div>
                                    </div>
                                    <div className="">English</div>
                                </div>
                            </div>
                        </div>
                    </Layout>
                </div>
                <div className={`meta-header-area py-[20px] text-primaryForground !font-light z-10 relative bg-white ${isMetaHeaderSticky ? "bg-white  shadow-main" : ""} ${isMetaHeaderSticky ? "sticky z-[50]" : " "}`}>
                    <Layout>
                        <div className="w-full flex items-center">
                            <div className="flex items-center justify-between w-full ">
                                <div className="w-[41.667%]">
                                    <div className="w-full lg:block hidden">
                                        <NavigationMenu>
                                            <NavigationMenuList>
                                                <NavigationMenuItem>
                                                    <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                                                    <NavigationMenuContent>
                                                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] bg-white">
                                                            <li className="row-span-3">
                                                                <NavigationMenuLink asChild>
                                                                    <Link
                                                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                                        href="/"
                                                                    >
                                                                        <Image src={"/images/logo.png"} width={90} height={90} alt='logo' className=" object-contain" />
                                                                        <div className="mb-2 mt-4 text-lg font-medium">
                                                                            shadcn/ui
                                                                        </div>
                                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                                            Beautifully designed components that you can copy and
                                                                            paste into your apps. Accessible. Customizable. Open
                                                                            Source.
                                                                        </p>
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            </li>
                                                            <ListItem href="/docs" title="Introduction">
                                                                Re-usable components built using Radix UI and Tailwind CSS.
                                                            </ListItem>
                                                            <ListItem href="/docs/installation" title="Installation">
                                                                How to install dependencies and structure your app.
                                                            </ListItem>
                                                            <ListItem href="/docs/primitives/typography" title="Typography">
                                                                Styles for headings, paragraphs, lists...etc
                                                            </ListItem>
                                                        </ul>
                                                    </NavigationMenuContent>
                                                </NavigationMenuItem>
                                                <NavigationMenuItem>
                                                    <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                                                    <NavigationMenuContent>
                                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-white">
                                                            {components.map((component) => (
                                                                <ListItem
                                                                    key={component.title}
                                                                    title={component.title}
                                                                    href={component.href}
                                                                >
                                                                    {component.description}
                                                                </ListItem>
                                                            ))}
                                                        </ul>
                                                    </NavigationMenuContent>
                                                </NavigationMenuItem>
                                                <NavigationMenuItem>
                                                    <Link href="/docs" legacyBehavior passHref>
                                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                            Products
                                                        </NavigationMenuLink>
                                                    </Link>
                                                </NavigationMenuItem>
                                                <NavigationMenuItem>
                                                    <Link href="/docs" legacyBehavior passHref>
                                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                            Blogs
                                                        </NavigationMenuLink>
                                                    </Link>
                                                </NavigationMenuItem>
                                            </NavigationMenuList>
                                        </NavigationMenu>
                                    </div>
                                    <div className="w-auto lg:hidden block">
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
                                                        <div className="w-full flex items-center gap-4 justify-start">
                                                            <div className="flex items-center gap-2">
                                                                <div className="">
                                                                    <Image src={`${country?.flag}`} alt='flag' width={90} height={90} className='object-cover rounded-full h-6 w-6' />
                                                                </div>
                                                                <div className="text-sm font-normal capitalize">{country?.name} ({currency?.code} {currency?.symbol})</div>
                                                            </div>
                                                            <div className="">English</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SheetContent>
                                        </Sheet>
                                    </div>
                                </div>
                                <div className="w-[16.6667%]">
                                    <div className="w-full flex items-center justify-center">
                                        <Image src={"/images/logo.png"} width={140} height={140} alt='logo' className='object-contain' />
                                    </div>
                                </div>
                                <div className="w-[41.667%]">
                                    <div className="w-full flex items-center gap-0 justify-end">
                                        <div className="block">
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <Button variant="link" className='pt-0 mt-0'><MdSearch className='text-2xl' /></Button>
                                                </SheetTrigger>
                                                <SheetContent className="w-full h-[200px] py-[32px] bg-white font-noto" side={"top"}>
                                                    <Layout className='font-noto'>
                                                        content
                                                    </Layout>
                                                </SheetContent>
                                            </Sheet>
                                        </div>
                                        <div className="lg:block hidden relative">
                                            {session ? (
                                                <div className="block">
                                                    <div className="flex items-center gap-3">
                                                        <HoverCard>
                                                            <HoverCardTrigger asChild className='flex items-center'>
                                                                <div className='pt-0 mt-0 flex items-center place-content-center cursor-pointer'>
                                                                    <Avatar>
                                                                        <AvatarImage src={`${session.user?.image}`} alt="user-image" className='border-borderColor rounded-full border-[1.4px]' />
                                                                        <AvatarFallback>CN</AvatarFallback>
                                                                    </Avatar>
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
                                                                            <Avatar>
                                                                                <AvatarImage src={`${session.user?.image}`} alt="user-image" className=" bg-yellow-400" />
                                                                                <AvatarFallback>CN</AvatarFallback>
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
                                                                {session ? (
                                                                    <div className="w-full relative text-center text-black flex items-center justify-center text-lg gap-5 font-medium mt-8 cursor-pointer" onClick={() => signOut()}>
                                                                        <MdOutlineLogin />
                                                                        Login out
                                                                    </div>
                                                                ) : (
                                                                    <div className="border-t border-t-black/[80] mt-8">
                                                                        <div className="w-full relative text-center text-black flex items-center text-lg gap-5 font-medium mt-7 cursor-pointer bg-transparent border-solid border border-borderColor rounded-[5px] justify-center px-[20px] py-[10px] " onClick={() => signIn()}>
                                                                            <MdOutlineLogin />
                                                                            Sign In
                                                                        </div>
                                                                        <div className="w-full relative text-center text-white flex items-center text-base gap-5 font-normal mt-4 cursor-pointer bg-black border-solid border border-borderColor rounded-[5px] px-[20px]  justify-center py-[10px] ">
                                                                            <MdOutlineLogin />
                                                                            <Link href={`/signup?callbackUrl=${encodeURIComponent(currentPath)}`} className="absolute top-0 left-0 right-0 bottom-0 w-full h-full" />
                                                                            Sign Up
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </HoverCardContent>
                                                        </HoverCard>

                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                        <div className="lg:block hidden">
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <Button variant="link" className='pt-0 mt-0'><GiSelfLove className='text-2xl' /></Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="w-52 bg-white">
                                                    <div className="flex justify-between space-x-4">
                                                        <GiSelfLove className='text-2xl' />
                                                        <div className="space-y-1">
                                                            <h4 className="text-sm font-semibold">Your Wishlist</h4>
                                                            <p className="text-sm">
                                                                Check out your wish list if you have any
                                                            </p>
                                                        </div>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                        <div className="">
                                            <HoverCard>
                                                <HoverCardTrigger asChild className='mr-0 pr-0'>
                                                    <Button variant="link" className='pt-0 mt-0 hover:no-underline relative'>
                                                        <FaOpencart className='text-2xl' />
                                                        <span className='right-[-12px] w-[23px] h-[23px] bg-red-500 rounded-full top-[-6px] flex items-center justify-center text-white absolute'>{cart?.cartItems?.length}</span>
                                                    </Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="w-52 bg-white">
                                                    <div className="flex justify-between space-x-4">
                                                        <FaOpencart className='text-2xl' />
                                                        <div className="space-y-1">
                                                            <h4 className="text-sm font-semibold">Your Cart</h4>
                                                            {cart.cartItems?.length === 0 ? (

                                                                <p className="text-sm">
                                                                    Your cart is empty. Lets add something to cart.
                                                                </p>
                                                            ) : (
                                                                <p>{cart.cartItems?.length}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Layout>
                </div>
            </header>
            {showButton && (
                <div className="fixed w-[50px] h-[50px] z-20 text-center transition-all duration-300 rounded-full cursor-pointer bg-primaryForground ease-linear bottom-[40px] right-[40px]  flex items-center justify-center hover:transform hover:scale-110  text-white" onClick={scrollToTop}>
                    <BsArrowUp className='text-[25px]' />
                </div>
            )}
            <div className="pop-fixed gap-3 font-medium text-base !font-noto " >
                <BsGift className='' />
                get a discount
            </div>
            <Dialog>
                <DialogTrigger asChild className='font-noto'>
                    <div className="pop-fixed gap-3 font-medium text-base " >
                        <BsGift className='' />
                        get a discount
                    </div>
                </DialogTrigger>
                <Layout>

                    <DialogContent className="sm:max-w-[500px] bg-white py-[32px] px-[32px] font-noto !z-[999]">
                        <DialogTitle className="text-[26px] font-bold text-center w-full font-noto">Don&apos;t want to miss anything ?</DialogTitle>
                        <DialogDescription className="mt-[10px] text-base font-light text-center">
                            Be the first to see new arrivals, exclusive deals and much more
                        </DialogDescription>
                        <form className="mt-[20px] font-noto flex flex-col items-center justify-center">
                            <input type='email' placeholder='Enter your email' className='rounded-[4px] py-[10px] px-[12px] w-full border-solid border-borderColor text-base font-normal  border-[1px] outline-none' />
                            <button className='py-[10px] px-[30px] text-base bg-black text-white rounded-[3px] mt-[20px] mx-auto'>Subscribe now</button>
                        </form>
                    </DialogContent>
                </Layout>
            </Dialog>
        </main>
    )
}

export default Navbar