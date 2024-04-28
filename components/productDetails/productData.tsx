import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { BsQuestion, BsShare } from 'react-icons/bs'
import Share from './share'

const ProductData = ({ details }: any) => {
    console.log("Details", details)
    return (
        <div className='w-full relative mt-12'>
            <div className="w-full flex items-start gap-3 justify-between flex-wrap">
                <div className="w-[260px]">
                    <Accordion type="single" collapsible className="w-full mt-0 pt-0">
                        <AccordionItem value="item-1" className='border-b-0'>
                            <AccordionTrigger className='outline-none mt-0 pt-0'>Show Details</AccordionTrigger>
                            <AccordionContent>
                                <h1 className="text-lg font-medium py-3 border-b border-t border-t-borderColor  border-b-borderColor mb-4">{details[0]}</h1>
                                <div className="">
                                    {details.slice(1, details.length).map((info: any, index: any) => (
                                        <div key={index} className='flex justify-between items-center text-base'>
                                            <span className="">{info.name} :</span>
                                            <span className="">{info.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                {/* <div className="">Size guide</div> */}
                <div className="">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex items-center justify-center gap-1.5 w-fit cursor-pointer hover:text-black/60 hover:transform hover:scale-100 transition-all duration-300 ease-in">
                                <BsQuestion className='w-[27px] h-[27px] rounded-full p-1.5 flex items-center justify-center border border-solid border-r-borderColor' />
                                <span className='cursor-pointer '>Ask a question</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="w-full outline-none bg-white">
                            <h1 className="text-[40px] text-center">Ask a question </h1>
                            <div className="mt-0 w-full">
                                <form action="" className='flex flex-col items-center justify-center outline-none'>
                                    <input type="text" placeholder='Your Name *'
                                        className='py-[10px] px-[20px] border border-solid border-borderColor rounded-[5px] w-full mb-4 outline-none'
                                    />
                                    <input type="text" placeholder='Your Phone Number *'
                                        className='py-[10px] px-[20px] border border-solid border-borderColor rounded-[5px] w-full mb-4 outline-none'
                                    />
                                    <input type="text" placeholder='Your Email *'
                                        className='py-[10px] px-[20px] border border-solid border-borderColor rounded-[5px] w-full outline-none'
                                    />
                                    <textarea placeholder='Your Message *'
                                        className='py-[10px] px-[20px] border border-solid border-borderColor rounded-[5px] w-full resize-none h-[130px] mt-4 outline-none'
                                    >
                                    </textarea>
                                    <span className='mt-3 text-primaryForground w-full text-start'>Requred Fields *</span>
                                    <button className='text-center py-[10px] px-[20px] bg-black text-white justify-center mt-5 flex rounded-[5px]'>Submit now</button>
                                </form>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="">
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex items-center justify-center gap-1.5 w-fit cursor-pointer hover:text-black/60 hover:transform hover:scale-100 transition-all duration-300 ease-in">
                                <BsShare className=' flex items-center justify-center text-[22px]' />
                                <span className='cursor-pointer '>Share</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:w-[400px] outline-none bg-white">
                            <div className='w-full mb-0'>
                                <p className="">Copy link</p>
                                <input
                                    type='text'
                                    value={window.location.href}
                                    className='py-[10px] px-[20px] border border-solid border-borderColor outline-none w-full mt-2'
                                />
                            </div>
                            <div>
                                <p className="mb-1.5">Share:</p>
                                <Share />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

            </div>
        </div>
    )
}

export default ProductData