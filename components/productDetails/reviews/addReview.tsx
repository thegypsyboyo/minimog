import React, { useState } from 'react'
import { Rating } from '@mui/material';
import SelectComponent from './select'
import ImageComponent from './imageComponent';

const AddReview = ({ product }: any) => {
    const [size, setSize] = useState<String>("");
    const [style, setStyle] = useState<String>("");
    const [fit, setFit] = useState<String>("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState();
    const [images, setImages] = useState([]);

    const fits = ["Small", "True to size", "Large"];
    console.log("")
    return (
        <div className='w-full'>
            <div className="mt-10 flex gap-10">
                <SelectComponent
                    property={size}
                    text={"Size"}
                    data={product.allSizes.filter((x) => x.size !== size)}
                    handleChange={setSize}
                />
                <SelectComponent
                    property={style}
                    text="Style"
                    data={product.colors.filter((x) => x !== style)}
                    handleChange={setStyle}
                />
                <SelectComponent
                    property={fit}
                    text="How does it fit"
                    data={fits.filter((x) => x !== fit)}
                    handleChange={setFit}
                />
            </div>
            <div className="flex flex-col w-1/2">
                <ImageComponent
                    images={images}
                    setImages={setImages}
                />
                <Rating
                    name="half-rating-read"
                    defaultValue={0}
                    value={rating}
                    onChange={(e: any) => setRating(e.target.value)}
                    precision={0.5}
                    style={{ color: "#facf19", fontSize: "3rem" }}
                    className='outline-none'
                />
                <textarea
                    name='review'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder='Write your review here'
                    className='border border-solid border-borderColor outline-none h-[230px] w-full p-[20px] rounded-[10px] mt-8'
                />
                <button
                    className={"py-[10px] px-[20px] rounded-[3px] bg-yellow-500 mt-8"}
                    onClick={() => { }}
                // disabled={loading}
                >
                    Submit review
                </button>
            </div>
        </div>
    )
}

export default AddReview