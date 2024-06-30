import React, { ReactNode } from 'react'
import { BiRightArrowAlt } from 'react-icons/bi';
import DotLoaderSpinner from '../loaders/dotLoader';

interface CircleIconBtnProps {
    type: "button" | "submit" | "reset";
    text: string;
    icon?: ReactNode;
    loading: boolean;
}

const CircleIconBtn = ({ type, text, icon, loading }: CircleIconBtnProps) => (
    <button className={`relative border-none outline-none w-[220px] h-[55px] font-medium text-white  mt-4 bg-blue-600 block rounded-[5px] cursor-pointer ${loading ? "cursor-not-allowed" : "cursor-pointer"}`} type={type}
        disabled={loading}
    >
        {loading ? <DotLoaderSpinner loading={loading} /> :
            <>
                {text}
                <div className="w-[40px] h-[40px] rounded-full grid place-items-center absolute top-[7.5px] right-[5px] fill-blue-600 ">
                    {icon || <BiRightArrowAlt />}
                </div>
            </>
        }
    </button>
)

export default CircleIconBtn