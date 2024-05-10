/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { BsHeart } from 'react-icons/bs';
import { IoIosRemoveCircle } from "react-icons/io";
import { updateCart } from '@/store/cartSlice';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { TbMinus, TbPlus } from 'react-icons/tb';
// import Layout from '../layout';


const CartProducts = ({ selected, setSelected, product }: any) => {
    // console.log("PRoducts:", product);
    const [active, setActive] = useState();
    console.log("Selected Active", active);
    const { cart } = useSelector((state) => ({ ...(state as Record<string, any>) }));

    console.log("Cart From Cart:", cart)

    useEffect(() => {
        const check = selected.find((p) => p._uid == product._uid);
        setActive(check);
    }, [product._uid, selected]);
    const dispatch = useDispatch();
    const updateQty = (type: any) => {
        const newCart = cart.cartItems.map((p: any) => {
            if (p._uid == product._uid) {
                return {
                    ...p,
                    qty: type == "plus" ? product.qty + 1 : product.qty - 1,
                };
            }
            return p;
        });
        dispatch(updateCart(newCart));
    };
    const removeProduct = (id: any) => {
        const newCart = cart.cartItems.filter((p) => p._uid != id);
        dispatch(updateCart(newCart));
    };
    const handleSelect = () => {
        if (active) {
            setSelected(selected.filter((p) => p._uid !== product._uid));
        } else {
            setSelected([...selected, product]);
        }
    };
    return (
        <div >
            {/* <div className="">Something here</div> */}
            <Table className='mb-5 mt-6'>
                <TableBody>
                    <TableRow className=''>
                        <TableCell className="w-[50%] p-0">
                            <div className="flex mt-10 mb-3 items-center" onClick={() => handleSelect()}>
                                <div className={`${active ? "bg-yellow-500" : ""} w-[22px] h-[22px] rounded-full cursor-pointer hover:border-yellow-500 border border-borderColor`}>
                                </div>
                                <span className='ml-3'>select product</span>
                            </div>
                            <div className="flex items-start gap-5">
                                <Image
                                    src={product.images[0].url} alt=''
                                    width={1400}
                                    height={1400}
                                    className='w-[140px] min-w-[150px] h-[200px] object-cover'
                                />
                                <div className="">
                                    <h1 className="text-lg font-semibold">
                                        {product.name.length > 30 ? `${product.name.substring(0, 30)} ...` : product.name}
                                    </h1>
                                    <span className='flex items-center gap-2'>
                                        <span className='font-bold text-lg'>Color: </span>
                                        <Image
                                            src={product.color.image}
                                            alt=""
                                            width={30}
                                            height={30}
                                            className='object-cover rounded-full h-[20px] w-[20px]'
                                        />
                                    </span>
                                    <span className='flex gap-2 items-center'>
                                        <span className="text-lg font-semibold">
                                            Size:
                                        </span>
                                        {product.size && <span>{product.size}</span>}
                                    </span>
                                    <div
                                        className="mt-4 font-semibold w-fit cursor-pointer"
                                        onClick={() => removeProduct(product._uid)}
                                    >
                                        <span className="flex gap-2 items-center t group w-fit">
                                            <span className="text-xl">
                                                <IoIosRemoveCircle />

                                            </span>
                                            <span className="group-hover:underline underline-offset-2 transition-all duration-300 ease-in">
                                                Remove

                                            </span>
                                        </span>
                                    </div>

                                </div>

                            </div>
                        </TableCell>
                        <TableCell className='w-[20%] p-0 '>
                            {product.price && <span>{product.price.toFixed(2)}$</span>}
                        </TableCell>
                        {/* <TableCell>Credit Card</TableCell> */}
                        <TableCell className="w-[20%] p-0">
                            <div className="flex items-center justify-between px-[10px] gap-4 border border-solid border-borderColor rounded-[3px] w-[130px] py-[10px] text-sm">
                                <button className='rounded-full grid place-items-center cursor-pointer  hover:scale-110 transform'
                                    disabled={product.qty < 2}
                                    onClick={() => updateQty("minus")}
                                >
                                    <TbMinus />
                                </button>
                                <span className=''>{product.qty}</span>
                                <button
                                    onClick={() => updateQty("plus")} className='hover:scale-105 transition-all duration-300 transform'
                                >
                                    <TbPlus />
                                </button>
                            </div>
                        </TableCell>
                        <TableCell className="w-[10%] p-0">

                            {product.price && <span className='text-[20px] font-normal'>{(product.price * product.qty).toFixed(2)} $</span>}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

    )
}

export default CartProducts