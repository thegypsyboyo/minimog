/* eslint-disable no-underscore-dangle */
import React from 'react'
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ListItem from './listItem';

interface Props {
    _id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

type CatProps = {
    categories: Props[];
    setSubCategories: any;
}

const ListCategories: React.FC<CatProps> = ({ categories, setSubCategories }) => (
    <div className='bg-white text-black mt-[30px] px-[2.25rem] py-[20px]'>
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
                <TableRow className='uppercase text-[12px] font-semibold text-[#99a1b7]'>
                    <TableHead className="w-[60%] p-0 flex items-center gap-12">
                        <div className={`w-[22px] h-[22px] rounded-[5px] cursor-pointer border border-borderColor bg-[#f1f1f4]`} />
                        <span className=''>
                            Category
                        </span>
                    </TableHead>
                    <TableHead className='w-[20%] p-0'>Category type</TableHead>
                    <TableHead className='w-[20%] p-0'>Action</TableHead>
                </TableRow>
            </TableHeader>
        </Table>
        <ul className='mt-[20px]'>
            {categories?.map((cat) => (
                <ListItem
                    category={cat}
                    setSubCategories={setSubCategories}
                    key={cat._id}
                />
            ))}
        </ul>
    </div>
)

export default ListCategories