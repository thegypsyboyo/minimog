import React from 'react'
import { useSelector } from 'react-redux';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImUsers } from "react-icons/im";
import Link from 'next/link';
import { FaCompressArrowsAlt, FaThList } from 'react-icons/fa';
import { IoCreate, IoListCircleSharp } from 'react-icons/io5';
import { MdOutlineCategory } from "react-icons/md";
import { BsPatchPlus } from 'react-icons/bs';
import { BiSolidCategory } from "react-icons/bi";
import {
    RiCoupon3Fill,
    RiLayout4Fill,
    // RiLogoutCircleFill,
    // RiSettingsLine,
} from "react-icons/ri";
import { AiOutlineStock } from 'react-icons/ai';
// import {
//     ChevronLeft,
//     Home,
//     LineChart,
//     Package,
//     Package2,
//     PanelLeft,
//     PlusCircle,
//     Search,
//     Settings,
//     ShoppingCart,
//     Upload,
//     Users2,
// } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     BreadcrumbLink,
//     BreadcrumbList,
//     BreadcrumbPage,
//     BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import { Textarea } from "@/components/ui/textarea"
// import {
//     ToggleGroup,
//     ToggleGroupItem,
// } from "@/components/ui/toggle-group"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { LucideLayoutDashboard } from 'lucide-react';

