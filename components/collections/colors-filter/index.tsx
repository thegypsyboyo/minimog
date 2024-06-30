/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

type Props = {
    colors: string[];
    colorHandler: (color: string) => void;
    replaceQuery: (key: string, value: string) => { active: boolean; result: string }
}

const ColorsFilter = ({ colors, colorHandler, replaceQuery }: Props) => {
    const [show, setShow] = useState<boolean>(true);
    return (
        <div className='mt-10'>
            <div
                className="flex items-center justify-between gap-4 cursor-pointer"
                onClick={() => setShow((prev: any) => !prev)}
            >
                <h1 className="text-lg font-semibold flex items-center gap-3">
                    Filter by colors
                </h1>
                <div className='text-xl font-normal'>{show ? <IoChevronUpOutline /> : <IoChevronDownOutline />}</div>
            </div>
            {show && (
                <div className='flex flex-wrap gap-4 mt-6'>
                    {colors.map((color, i) => {
                        const check = replaceQuery("color", color);
                        return (
                            <button
                                key={i}
                                style={{ background: `${color}` }}
                                className={`rounded-full w-[30px] h-[30px] ${check.active ? "!border-[4px] w-[34px] h-[34px] border-green-500" : ""}`}
                                onClick={() => colorHandler(check.result)}
                            >

                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default ColorsFilter