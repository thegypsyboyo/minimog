import React, { useEffect, useState } from 'react'
import { ProductProps } from '@/types/typings';
import Image from 'next/image';
import Link from 'next/link';
import Header from './numberedSwiper';

interface MyProducts {
  product: ProductProps,
}

const Products = ({ product }: MyProducts) => {
  // const myData = arrival as unknown as ProductProps[];
  const [active, setActive] = useState<number>(0);
  const [images, setImages] = useState(product?.subProducts[active]?.images);

  const [prices, setPrices] = useState(
    (product?.subProducts[active]?.sizes.map((s) => s.price).sort((a, b) =>
      a - b // sort from lowest to highest prices.
    ))
  )

  console.log("Prices Array Active:", prices)
  const [styless, setStyles] = useState(
    product?.subProducts.map((p) => p.color)
  )

  useEffect(() => {
    setImages(product?.subProducts[active].images);
    setPrices(
      product?.subProducts[active]?.sizes.map((s: any) => s.price).sort((a: any, b: any) => a - b)
    )
  }, [active, product])
  console.log("Access images from styles:", images)

  console.log("somethin")
  return (
    <div className='pb-[120px] min-h-[500px]'>
      <Header images={images} product={product} />
      <div className="mb-8 w-full">
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
        <div className={"relative flex items-center mt-6 pl-0.5 gap-2 w-full"}>
          {styless &&
            styless.map((style, i) =>
              style.image ? (
                <Image
                  src={style.image}
                  className={`${i === active && "bg-white transform hover:scale-100 transition-all p-[3px] duration-100 ease-in shadowNow"} w-[35px] h-[35px] rounded-full object-cover cursor-pointer border border-red-black `}
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
    </div>
  )
}

export default Products