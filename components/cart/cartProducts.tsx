/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BsHeart } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { updateCart } from '@/store/cartSlice';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Layout from '../layout';

// const invoices = [
//     {
//         invoice: "INV001",
//         paymentStatus: "Paid",
//         totalAmount: "$250.00",
//         paymentMethod: "Credit Card",
//     },
//     {
//         invoice: "INV002",
//         paymentStatus: "Pending",
//         totalAmount: "$150.00",
//         paymentMethod: "PayPal",
//     },
//     {
//         invoice: "INV003",
//         paymentStatus: "Unpaid",
//         totalAmount: "$350.00",
//         paymentMethod: "Bank Transfer",
//     },
//     {
//         invoice: "INV004",
//         paymentStatus: "Paid",
//         totalAmount: "$450.00",
//         paymentMethod: "Credit Card",
//     },
//     {
//         invoice: "INV005",
//         paymentStatus: "Paid",
//         totalAmount: "$550.00",
//         paymentMethod: "PayPal",
//     },
//     {
//         invoice: "INV006",
//         paymentStatus: "Pending",
//         totalAmount: "$200.00",
//         paymentMethod: "Bank Transfer",
//     },
//     {
//         invoice: "INV007",
//         paymentStatus: "Unpaid",
//         totalAmount: "$300.00",
//         paymentMethod: "Credit Card",
//     },
// ]


const CartProducts = ({ selected, setSelected, product }: any) => {
    console.log("PRoducts:", product);
    const [active, setActive] = useState();
    const { cart } = useSelector((state) => ({ ...state }))

    const dispatch = useDispatch();

    const updateQty = (type: any) => {
        const newCart = cart.catItems.map((p) => {
            if (p._uid == product._uid) {
                return {
                    ...p,
                    qty: type == "plus" ? product.qty + 1 : product.qty - 1,
                };
            }
            return p;
        });

        dispatch(updateCart(newCart));
    }

    const removeProduct = (id: any) => {
        const newCart = cart.cartItems.filter((p: any) => p._uid != id)
        dispatch(updateCart(newCart));
    }
    useEffect(() => {
        const check = selected.find((p) => p._uid == product._uid);
        setActive(check);
    }, [])
    return (
        <div className='relative flex flex-col gap-4'>
            <div>
                <div className="flex flex-col flex-wrap w-full">
                    {/* <div className="">check</div> */}
                    <div className="flex gap-5">
                        {/* <Image
                            src={product.images[0].url} alt=''
                            width={1400}
                            height={1400}
                            className='w-[120px] h-[150px] object-cover'
                        /> */}
                        {/* <div className="flex flex-col">
                            <div className="">
                                <h1 className="">
                                    {product.name.length > 30 ? `${product.name.substring(0, 30)} ...` : product.name}
                                </h1>
                                <div className="">
                                    <BsHeart />
                                </div>
                                <div className="">
                                    <AiOutlineDelete />
                                </div>
                                <div className={""}>
                                    <Image
                                        src={product.color.image}
                                        alt=""
                                        width={30}
                                        height={30}
                                        className='object-cover rounded-full h-[30px] w-[30px]'
                                    />
                                    <div className="flex gap-4">
                                        {product.size && <span>{product.size}</span>}
                                        {product.price && <span>{product.price.toFixed(2)}$</span>}
                                        <MdOutlineKeyboardArrowRight />
                                    </div>
                                </div>
                            </div>

                        </div> */}
                    </div>
                </div>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">
                                <div className="flex items-start gap-4">
                                    <Image
                                        src={product.images[0].url} alt=''
                                        width={1400}
                                        height={1400}
                                        className='w-[120px] h-[150px] object-cover'
                                    />
                                    <div className="">
                                        <h1 className="">
                                            {product.name.length > 30 ? `${product.name.substring(0, 30)} ...` : product.name}
                                        </h1>
                                        <span className='flex items-center gap-2'>
                                            <span>Color: </span>
                                            <Image
                                                src={product.color.image}
                                                alt=""
                                                width={30}
                                                height={30}
                                                className='object-cover rounded-full h-[30px] w-[30px]'
                                            />
                                        </span>
                                        <span className='flex gap-2'>
                                            Size:
                                            {product.size && <span>{product.size}</span>}
                                        </span>
                                        <div className="mt-4">check</div>

                                    </div>

                                </div>
                            </TableCell>
                            <TableCell>
                                {product.price && <span>{product.price.toFixed(2)}$</span>}
                            </TableCell>
                            {/* <TableCell>Credit Card</TableCell> */}
                            <TableCell className="text-right">
                                {product.price && <span>{product.price.toFixed(2)}$</span>}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div >
    )
}

export default CartProducts