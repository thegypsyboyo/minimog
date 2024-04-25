import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
// import { FaderAnimation } from '@/motion';
import { fadeIn, planetVariants, slideIn, staggerContainer } from '@/utils/motion';

import Layout from '../layout';
import { TitleText, TypingText } from '../customText';

const DressEdit = () => {
    console.log("");
    return (
        <section className='py-[120px] w-full relative'>
            <Layout>
                <motion.div
                    className="overflow-hidden w-full flex items-center  flex-wrap"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                >
                    <div className="md:w-[41.666%] w-full">
                        <motion.div
                            variants={slideIn("left", "tween", 0.3, 1)}
                        >
                            <div className="w-full">
                                <p className="text-lg font-normal mt-5">
                                    <TypingText title="The Dress Edit" />
                                </p>
                                <h1 className="text-[60px] font-normal leading-[76px] mt-5">
                                    <TitleText title="Dresses you'll turn to again and again" />
                                </h1>
                                <p className='mt-10 max-w-[400px]'>Here is your chance to upgrade your wardrobe with a variation of styles and fits that are both.</p>
                                <div className="mt-10">
                                    <div className='py-[10px] px-[20px] bg-black hover:bg-white hover:border-borderColor border text-lg font-semibold hover:text-black transition-all duration-300 ease-in text-white hover:scale-105 hover:transform w-fit rounded-[5px]'>
                                        <Link href={""} className='w-full h-full'>Shop collection</Link>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div
                        variants={fadeIn("left", "tween", 0.3, 1)}

                        className="md:w-[58.333%] w-full">
                        <div className="w-full block relative">
                            <div className="pl-[100px] group overflow-hidden ">
                                <div className="w-full overflow-hidden">
                                    <Image
                                        src={"/images/newArrivals/image-1.jpg"}
                                        width={1500}
                                        height={1500}
                                        alt='image-1'
                                        priority
                                        className='w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ease-in'
                                    />
                                </div>
                            </div>
                            <div className="absolute w-[40%] top-[20%]">
                                <div className="w-full h-full overflow-hidden group">
                                    <Image
                                        src={"/images/newArrivals/image-2.jpg"}
                                        width={1500}
                                        height={1500}
                                        alt='image-1'
                                        priority
                                        className='w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ease-in'
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </Layout>
        </section>
    )
}

export default DressEdit