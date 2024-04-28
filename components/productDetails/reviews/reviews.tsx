import { Rating } from '@mui/material';
import Image from 'next/image';
import React from 'react'

const Reviews = ({ review }: any) => {
    // const data = "";
    // const { name, image } = review.reviewBy;

    console.log("Reviews Information: ", review)

    const name = "Lewis meta"
    return (
        <div className='mt-20 mb-10'>
            <div className="">
                <h1 className="">{name?.slice(0, 2)} *** {name?.slice(name.length - 3, name.length)}</h1>
                {/* <Image
                    src={image}
                    width={1300}
                    height={1300}
                    alt=""
                    className=''
                /> */}
            </div>
            <div className="">
                <Rating
                    name="half-rating-read"
                    value={review.rating}
                    precision={0.5}
                    readOnly
                    style={{ color: "#facf19" }}
                />
                <p>{review.review}</p>
                <p>
                    <span>Overall Fit:</span>
                    {review.fit}
                    &nbsp;&nbsp;
                    <span>Size:</span>
                    {review.size}
                    &nbsp;&nbsp;
                    <div className={"mt-4"}>
                        <Image
                            src={review.style.image}
                            alt=""
                            width={1300}
                            height={1300}
                            className={"w-[250px] h-[250px] object-cover"}
                        />
                    </div>
                </p>
            </div>

        </div>
    )
}

export default Reviews