/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';


type Props = {
    brands: string[];
    brandHandler: (brand: string) => void;
    replaceQuery: (key: string, value: string) => { active: boolean; result: string }
}

const BrandFilter = ({ brands, brandHandler, replaceQuery }: Props) => {

    const [show, setShow] = useState<boolean>(false);

    return (
        <div className='mt-6'>
            <div
                className="flex items-center justify-between gap-4 cursor-pointer"
                onClick={() => setShow((prev: any) => !prev)}
            >
                <h1 className="text-lg font-semibold flex items-center gap-3">
                    Filter by brands
                </h1>
                <div className='text-xl font-normal'>{show ? <IoChevronUpOutline /> : <IoChevronDownOutline />}</div>
            </div>
            {show && (
                <div className='grid grid-cols-3 gap-2 mt-2'>
                    {brands.map((brand, i) => {
                        const check = replaceQuery("brand", brand);
                        return (
                            <Button
                                key={i}
                                onClick={() => brandHandler(check.result)}
                                variant={'outline'}
                                className={` border-black/20 font-semibold  rounded-[4px] capitalize py-1 ${check.active ? "text-blue-600 font-bold" : ""}`}
                            >
                                {brand}
                            </Button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}


export default BrandFilter