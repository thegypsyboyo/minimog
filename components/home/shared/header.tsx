/* eslint-disable no-underscore-dangle */
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import { useTranslation } from 'react-i18next';
// import { motion } from "framer-motion"
// Import Swiper styles


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import Image from 'next/image';
import Layout from '@/components/layout';
import Link from 'next/link';
import { useSelector } from 'react-redux';
// import { updateTranslations } from '@/utils/i18n';
// import { useSelector } from 'react-redux';
// import { fadeIn, slideIn, staggerContainer } from '@/utils/motion';

interface MediaProps {
    url: string;
    public_url: string;
}
interface SliderProps {
    _id: string;
    images: MediaProps[],
    // alt: string,
    video: MediaProps[],
    // title: string,
    // description: string,
    title: { en: "", fr: "" },
    description: { en: "", fr: "" },
    slug: string,
}
interface Props {
    headers: SliderProps[];
}
// type Languages = 'eng' | 'dutch' | 'french' | 'german';

export default function Header({ headers }: Props) {
    const language = useSelector((state: any) => state.language.value);


    return (
        <div
        >
            <Swiper
                direction={'horizontal'}
                pagination={{
                    clickable: true,
                    type: "bullets"
                }}
                breakpoints={{
                    768: {
                        direction: "vertical"
                    }
                }}
                grabCursor={true}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                loop
                // effect='flip'
                modules={[Autoplay, Pagination, Navigation]}
                className="md:h-[440px] lg:h-[600px] overflow-hidden relative w-full pb-[30px] z-10"
            >
                {headers.map((slide, index) => (
                    <SwiperSlide key={index} className='md:h-screen lg:h-[600px] relative w-full'>
                        {slide.video && slide.video.length > 0 ? (
                            <div className="relative w-full h-[1000px] md:h-[440px] lg:h-[600px] overflow-hidden ">
                                <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full">
                                    {slide.video.map((vid, _id) => (
                                        <video
                                            key={_id}
                                            autoPlay
                                            loop
                                            typeof="video/mp4"
                                            src={vid.url}
                                            className='h-full object-cover w-full'
                                        />
                                    ))}
                                </div>
                                <div className="relative py-[100px] z-10 w-full h-full">
                                    <Layout className='h-full'>
                                        <div className="w-full flex items-center flex-col h-full justify-center">
                                            <h3 className='text-lg text-white font-medium'>{(slide.description as any)[language]}</h3>
                                            <h2 className='text-white lg:text-[calc(60/15*1rem)] w-full max-w-[900px] uppercase text-center lg:leading-[90px] py-6 md:text-[50px] md:leading-[60px] text-[40px] leading-[50px]'>{(slide.title as any)[language]}</h2>
                                            <Link href="/" className='px-[30px] py-[10px] rounded-[5px] border border-borderColor bg-white text-base font-medium capitalize text-primaryForground '>Shop collections</Link>
                                        </div>
                                    </Layout>
                                </div>
                            </div>
                        ) : (
                            <div className="relative w-full h-[1000px] z-10 md:h-[440px] lg:h-[600px]">
                                {slide.images && slide.images.length > 0 && slide.images.map((img, _id) => (
                                    <Image
                                        key={_id}
                                        src={img.url}
                                        alt={"main-image"}
                                        width={1700}
                                        height={1200}
                                        className="object-cover h-[740px] w-full md:absolute md:top-0 md:left-0 md:bottom-0 md:right-0 relative md:h-full z-10"
                                    />
                                ))}
                                <div className="relative pt-[30px] md:py-[100px] z-20 w-full md:h-full h-auto">
                                    <Layout className='h-full'>
                                        <div
                                            className="w-full flex md:items-start items-center flex-col h-full justify-center z-[4]"
                                        >
                                            <h3 className='text-base mb-0 text-black font-medium'>{(slide.description as any)[language]}</h3>
                                            <h2 className='text-primaryForground lg:text-[calc(60/15*1rem)] w-full lg:max-w-[450px] md:max-w-[260px] text-center md:text-start lg:leading-[70px] py-4 md:text-[35px] md:leading-[47px] text-[30px] leading-[40px]'>{(slide.title as any)[language]}</h2>
                                            <Link href="/" className='px-[30px] py-[10px] rounded-[5px] border border-black mt-3 text-base font-medium capitalize text-black '>Shop now</Link>
                                        </div>
                                    </Layout>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
