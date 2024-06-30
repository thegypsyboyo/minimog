/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { BsPlus } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";

import Card from './card';

type Props = {
    categories: any;
    subCategories: (categeory: string) => void;
    categoryHandler: (category: string) => void;
    replaceQuery: (key: string, value: string) => { active: boolean };
}

const CategoryFilter = ({ categories,
    subCategories,
    categoryHandler,
    replaceQuery }: Props) => {

    const [show, setShow] = useState<boolean>(true);

    return (
        <div className='mt-6 '>
            <div
                className="flex items-center justify-between gap-4 cursor-pointer"
                onClick={() => setShow((prev: any) => !prev)}
            >
                <h1 className="text-lg font-semibold flex items-center gap-3">
                    Filter by cateogry
                </h1>
                <div className='text-xl font-normal'>{show ? <IoChevronUpOutline /> : <IoChevronDownOutline />}</div>
            </div>
            {show && categories.map((category: any, index: number) => (
                <Card
                    key={index}
                    category={category}
                    replaceQuery={replaceQuery}
                    categoryHandler={categoryHandler}
                />
            ))}
        </div>
    )
}

export default CategoryFilter