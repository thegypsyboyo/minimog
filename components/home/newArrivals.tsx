import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../layout'

type NewArrivalsProps = {
    image: string,
    alt: string,
    video?: string,
    title: string,
    description: string,
    url: string,
}

const data: NewArrivalsProps[] = [
    {
        description: "new arrivals",
        alt: "image-1",
        image: "/images/arrivals",
        title: "",
        url: "",
        video: "/images/sliders/video-1.mp4"
    },
    {
        description: "new arrivals",
        alt: "image-1",
        image: "/images/newArrivals/image-1.jpg",
        title: "",
        url: "",
    },
    {
        description: "new arrivals",
        alt: "image-1",
        image: "/images/newArrivals/image-2.jpg",
        title: "",
        url: "",
    },

]
const NewArrivals = () => (
    <section className='w-full pb-[90px]'>
        <Layout>
            <div className="w-full flex flex-wrap lg:gap-0 gap-5" >
                {data.map((item, index) => (
                    <div className="lg:w-[33.333%] w-full px-0 paddings overflow-hidden" key={index}>
                        {item.video ? (
                            <div className="relative w-full sm:h-[800px] lg:max-h-[550px] xl:max-h-[500px] overflow-hidden z-10">
                                {/* <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full bg-black opacity-50 z-20"></div> */}
                                <video autoPlay loop typeof="video/mp4" src={item.video} className='lg:h-full object-cover w-full' />
                                <div className="absolute flex top-0 left-0 right-0 bottom-0 p-[40px] flex-col justify-between z-30">
                                    <div className="" />
                                    <div className="">
                                        <p className="text-base font-medium text-white">New Arrivals</p>
                                        <h3 className="text-[38px] text-white font-normal">Oversize Bomber</h3>
                                        <div className="mt-6">
                                            <Link href="" className='py-[10px] px-[30px] bg-white text-black rounded-[3px] text-lg font-normal'>Shop Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative w-full lg:h-[550px] xl:h-[500px] overflow-hidden group cursor-pointer">
                                <Image src={item.image} alt={item.alt} width={1700} height={1200} className="object-cover h-full w-full group-hover:scale-110 transition-all duration-500 ease-in" />
                                <div className="absolute flex top-0 left-0 right-0 bottom-0 p-[40px] flex-col justify-between">
                                    <div className="" />
                                    <div className="">
                                        <p className="text-base font-medium text-white">New Arrivals</p>
                                        <h3 className="text-[38px] text-white font-normal">Oversize Bomber</h3>
                                        <div className="mt-6">
                                            <Link href="" className='py-[10px] px-[30px] bg-white text-black rounded-[3px] text-lg font-normal'>Shop Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Layout>
    </section >
)

export default NewArrivals