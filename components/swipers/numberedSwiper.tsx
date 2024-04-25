import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Jost } from 'next/font/google';

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import { ProductProps } from '@/types/typings';
import { ImageProps } from '../productCard/productSwiper';
import AccordionCard from './accordion';

interface MyProducts {
    images: ImageProps[],
    product: ProductProps,
}

const noto = Jost({
    subsets: ['latin'],
    variable: '--font-noto',
    display: 'swap'
})


export default function Header({ images, product }: MyProducts) {

    const swiperRef = useRef<any>(null);
    useEffect(() => {
        swiperRef.current?.swiper?.autoplay.stop();
    }, [swiperRef]);
    console.log("TESTNG AGAIN:", images)
    return (

        <div className='relative w-full group overflow-hidden'>
            <div
                className={"w-full relative cursor-pointer "}
                onMouseEnter={() => {
                    swiperRef?.current.swiper.autoplay.start();
                }}
                onMouseLeave={() => {
                    swiperRef?.current.swiper.autoplay.stop();
                    swiperRef?.current.swiper.slideTo(0);
                    // add this line if you want the slider to go back to first index on mouse leave.
                }}
            >
                <Swiper
                    ref={swiperRef}
                    centeredSlides={true}
                    autoplay={{ delay: 100, stopOnLastSlide: false }}
                    speed={800}
                    modules={[Autoplay]}
                    className="h-full"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index} className="w-full h-full">
                            <div className="relative w-full h-[300px]  overflow-hidden ">
                                <Image src={img.url} alt="" width={1200} height={900} className="w-full absolute top-0 left-0 right-0 group-hover:scale-105 transition-all duration-300 ease-out  bottom-0 object-cover h-full z-[10]" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="absolute bottom-4 w-full flex items-center justify-center z-[20] font-noto">
                <Dialog >
                    <DialogTrigger asChild className={`font-${noto.className} font-noto`}>
                        <Button variant="secondary" className='transition-all duration-500 opacity-0 group-hover:opacity-100 ease-in translate-y-[100px] group-hover:translate-y-0 py-[11px] px-[30px] bg-white text-black border border-borderColor hover:bg-black hover:text-white cursor-pointer'>Select Options</Button>
                    </DialogTrigger>
                    <DialogContent className="min-w-[75%] bg-white h-[500px] font-noto p-0 m-0 overflow-hidden outline-none">
                        <AccordionCard images={images} product={product} />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
