/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { TbMinus, TbPlus, TbTruckDelivery } from "react-icons/tb"

import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addToCart, emptyCart, updateCart } from '@/store/cartSlice';
import { BsHeart } from 'react-icons/bs';
import { PiPackageBold } from "react-icons/pi";
import ProductData from './productData';
import { ApplePayIcon, GooglePayIcon, MastercardIcon, MetaPayIcon, PayPalIcon, VisaIcon } from '../icons';

// import Layout from '../layout';


const ProductInfo = ({ product, setActiveImg }: any) => {
    const router: any = useRouter();
    const dispatch = useDispatch();

    const [size, setSize] = useState(router.query?.size);
    const [qty, setQty] = useState<number>(1);
    const [error, setError] = useState<any>("");
    // const { cart } = useSelector((state) => ({ ...state as any }));
    const { cart } = useSelector((state) => ({ ...state as any }));

    console.log("Cart", cart);
    useEffect(() => {
        setSize("");
        setQty(1);
    }, [router.query.style])

    useEffect(() => {
        if (qty > product.quantity) {
            setQty(product.quantity)
        }
    }, [product.quantity, qty, router.query.size])
    // dispatch(emptyCart());
    const addToCartHandler = async () => {
        if (!router.query.size) {
            setError("Please select a size!");
            return
        }
        const { data } = await axios.get(
            `/api/product/${product._id}?style=${product.style}&size=${router.query.size}`
        )
        if (qty > data.quantity) {
            setError(
                "The Quantity you have chosen is more than in  stock. Try and lower the quantity"
            );
        } else if (data.quantity < 1) {
            setError("This product is out of stock!");

        }
        else {
            const _uid = `${data._id}_${product.style}_${router.query.size}`
            const exist = cart?.cartItems?.find((p: any) => p._uid === _uid);
            if (exist) {
                // update cart
                const newCart = cart.cartItems.map((p: any) => {
                    if (p._uid == exist._uid) {
                        return { ...p, qty }
                    }
                    return p;
                })
                console.log("New cart:", newCart)
                dispatch(updateCart(newCart));
            } else {
                dispatch(addToCart({
                    ...data,
                    qty,
                    size: data.size,
                    _uid,
                }))
            }
        }

        // console.log("Data ------->", data)
    }

    // console.log("This is a cart:", cart)

    return (
        <section className='w-full relative'>
            <div className='w-full'>
                <div className="w-full ">
                    <div className="flex justify-between items-center">
                        <div className="">
                            <h1 className="text-[30px] font-medium text-[#222222]">{product.name}</h1>
                            <h2 className="">{product.sku}</h2>
                        </div>
                        <div className="w-[45px] h-[45px] rounded-full flex items-center justify-center border border-[#dedede] ">
                            <BsHeart />
                        </div>
                    </div>

                    <div className="text-xl font-normal flex items-center mt-2 text-primary-foreground/60">
                        {!size ? (
                            <h2 className="">{product.priceRange}</h2>
                        ) : (
                            <h1 className="">USD {product.price}</h1>
                        )}
                        {product.discount > 0 ? (
                            <h3 className="">
                                {size && <span className="">{product.beforePrice}</span>}
                                <span className="">(-{product.discount}%)</span>
                            </h3>
                        ) : (
                            ""
                        )}
                    </div>
                    {/* <div className="">Price Info</div> */}
                    <div className="shipping text-green-600 font-medium text-lg mt-0">
                        {
                            product.shipping
                                ? `+ ${product.shipping}
                                $ Shipping fee`
                                : `Free shipping`
                        }
                    </div>
                    <div className="pieces">
                        {size
                            ? product.quantity
                            : product.sizes.reduce
                                ((start: any, next: { qty: any; }) => start + next.qty, 0)
                        }{" "}
                        Peices available in stock
                    </div>
                    <div className="mt-5">
                        <h2 className="">Select a size</h2>
                        <div className="flex gap-3 mt-2 mb-8 ">
                            {product.sizes.map((s: any, i: any) => (
                                <Link href={`/product/${product.slug}?style=${router.query.style}&size=${i}`} key={i} className={``}>
                                    <div className={`${i == router.query.size && " border-solid border-green-400 border bg-green-500"} w-[40px] h-[40px] bg-borderColor text-black flex items-center justify-center rounded-full`} onClick={() => setSize(s.size)}>
                                        {s.size}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-3 ">
                        {product.colors &&
                            product.colors.map((color: any, i: any) =>
                            (
                                <span
                                    className={`${i == router.query.style ? "!border border-solid border-black p-1" : ""} w-[60px] h-[60px] rounded-full `}
                                    key={i}
                                    onMouseEnter={() => setActiveImg(product.subProducts[i].images[0].url)}
                                    onMouseLeave={() => setActiveImg("")}
                                >
                                    <Link href={`/product/${product.slug}?style=${i}`}>
                                        <Image src={color.image} width={90} height={90} alt='' className='object-cover w-full h-full rounded-full' />
                                    </Link>
                                </span>
                            ))
                        }
                    </div>
                    <div className="flex flex-col mt-8 w-full">
                        <p className="">Choose Quantity</p>
                        <div className="mt-4 flex items-center w-full flex-wrap ">
                            <div className="flex items-center justify-between px-[10px] gap-4 border border-solid border-borderColor rounded-[3px] w-[130px] py-[10px] text-sm">
                                <button onClick={() => qty > 1 && setQty((prev) => prev - 1)} className='rounded-full grid place-items-center cursor-pointer  hover:scale-110 transform'>
                                    <TbMinus />
                                </button>
                                <span className=''>{qty}</span>
                                <button onClick={() => qty < product.quantity && setQty((prev) => prev + 1)} className='hover:scale-105 transition-all duration-300 transform'>
                                    <TbPlus />
                                </button>
                            </div>
                            <div className="w-[calc(100%-130px)] pl-5 ">
                                <button
                                    className={`w-full py-[10px] px-[30px] border border-solid grid place-items-center hover:bg-black hover:text-white transform hover:scale-100 transition-all duration-300 ease-in-out  border-black rounded-[3px]`}
                                    disabled={product.quantity < 1}
                                    style={{ cursor: `${product.quantity < 1 ? "not allowed" : ""}` }}
                                    onClick={() => addToCartHandler()}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                    {error && <span className="text-red-600 mt-2">{error}</span>}

                    {/* <div className="">Add to cart</div> */}
                </div>
                <div className='pb-[10px] border-b border-b-black/10'>
                    <ProductData details={[product.description, ...product.details]} />
                </div>
                <div className="mt-5">
                    <div className="flex items-center gap-5">
                        <h1 className="font-medium text-lg flex items-center gap-2 "><TbTruckDelivery className='text-2xl' /> Estimated Delivery : </h1>
                        <span className=""> 05 May - 10 May</span>
                    </div>
                    <div className="flex items-center gap-5 mt-3">
                        <h1 className="font-medium text-lg flex items-center gap-2 "><PiPackageBold className='text-2xl' /> Free shipping and returns : </h1>
                        <span className=""> On all orders above $75</span>
                    </div>
                </div>
                <div className="bg-[#f8f8f8] p-[20px] rounded-[5px] mt-6">
                    <ul className="flex flex-row gap-[16px]  items-center justify-center">
                        <li className="">
                            <ApplePayIcon width={38} height={24} title="Apple Pay" />
                        </li>
                        <li className="">
                            <MetaPayIcon width={38} height={24} title="Meta Pay" />
                        </li>
                        <li className="">
                            <GooglePayIcon width={38} height={24} title="Mastercard" />
                        </li>
                        <li className="">
                            <PayPalIcon width={38} height={24} title="Mastercard" />
                        </li>
                        <li className="">
                            <MastercardIcon width={38} height={24} title="Mastercard" />
                        </li>
                        <li className="">
                            <VisaIcon width={38} height={24} title="Visa" />
                        </li>
                    </ul>
                    <div className="flex items-center justify-center mt-4 text-balance">
                        <h1 className="">Garantee safe and secure checkout</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductInfo