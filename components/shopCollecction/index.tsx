import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../layout';

const ShopCollection = () => {
    console.log("");

    return (
        <div className='bg-[#222222]'>
            <Layout>
                <div className="relative w-full h-full md:py-[200px] py-[250px] lg:py-[250px]">
                    <div className="md:px-[160px] px-[0px] text-white lg:px-[180px] grid place-items-center">
                        <p className="text-base md:text-lg font-medium mb-8">
                            Shop by Collection
                        </p>
                        <h2 className="lg:text-[60px] md:text-[30px] text-[35px] text-center font-normal max-w-[650px] w-full">
                            Basic Style
                        </h2>
                        <h2 className="lg:text-[65px] md:text-[30px] text-[35px] text-center font-normal max-w-[650px] w-full">
                            Esential Outfit
                        </h2>
                        <h2 className="lg:text-[65px] md:text-[30px] text-[35px] text-center font-normal max-w-[650px] w-full text--white">
                            Heavy Weight
                        </h2>
                    </div>
                    <div className="absolute w-full h-full top-[60px] md:top-[0%] left-0 bottom-0 right-0 ">
                        <div className="w-full relative h-full">
                            <div className="absolute w-[100px] md:w-[130px] lg:w-[270px] top-[10px] md:top-[10.86%]  md:right-[77.16%]">
                                <Image src={"/images/shopCollection/basic/1.jpg"} width={153} height={300} alt='image-1' priority className='animate-updown w-full h-full object-cover' />
                            </div>
                            <div className="absolute w-[80px] md:w-[180px] xl:w-[350px] lg:w-[250px] md:left-auto md:translate-x-0 translate-x-[-50%] left-[50%] bottom-[15%] sm:w-[120px] md:right-0 md:top-[50%] right-0 transform  md:translate-y-[-50%] ">
                                <Image src={"/images/shopCollection/basic/2.jpg"} width={1153} height={1300} alt='image-1' className='animate-updown w-full h-auto object-cover' />
                            </div>
                            <div className="absolute w-[100px] md:w-[100px] lg:w-[165px] md:bottom-[13.58%] md:left-auto right-[5%] md:right-[68.52%] ">
                                <Image src={"/images/shopCollection/basic/3.jpg"} width={153} height={300} alt='image-3' className='animate-updown w-full h-full object-cover' />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default ShopCollection