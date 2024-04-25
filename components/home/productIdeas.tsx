import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../layout'

const ProductIdeas = () => (
    <section className='w-full relative lg:py-[180px] md:py-[150px] py-[120px]'>
        <Layout>
            <div className="relative w-full h-full">
                <div className="md:px-[160px] px-[0px] lg:px-[180px] grid place-items-center">
                    <p className="text-lg font-medium">
                        The product idea
                    </p>
                    <h2 className="lg:text-[45px] md:text-[30px] text-[25px] text-center font-normal max-w-[650px] w-full">
                        Fashion with a focus on green materials, ethical manufacturing and less-waste.
                    </h2>
                    <div className="mt-[32px]">
                        <Link href="/collections/women-all" className="underline underline-offset-2 font-medium text-lg">View All Collection</Link>
                    </div>
                </div>
                <div className="absolute w-full h-full top-0 left-0 bottom-0 right-0 ">
                    <div className="w-full relative h-full">
                        <div className="absolute w-[70px] md:w-[130px] lg:w-[153px] lg:bottom-[48%] md:bottom-[68%] bottom-[100%] transform lg:translate-y-[50%] left-0">
                            <Image src={"/images/shopCollection/basic/2.jpg"} width={153} height={300} alt='image-1' className='animate-updown w-full h-full object-cover' />
                        </div>
                        <div className="absolute w-[60px] md:w-[130px] lg:w-[148px] lg:bottom-[58%] md:bottom-[68%] bottom-full right-0 lg:right-[58px]">
                            <Image src={"/images/productIdeas/image-2.jpg"} width={153} height={300} alt='image-1' className='animate-updown' />
                        </div>
                        <div className="absolute w-[50px] md:w-[110px] lg:w-[122px] lg:top-[68%] md:top-[80%] top-full right-0">
                            <Image src={"/images/productIdeas/image-3.jpg"} width={153} height={300} alt='image-3' className='animate-updown' />
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    </section>
)

export default ProductIdeas