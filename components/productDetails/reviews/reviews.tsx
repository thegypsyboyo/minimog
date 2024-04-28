import { Rating } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import { AiOutlineLike } from "react-icons/ai";

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
                            className={"w-[50px] h-[50px] object-cover rounded-full"}
                        />
                    </div>
                </p>
            </div>
            <div className={""}>
                <div className={"flex"}>
                    {review.images.length > 0 &&
                        review.images.map((img, i) =>
                            <Image src={img?.url} width={1300} height={1300} alt="" key={i}
                                className={"w-[250px] h-[250px] object-cover"}
                            />
                        )}
                </div>
                <div className={""}>
                    <div className={""}>
                        {review.likes && review.likes?.likes}
                        <AiOutlineLike />
                    </div>
                    <div className={""}>
                        {review?.updatedAt?.slice(0, 10)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews