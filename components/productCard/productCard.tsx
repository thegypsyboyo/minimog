/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

// import { ProductProps } from '@/types/typings';
import Image from 'next/image';
import Link from 'next/link';
import ProductSwiper from './productSwiper';
// import Layout from '../layout';

interface Props {
    product: any | null;
}



export default function ProductCard({ product }: Props) {

    // console.log("product", product)
    const [active, setActive] = useState<number>(0);
    const [images, setImages] = useState<any>(product?.subProducts[active]?.images);

    // console.log("The Images:", images)
    const [prices, setPrices] = useState(
        (product?.subProducts[active]?.sizes.map((s: any) => s.price).sort((a: any, b: any) =>
            a - b // sort from lowest to highest prices.
        ))
    )

    // console.log("Prices Array Active:", prices)
    const [styless, setStyles] = useState(
        product?.subProducts.map((p: any) => p.color)
    )

    useEffect(() => {
        setImages(product?.subProducts[active].images);
        setPrices(
            product?.subProducts[active]?.sizes.map((s: any) => s.price).sort((a: any, b: any) => a - b)
        )
    }, [active, product])
    return (
        <div className='relative w-full overflow-hidden'>
            <div className="w-full h-[350px] lg:h-[360px] cursor-pointer">
                <ProductSwiper images={images} />
            </div>
            {product?.subProducts[active].discount ? (
                <div className={"absolute top-[10px] right-1/2 z-10 bg-[#49a594] text-white py-[4px] px-[14px] grid place-items-center rounded-[20px] text-sm"}>
                    -{product?.subProducts[active].discount}%
                </div>
            ) : (
                ""
            )}
            <div className="mb-8">
                <h1 className='text-[16px] font-medium text-[#222222]/[50] my-2 mt-3'>
                    <Link href={`/product/${product?.slug}?style=${active}`} >
                        {product?.name.length > 35
                            ? `${product?.name.substring(0, 28)}...`
                            : product?.name}
                    </Link>
                </h1>
                <span className='text-[#222222]/[70] tracking-[2px] font-normal text-[14px]'>
                    {prices?.length === 1
                        ? `$${prices[0]}$`
                        : `$${prices[0]} - ${prices[prices.length - 1]}$`}
                </span>
                <div className={"relative flex items-center mt-6 gap-2 "}>
                    {styless &&
                        styless.map((style: any, i: any) =>
                            style.image ? (
                                <Image
                                    src={style.image}
                                    className={`${i === active && "bg-white transform hover:scale-100 transition-all p-[3px] duration-100 ease-in shadowNow"} w-[32px] h-[32px] rounded-full object-cover cursor-pointer border border-red-black `}
                                    onMouseOver={() => {
                                        setImages(product?.subProducts[i].images);
                                        setActive(i);
                                    }}
                                    width={70}
                                    height={70}
                                    key={i}
                                    alt=""
                                />
                            ) : (
                                <span
                                    key={i}
                                    style={{ backgroundColor: `${style.color}` }}
                                    onMouseOver={() => {
                                        setImages(product?.subProducts[i].images);
                                        setActive(i);
                                    }}
                                ></span>
                            )
                        )}
                </div>
            </div>
        </div >
    )
}