const Sibebar = () => {
    const router = useRouter();
    const route = router.pathname.split("/admin/dashboard/")[1];

    console.log("route:", route)
    const { data: session } = useSession();
    // const dispatch = useDispatch();
    const { expandSidebar } = useSelector((state) => ({ ...(state as Record<string, any>) }));
    const expand = expandSidebar.expandSidebar;
    // const handleExpand = () => {
    //     dispatch(toggleSidebar());
    // };
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // const toggleDropdown = () => {
    //     setIsDropdownOpen(prevState => !prevState);
    // };

    return (
        <div className={`fixed h-full md:block hidden min-h-screen  transition-all  duration-200 ease-in ${expand ? "w-[250px]" : "80px"}`}>
            <div className={`transition-all h-[70px] w-full flex items-center duration-100 ease-in justify-center border-b border-b-[#eae8f1] px-[20px] ${expand ? "!w-[250px]" : "!w-[80px]"}`}>
                {expand ? (
                    <Image
                        src={"/images/logo.png"}
                        width={1200}
                        height={1200}
                        alt='logo'
                        className='w-[140px] h-auto object-contain'
                    />

                ) : (
                    <Image
                        src={"/favicon.png"}
                        width={900}
                        height={900}
                        alt='logo'
                        className='w-[30px] h-[30px] object-contain'
                    />
                )}
            </div>
            <nav className={`relative h-screen  overflow-y-hidden hover:overflow-y-auto border-solid border-transparent border-r-[4px] hover:border-r-0 ${expand ? "w-[250px]" : "80px"}`}>
                <ul className="w-full flex text-base  flex-col gap-5 px-[20px] ">
                    <li className="mt-4 mb-9">
                        {expand ? (
                            <div className='pt-0 mt-0 w-full flex flex-col justify-center  items-center cursor-pointer gap-5'>
                                <div className="w-fit relative">
                                    <Avatar className='w-14 h-14 object-cover rounded-full border-solid border-[2px] shadow-main border-[#eae8f1]'>
                                        <AvatarImage src={`${session?.user?.image}`} alt="user-image" className='rounded-full' />
                                        <AvatarFallback>Adm</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute w-[10px] h-[10px] rounded-full bg-[#22c03c] transform -translate-y-1/2 top-[45px] -right-[1px]" />
                                </div>
                                <div className="flex justify-between items-start">
                                    <div className="">
                                        <h1 className='text-black text-lg font-medium capitalize p-0 leading-0 m-0'>{`${session?.user?.name}`}</h1>
                                        <h2 className='text-[#7987a1] text-xs font-medium lowercase p-0 leading-0 m-0 w-[90px] '>{`${session?.user?.email}`}</h2>
                                    </div>
                                    <Image
                                        src={"/images/bluetick.png"}
                                        width={90}
                                        height={90}
                                        alt='logo'
                                        className='w-[30px] h-[30px] object-cover'
                                    />
                                </div>

                            </div>

                        ) : (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="#"
                                    >
                                        <Avatar>
                                            <AvatarImage src={`${session?.user?.image}`} alt="user-image" className='rounded-full' />
                                            <AvatarFallback>Admin</AvatarFallback>
                                        </Avatar>
                                        <span className="sr-only">Admin</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className='bg-white'>Admin Profile</TooltipContent>
                            </Tooltip>
                        )}
                    </li>
                    <li className={`${route === undefined ? "text-blue-500 text-lg" : ""} mt-0`}>
                        {expand ? (
                            <Link href="/admin/dashboard" >
                                <div className={`flex justify-between items-center w-full `}>
                                    <div className="flex gap-3 items-center">
                                        <RiLayout4Fill className={"text-2xl"} />
                                        <span className={"text-sm font-medium"}>Dashboard</span>
                                    </div>
                                    <span className="bg-[#22c03c] text-xs w-2.5 flex items-center justify-center h-4 text-[#ecf0fa]">1</span>
                                    {/* <BsChevronRight className='text-base' /> */}
                                </div>
                            </Link>

                        ) :
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="#"
                                        className='flex items-center justify-center'
                                    >
                                        <LucideLayoutDashboard className={"text-base"} />                                        <span className="sr-only">Home</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className='bg-white'>Home</TooltipContent>
                            </Tooltip>
                        }
                    </li>
                    <li className={`${route === "sales" ? "text-blue-500 text-lg" : ""} mt-2`}>
                        {expand ? (
                            <Link href="/admin/dashboard/sales" >
                                <span className={`flex justify-between items-center`}>
                                    <span className={""}>Sales</span>
                                    <FaCompressArrowsAlt className={""} />
                                </span>
                            </Link>

                        ) :

                            // <Link href="/admin/dashboard/sales"
                            //     className='relative group flex flex-col justify-center items-center'>
                            //     <AiOutlineStock className='!text-2xl' />
                            //     <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px]'>Sales</span>
                            // </Link>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="/admin/dashboard/sales"
                                        className='flex items-center justify-center'
                                    >
                                        <AiOutlineStock className='!text-2xl' />
                                        <span className="sr-only">Sales</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className='bg-white'>Sales</TooltipContent>
                            </Tooltip>

                        }
                    </li>
                    <li className={`${route === "orders" ? "text-blue-500 text-lg" : ""} mt-2`}>
                        {expand ? (
                            <Link href="/admin/dashboard/orders" >
                                <span className={`flex justify-between items-center`}>
                                    <span className={""}>Orders</span>
                                    <IoListCircleSharp className={""} />
                                </span>
                            </Link>

                        ) :

                            // <Link href="/admin/dashboard/orders"
                            //     className='relative group flex flex-col justify-center items-center'>
                            //     <IoListCircleSharp className='!text-2xl' />
                            //     <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px]'>Orders</span>
                            // </Link>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="/admin/dashboard/orders"
                                        className='flex items-center justify-center'
                                    >
                                        <IoListCircleSharp className='!text-2xl' />
                                        <span className="sr-only">Orders</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right" className='bg-white'>Orders</TooltipContent>
                            </Tooltip>

                        }
                    </li>
                    <li className={`${route === "orders" ? "text-blue-500 text-lg" : ""} mt-2`}>
                        {expand ? (
                            <Link href="/admin/dashboard/orders" >
                                <span className={`flex justify-between items-center`}>
                                    <span className={""}>Users</span>
                                    <ImUsers className={""} />
                                </span>
                            </Link>

                        ) :

                            <Link href="/admin/dashboard/orders"
                                className='relative group flex flex-col justify-center items-center'>
                                <ImUsers className='!text-2xl' />
                                <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px]'>Users</span>
                            </Link>
                        }
                    </li>
                    <li className={`${route === "product/all" ? "text-blue-500 text-lg" : ""} mt-2`}>
                        {expand ? (
                            <Link href="/admin/product/all" >
                                <span className={`flex justify-between items-center`}>
                                    <span className={""}>All Products</span>
                                    <FaThList className={""} />
                                </span>
                            </Link>

                        ) :

                            <Link href="/admin/dashboard/product/all"
                                className='relative group flex flex-col justify-center items-center'>
                                <FaThList className='!text-2xl' />
                                <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px] min-w-[180px]'>All Products</span>
                            </Link>
                        }
                    </li>
                    <li className={`${route === "product/create" ? "text-blue-500 text-lg" : ""} mt-2`}>
                        {expand ? (
                            <Link href="/admin/dashboard/product/create" >
                                <span className={`flex justify-between items-center`}>
                                    <span className={""}>Create Product</span>
                                    <BsPatchPlus className={""} />
                                </span>
                            </Link>

                        ) :

                            <Link href="/admin/dashboard/product/create"
                                className='relative group flex flex-col justify-center items-center'>
                                <BsPatchPlus className='!text-2xl' />
                                <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px] min-w-[200px]'>Create Products</span>
                            </Link>
                        }
                    </li>
                    <li className={`${route === "categories" ? "text-blue-500 text-lg" : ""} mt-2`}>
                        {expand ? (
                            <Link href="/admin/dashboard/categories" >
                                <span className={`flex justify-between items-center`}>
                                    <span className={""}>Categories</span>
                                    <BiSolidCategory className={""} />
                                </span>
                            </Link>

                        ) :

                            <Link href="/admin/dashboard/categories"
                                className='relative group flex flex-col justify-center items-center'>
                                <BiSolidCategory className='!text-2xl' />
                                <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px] min-w-[200px]'>Categories</span>
                            </Link>
                        }
                    </li>
                    <li className={`${route === "createcategory" ? "text-blue-500 text-lg" : ""} mt-2`}>
                        {expand ? (
                            <Link href="/admin/dashboard/createcategory" >
                                <span className={`flex justify-between items-center`}>
                                    <span className={""}>Create Category</span>
                                    <IoCreate className={""} />
                                </span>
                            </Link>

                        ) :

                            <Link href="/admin/dashboard/createcategory"
                                className='relative group flex flex-col justify-center items-center'>
                                <IoCreate className='!text-2xl' />
                                <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px] min-w-[200px]'>Create Category</span>
                            </Link>
                        }
                    </li>
                    <li className={`${route === "subCategories" ? "text-blue-500 text-lg" : ""} mt-2`}>
                        {expand ? (
                            <Link href="/admin/dashboard/subCategories" >
                                <span className={`flex justify-between items-center`}>
                                    <span className={""}>Sub Categories</span>
                                    <MdOutlineCategory className={""} />
                                </span>
                            </Link>

                        ) :

                            <Link href="/admin/dashboard/categories"
                                className='relative group flex flex-col justify-center items-center'>
                                <MdOutlineCategory className='!text-2xl' />
                                <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px] min-w-[200px]'>Sub Categories</span>
                            </Link>
                        }
                    </li>
                    <li className={`${route === "coupons" ? "text-blue-500 text-lg" : ""} mt-2`}>
                        {expand ? (
                            <Link href="/admin/dashboard/coupons" >
                                <span className={`flex justify-between items-center`}>
                                    <span className={""}>Coupons</span>
                                    <RiCoupon3Fill className={""} />
                                </span>
                            </Link>

                        ) :

                            <Link href="/admin/dashboard/coupons"
                                className='relative group flex flex-col justify-center items-center'>
                                <RiCoupon3Fill className='!text-2xl' />
                                <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px] min-w-[200px]'>Coupons</span>
                            </Link>
                        }
                    </li>
                    <li className={`${route === "coupons" ? "text-blue-500 text-lg" : ""} mt-2`}>
                        {expand ? (
                            <Link href="/admin/dashboard/coupons" >
                                <span className={`flex justify-between items-center`}>
                                    <span className={""}>Coupons</span>
                                    <RiCoupon3Fill className={""} />
                                </span>
                            </Link>

                        ) :

                            <Link href="/admin/dashboard/coupons"
                                className='relative group flex flex-col justify-center items-center'>
                                <RiCoupon3Fill className='!text-2xl' />
                                <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px] min-w-[200px]'>Coupons</span>
                            </Link>
                        }
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Sibebar