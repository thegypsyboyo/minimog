import React, { useEffect, useState } from 'react'
import Layout from '@/components/layout';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BsArrowUp, BsFacebook, BsInstagram } from 'react-icons/bs';
import { FaOpencart, FaRegUser } from "react-icons/fa";
import { MdOutlineChevronRight, MdSearch } from "react-icons/md";
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

import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';


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

const Navbar = () => {
    const [isMetaHeaderSticky, setIsMetaHeaderSticky] = useState<boolean>(false);
    const [showButton, setShowButton] = useState(false);


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
        <>
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
                                            <Image src={"https://th.bing.com/th/id/OIP.rmdwzuRtfkXzIKegAYsqJgHaEK?rs=1&pid=ImgDetMain"} alt='flag' width={90} height={90} className='object-cover rounded-full h-6 w-6' />
                                        </div>
                                        <div className="text-sm font-normal">Kenya (KES Sh)</div>
                                    </div>
                                    <div className="">English</div>
                                </div>
                            </div>
                        </div>
                    </Layout>
                </div>
                <div className={`meta-header-area py-[20px] text-primaryForground !font-light z-10 relative bg-white ${isMetaHeaderSticky ? "bg-white " : ""} ${isMetaHeaderSticky ? "sticky" : " "}`}>
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
                                                            <div className="w-full mb-[12px] bg-black px-[30px] py-[10px] rounded-[5px] relative text-center text-white">
                                                                Login
                                                                <Link href={""} className='absolute left-0 top-0 right-0 bottom-0' />
                                                            </div>
                                                            <div className="w-full px-[30px] py-[10px] rounded-[5px] text-center  border-[1px] border-solid border-primaryForground text-black relative ">
                                                                Register
                                                                <Link href={""} className='absolute left-0 top-0 right-0 bottom-0' />
                                                            </div>
                                                        </div>
                                                        <div className="w-full flex items-center gap-4 justify-start">
                                                            <div className="flex items-center gap-2">
                                                                <div className="">
                                                                    <Image src={"https://th.bing.com/th/id/OIP.rmdwzuRtfkXzIKegAYsqJgHaEK?rs=1&pid=ImgDetMain"} alt='flag' width={90} height={90} className='object-cover rounded-full h-6 w-6' />
                                                                </div>
                                                                <div className="text-sm font-normal">Kenya (KES Sh)</div>
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
                                    <div className="w-full">
                                        <Image src={"/images/logo.png"} width={100} height={100} alt='logo' />
                                    </div>
                                </div>
                                <div className="w-[41.667%]">
                                    <div className="w-full flex gap-0 justify-end">
                                        <div className="block">
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <Button variant="link" className='pt-0 mt-0'><MdSearch className='text-2xl' /></Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="w-52 bg-white">
                                                    <div className="flex justify-between space-x-4">
                                                        <GiSelfLove className='text-2xl' />
                                                        <div className="space-y-1">
                                                            <h4 className="text-sm font-semibold">Your Search</h4>
                                                            <p className="text-sm">
                                                                Search for anything here ...
                                                            </p>
                                                        </div>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        </div>
                                        <div className="lg:block hidden">
                                            <HoverCard>
                                                <HoverCardTrigger asChild>
                                                    <Button variant="link" className='pt-0 mt-0'><FaRegUser className='text-2xl' /></Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="w-52 bg-white">
                                                    <div className="flex justify-between space-x-4">
                                                        <FaRegUser className='text-2xl' />
                                                        <div className="space-y-1">
                                                            <h4 className="text-sm font-semibold">Your Account</h4>
                                                            <p className="text-sm">
                                                                Check out your account
                                                            </p>
                                                        </div>
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
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
                                                    <Button variant="link" className='pt-0 mt-0'><FaOpencart className='text-2xl' /></Button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className="w-52 bg-white">
                                                    <div className="flex justify-between space-x-4">
                                                        <FaOpencart className='text-2xl' />
                                                        <div className="space-y-1">
                                                            <h4 className="text-sm font-semibold">Your Cart</h4>
                                                            <p className="text-sm">
                                                                Check out your cart items
                                                            </p>
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
                <div className="fixed w-[50px] h-[50px] z-[99999999] text-center transition-all duration-300 rounded-full cursor-pointer bg-primaryForground ease-linear bottom-[40px] right-[40px]  flex items-center justify-center group hover:bg-yellowColor hover:w-[52px] hover:h-[52px] text-white" onClick={scrollToTop}>
                    <BsArrowUp className='text-[25px]' />
                </div>
            )}
        </>
    )
}

export default Navbar