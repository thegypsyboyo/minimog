import Link from 'next/link';
import React from 'react'
import { BiSolidCategory } from 'react-icons/bi';
import { BsFilter } from 'react-icons/bs';

const SubHeader = () => {
    console.log("");
    return (
        <div className='w-full flex justify-between' >
            <div className=''>
                <div className="flex items-center gap-2">
                    <BiSolidCategory className='text-blue-600 text-2xl' />
                    <h1 className="text-blue-600">Sub Categories</h1>
                </div>
                <ul className="flex gap-2 items-center text-sm mt-4">
                    <li className="">
                        Admin
                    </li>
                    <li className="h-[2px] w-[5px] bg-gray-500">
                        <span className=""></span>
                    </li>
                    <li className="">
                        Dashboard
                    </li>
                    <li className="h-[2px] w-[5px] bg-gray-500">
                        <span className=""></span>
                    </li>
                    <li className="">
                        Sub Category
                    </li>
                </ul>
            </div>
            <div className='flex gap-4 items-center'>
                <div className="px-[30px] py-[7.5px] bg-[#d1d] text-white text-center rounded-[5px] flex gap-1 items-center">
                    <BsFilter />
                    Filter
                </div>
                <div className="">
                    <Link href="" className='py-[7.5px] px-[30px] bg-[#1b84ff] rounded-[5px] text-white'>
                        Add Create
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default SubHeader