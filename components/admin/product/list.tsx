/* eslint-disable no-underscore-dangle */
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"

import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';


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
    product: ProductProps;
}

const ProductCard: React.FC<ProductTypes> = ({ product }) => {

    const router = useRouter();
    const handleRemove = async (id: string) => {
        try {
            const { data } = await axios.delete("/api/admin/product", {
                data: { id },
            });
            // setHeaders(data.categories);
            toast.success(data.message);
            router.reload()
        } catch (error: any) {
            toast.error(error.response.data.message)
        }

    }

    const handleEdit = () => {
        window.location.href = `/admin/dashboard/product/create?headerId=${product._id}`;
    };
    return (
        <Table className=''>
            <TableBody>
                <TableRow className='flex items-center my-6 overflow-x-auto'>
                    <TableCell className='m-0 w-[30%] p-0 pr-4 flex items-center gap-8'>
                        <div className={`w-[22px] h-[22px] rounded-[5px] cursor-pointer border border-borderColor bg-[#f1f1f4]`} />
                        <div className="w-fit flex items-center  gap-5">
                            <Swiper
                                slidesPerView={1}
                                className="!w-[45px] rounded-[4px] !h-[50px]"
                            >
                                {product.subProducts.map((p) => (
                                    <SwiperSlide key={p._id}>
                                        <div className={"w-full"}>
                                            <div className={"w-full"}>
                                                <Image
                                                    src={p.images[0].url}
                                                    alt=""
                                                    width={1200}
                                                    height={1200}
                                                    className='!w-[108px] h-full object-cover'
                                                />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="font-semibold text-sm text-gray-600 w-[calc(100%-45px)] pr-5">{product.name}</div>
                        </div>
                    </TableCell>
                    <TableCell className='pl-0 w-[15%]'>
                        <span className='font-medium'>01669009</span>
                    </TableCell>
                    <TableCell className='w-[15%] p-0'>
                        <div className="">{product.subProducts[0].sizes[0].qty}</div>
                    </TableCell>
                    <TableCell className='pl-0 w-[15%]'>
                        <div className="">{(product.subProducts[0].sizes[0].price).toFixed(2)} $</div>
                    </TableCell>
                    <TableCell className='w-[15%] p-0'>
                        <span className="bg-[#dfffea] text-[#17c653] py-[5px] px-[7px] rounded-[3px]">Published</span>
                    </TableCell>
                    <TableCell className='w-[12%]'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='bg-white'>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={handleEdit}
                                    className='cursor-pointer'
                                >
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => handleRemove(product._id)}
                                >Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>

    )
}


export default ProductCard