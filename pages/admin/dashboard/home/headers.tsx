/* eslint-disable no-underscore-dangle */
import AdminLayout from '@/components/admin/layout'
import Header from '@/models/home/Header';
import db from '@/utils/db';
import React, { useState } from 'react'
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import ListDisplay from '@/components/admin/home/header/listDisplay';

interface MediaProps {
    url: string;
    public_url: string;
}

interface HeaderProps {
    title: { en: "", fr: "" },
    description: { en: "", fr: "" },
    images: MediaProps[],
    alt: string,
    video?: MediaProps[],
    url: string,
    _id: string
}
type HeaderTypes = {
    headers: HeaderProps[];
}
const Headers: React.FC<HeaderTypes> = ({ headers }) => {

    const [data, setData] = useState<HeaderProps[]>(headers)
    return (
        <AdminLayout>
            <div className="bg-white text-black mt-[30px] px-[2.25rem] py-[20px]">
                <div className="flex items-center justify-between">
                    <form action="">
                        <div className="flex gap-2 items-center relative ">
                            <FaSearch className='absolute top-1/2 transform -translate-y-1/2 left-2' />
                            <input type="text" className='bg-[#f9f9f9] py-[8px] pl-[3rem] pr-[10px] w-[250px] border border-[#f9f9f9] outline-none rounded-[4px]'
                                placeholder='Search for category'
                            />
                        </div>
                    </form>
                    <div className="">
                        <Link href="/admin/dashboard/createcategory" className='py-[7.5px] px-[30px] bg-[#1b84ff] rounded-[5px] text-white'>
                            Add Category
                        </Link>
                    </div>
                </div>
                <Table className='mt-[40px]'>
                    <TableHeader>
                        <TableRow className='uppercase text-[12px] font-semibold text-[#99a1b7] w-full'>
                            <TableHead className="w-[50%] p-0 flex items-center gap-8">
                                <div className={`w-[22px] h-[22px] rounded-[5px] cursor-pointer border border-borderColor bg-[#f1f1f1]`} />
                                Media ( Video / Image )
                            </TableHead>
                            <TableHead className='w-[25%] p-0'>Title</TableHead>
                            <TableHead className='w-[10%] p-0'>status</TableHead>
                            <TableHead className='w-[15%] p-0'>action</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                {data?.length < 1 ? (
                    <div className="p-[40px] flex items-center justify-center gap-2 ">
                        You have no headers <Link href="/admin/dashboard/home/header" className='py-1.5 text-white px-[30px] bg-blue-600 rounded-[3px]'>click here</Link> to create
                    </div>
                ) : (
                    <div className="">
                        {data?.map((header) => (
                            <ListDisplay
                                key={header._id}
                                header={header}
                                setHeaders={setData}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}

export default Headers

export async function getServerSideProps() {
    await db.connectDb();
    const allheaders = await Header.find({})
        .sort({ createdAt: -1 })
        .lean();
    await db.disconnectDb();
    return {
        props: {
            headers: JSON.parse(JSON.stringify(allheaders)),
        },
    };
}