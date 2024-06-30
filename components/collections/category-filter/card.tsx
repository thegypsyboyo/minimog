/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { ChangeEvent, useState } from 'react'

interface CategoryProps {
    createdAt: Date;
    name: string;
    slug: string;
    _id: string;
}

type Props = {
    category: CategoryProps;
    categoryHandler: (category: string) => void;
    replaceQuery: (key: string, value: string) => { active: boolean };
}

const Card = ({ category, replaceQuery, categoryHandler }: Props) => {

    const check = replaceQuery("category", category._id);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        categoryHandler(category._id);
    }
    console.log("Category:", category)
    return (
        <section className='font-semibold capitalize'>
            <li onClick={() => categoryHandler(category._id)} className='flex items-center gap-2  text-sm my-2'>
                <input
                    type="radio"
                    name="filter"
                    id={category._id}
                    checked={check.active}
                    onChange={handleChange}
                    className={`${check.active ? "!checked:bg-blue-600" : ""}`}
                // className="hidden"

                />
                {/* <span
                    className={`w-4 h-4 inline-block rounded-full border-1 border-solid ${check.active ? "border-black/30 bg-blue-600 " : "border-gray-400"}`}
                ></span> */}
                <label
                    htmlFor={category._id}
                    className={`${check.active ? "font-bold text-blue-600" : "font-semibold"}`}
                >
                    <span>{category.name}</span>
                </label>
            </li>
        </section>
    )
}

export default Card