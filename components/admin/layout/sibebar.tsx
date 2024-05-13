import React from 'react'
import { useSelector } from 'react-redux';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImUsers } from "react-icons/im";
import Link from 'next/link';
import { FaHome, FaThList } from 'react-icons/fa';
import { IoCreate, IoListCircleSharp } from 'react-icons/io5';
import { MdOutlineCategory } from "react-icons/md";
import { BsPatchPlus } from 'react-icons/bs';
import { BiSolidCategory } from "react-icons/bi";
import {
    RiCoupon3Fill,
    // RiLogoutCircleFill,
    // RiSettingsLine,
} from "react-icons/ri";
import { AiOutlineStock } from 'react-icons/ai';


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
        <div className={`fixed h-full md:block hidden min-h-screen w-[80px] transition-all  duration-200 ease-in bg-white ${expand ? "w-[280px]" : ""}`}>
            <div className={`transition-all h-[70px] w-full flex items-center duration-100 ease-in justify-start px-[20px]`}>
                {expand ? (
                    <Image
                        src={"/images/logo.png"}
                        width={1200}
                        height={1200}
                        alt='logo'
                        className='w-[160px] h-auto object-contain'
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
            <nav className="w-full relative h-screen  overflow-y-hidden hover:overflow-y-auto ">
                <ul className="w-full flex flex-col gap-5 px-[20px] ">
                    <li className="mt-4">
                        {expand ? (
                            <div className='pt-0 mt-0 w-full flex items-center cursor-pointer gap-5'>
                                <div className="w-fit relative">
                                    <Avatar>
                                        <AvatarImage src={`${session?.user?.image}`} alt="user-image" className='rounded-full' />
                                        <AvatarFallback>Adm</AvatarFallback>
                                    </Avatar>
                                    <span className="absolute w-[10px] h-[10px] rounded-full bg-[#1bc4b4] transform -translate-y-1/2 top-1/2 -right-[3px]" />
                                </div>
                                <div className="flex justify-between items-start">
                                    <div className="">
                                        <h1 className='text-black text-base font-medium capitalize p-0 leading-0 m-0'>{`${session?.user?.name}`}</h1>
                                        <h2 className='text-black text-xs font-medium lowercase p-0 leading-0 m-0 w-[90px] '>{`${session?.user?.email}`}</h2>
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
                            <div className='relative group '>
                                <Avatar>
                                    <AvatarImage src={`${session?.user?.image}`} alt="user-image" className='rounded-full' />
                                    <AvatarFallback>Admin</AvatarFallback>
                                </Avatar>
                                <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px]'>Admin</span>
                            </div>
                        )}
                    </li>

                    <li className={`${route === undefined ? "text-blue-500 text-lg" : ""} mt-5`}>
                        {expand ? (
                            <Link href="/admin/dashboard" >
                                <span className={`flex justify-between items-center`}>
                                    <span className={"text-base"}>Dashboard</span>
                                    <FaHome className={""} />
                                </span>
                            </Link>

                        ) :

                            <div className='relative group flex flex-col justify-center items-center'>
                                <FaHome className='!text-2xl' />
                                <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px]'>Dashboard</span>
                            </div>
                        }
                    </li>
                    <li className={`${route === "sales" ? "text-blue-500 text-lg" : ""} mt-2`}>
                        {expand ? (
                            <Link href="/admin/dashboard/sales" >
                                <span className={`flex justify-between items-center`}>
                                    <span className={""}>Sales</span>
                                    <AiOutlineStock className={""} />
                                </span>
                            </Link>

                        ) :

                            <Link href="/admin/dashboard/sales"
                                className='relative group flex flex-col justify-center items-center'>
                                <AiOutlineStock className='!text-2xl' />
                                <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px]'>Sales</span>
                            </Link>
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

                            <Link href="/admin/dashboard/orders"
                                className='relative group flex flex-col justify-center items-center'>
                                <IoListCircleSharp className='!text-2xl' />
                                <span className='absolute top-1/2 transform -translate-y-1/2 group-hover:left-full left-0 opacity-0 group-hover:opacity-100 transition-all duration-100 ease-in px-[40px] h-[70px] bg-white flex items-center justify-center ml-[20px]'>Orders</span>
                            </Link>
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
                            <Link href="/admin/dashboard/orders" >
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

                    {/* <li className='transition-all duration-300 ease-linear'>
                        <button onClick={toggleDropdown} className='flex items-center justify-between w-full transition-all duration-300 ease-in'>
                            Products
                            <span className='flex items-center gap-2 text-base'>
                                {isDropdownOpen ? <MdKeyboardArrowDown /> : <MdKeyboardArrowLeft />}
                                <FaCartShopping className='!text-[14px]' />
                            </span>
                        </button>
                        {isDropdownOpen && (
                            <ul className='transition-all duration-300 p-2 list-disc list-inside font-base text-sm' >
                                <li className='hover:text-blue-600'>
                                    <Link href={"/admin/dashboard/create"}>
                                        Add product
                                    </Link>
                                </li>
                                <li>Edit Product</li>
                                <li>Product Details</li>
                            </ul>
                        )}
                    </li> */}
                </ul>
            </nav>
        </div>
    )
}

export default Sibebar