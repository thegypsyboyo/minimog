import React, { useState } from 'react'
import TableSelect from './tableSelect'

const ratings = [
    {
        text: "All",
        value: "",
    },
    {
        text: "5 star",
        value: 5,
    },
    {
        text: "4 star",
        value: 4,
    },
    {
        text: "2 star",
        value: 2,
    },
    {
        text: "2 star",
        value: 2,
    },
    {
        text: "1 star",
        value: 1,
    },
];
const orderOptions = [
    {
        text: "Recommended",
        value: "Recommended",
    },
    {
        text: "Most recent to oldest",
        value: "Most recent to oldest",
    },
    {
        text: "Oldest to most recent",
        value: "Oldest to most recent",
    },
];

const TableHeader = ({ reviews, allSizes, colors }: any) => {
    const [rating, setRating] = useState();
    const [size, setSize] = useState();
    const [style, setStyle] = useState();
    const [order, setOrder] = useState();
    console.log("")
    return (
        <div className='flex gap-8 w-full'>
            <TableSelect
                property={rating}
                text="Rating"
                data={ratings.filter((x) => x.value !== size)}
                handleChange={setSize}
            />
            <TableSelect
                property={size}
                text="Size"
                data={allSizes.filter((x) => x.size !== size)}
                handleChange={setSize}
            />
            <TableSelect
                property={style}
                text="Style"
                data={colors.filter((x) => x !== style)}
                handleChange={setStyle}
            />
            <TableSelect
                property={order}
                text="Order"
                data={orderOptions.filter((x) => x.value !== order)}
                handleChange={setOrder}
            />
        </div>
    )
}

export default TableHeader