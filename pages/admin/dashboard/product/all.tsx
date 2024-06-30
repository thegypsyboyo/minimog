/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import AdminLayout from '@/components/admin/layout';
import ProductCard from '@/components/admin/product/list';
import ProductHeader from '@/components/admin/product/productHeader';
import Category from '@/models/Category';
import Product from '@/models/Product';
import db from '@/utils/db';
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React from 'react'
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';

interface QuestionsProps {
    question: string;
    answer: string;
}
interface DetailsProps {
    value: string;
    name: string;
    _id: string;
}
interface CategoryProps {
    _id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface SubCategoryProps {
    _id: string;
    name: string;
    slug: string;
    parent: CategoryProps[];

}
interface Size {
    size: string;
    qty: number;
    price: number;
    _id: string;
}
interface ImageProps {
    url: string;
    public_url: string;
}
interface SubProduct {
    images: ImageProps[];
    description_images: any[];
    color: {
        color: string;
        image: string;
    };
    sizes: Size[];
    discount: number;
    _id: string;
    sku?: string;
}
export interface ProductProps {
    _id: string;
    name: string;
    description: string;
    brand: string;
    slug: string;
    subProducts: SubProduct[];
    category: CategoryProps[];
    createdAt: string;
    updatedAt: string;
    details: DetailsProps[];
    questions: QuestionsProps[];
    subCategories: SubCategoryProps[];

}

type ProductTypes = {
    products: ProductProps[];
}

const AllProducts: React.FC<ProductTypes> = ({ products }) => (

    <div>

        <AdminLayout>
            <ProductHeader />
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
                            <TableHead className="w-[100%] p-0 flex items-center gap-8">
                                <div className={`w-[22px] h-[22px] rounded-[5px] cursor-pointer border border-borderColor bg-[#f1f1f1]`} />
                                Product
                            </TableHead>
                            <TableHead className='w-[15%] p-0'>Sku</TableHead>
                            <TableHead className='w-[15%] p-0'>qty</TableHead>
                            <TableHead className='w-[15%] p-0'>price</TableHead>
                            <TableHead className='w-[15%] p-0'> status</TableHead>
                            <TableHead className='w-[12%] p-0'>action</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>

        </AdminLayout>
    </div>
)



export default AllProducts

export async function getServerSideProps() {
    await db.connectDb();
    const products = await Product.find({})
        .populate({ path: "category", model: Category })
        .sort({ createdAt: -1 })
        .lean();
    await db.disconnectDb();
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}