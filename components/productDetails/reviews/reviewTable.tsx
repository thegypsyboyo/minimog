/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react'
import { Pagination } from "@mui/material";
import TableHeader from './tableHeader'
import Reviews from './reviews'
import usePagination from './pagination';

const ReviewTable = ({ reviews, allSizes, colors }: any) => {
    console.log("")

    const [page, setPage] = useState(1);
    const PER_PAGE = 3;
    const count = Math.ceil(reviews.length / PER_PAGE);
    const _DATA = usePagination(reviews, PER_PAGE);
    const handleChange = (e: any, p: any) => {
        setPage(p);
        _DATA.jump(p);
    }
    return (
        <div className='mt-10'>
            <TableHeader
                reviews={reviews}
                allSizes={[{ size: "All" }, ...allSizes]}
                colors={[{ color: "", image: "" }, ...colors]}
            />
            <div className="">
                {_DATA.currentData().map((review: any, i: any) => (
                    <Reviews
                        key={i}
                        review={review}
                    />
                ))}
            </div>
            <div className={""}>
                <Pagination
                    count={count}
                    page={page}
                    // variant="round"
                    shape="rounded"
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default ReviewTable