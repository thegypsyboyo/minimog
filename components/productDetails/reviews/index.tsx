import React, { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { Rating } from "@mui/material"
import AddReview from './addReview';
import ReviewTable from './reviewTable';


const Reviews = ({ product }: any) => {

    const { data: session } = useSession();
    const [reviews, setReviews] = useState(product.reviews);
    console.log("Ratings:", product.ratings.percentage)

    return (
        <div className='w-full mt-20'>
            <div className="">
                <h1 className="text-4xl font-medium">Customer&apos;s Reviews ({reviews.length})</h1>

                <div className="">
                    <span>Averange Ratings</span>
                    <div className="flex items-center gap-4">
                        <Rating
                            name='half-rating-read'
                            defaultValue={product.rating}
                            precision={0.5}
                            readOnly
                            style={{ color: "#facf19" }}
                        />
                        {product.ratig === 0 ? "No reviews yet" : product.rating}
                    </div>

                    <div className="mt-20">
                        {product.ratings.map((rating: any, i: any) => (
                            <div className="flex gap-10 w-full " key={i}>
                                <Rating
                                    name="half-rating-read"
                                    defaultValue={5 - i}
                                    readOnly
                                    style={{ color: "#facf19" }}
                                />
                                <div className="w-full flex">
                                    <div className={"w-[50%] relative  h-4 rounded-full bg-[#dedede]"}>
                                        <div
                                            className={"bg-[#facf19] h-4 rounded-full"}
                                            style={{ width: `${rating.percentage}%` }}
                                        ></div>
                                        <span className='absolute transform top-1/2  -translate-y-1/2 -right-10'>{rating.percentage}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-10">
                    {session ? (
                        <div className="">
                            <AddReview product={product} setReviews={setReviews} />
                        </div>
                    ) : (
                        <button
                            onClick={() => signIn()}
                            className='w-fit bg-yellow-500 py-[10px] px-[20px] rounded-[3px]'
                        >Login to add review</button>
                    )}
                </div>
                <ReviewTable
                    reviews={reviews}
                    allSizes={product.allSizes}
                    colors={product.colors}
                />
            </div>
        </div>
    )
}

export default Reviews