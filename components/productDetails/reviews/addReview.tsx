/* eslint-disable no-underscore-dangle */
/* eslint-disable no-lonely-if */
/* eslint-disable camelcase */
import React, { useState } from 'react'
import { Rating } from '@mui/material';
import { useDispatch } from 'react-redux';
import { showDialog } from '@/store/dialogSlice';
import dataURItoBlob from '@/utils/dataURItoBlob';
import { uploadImages } from '@/requests/upload';
import axios from 'axios';
import DialogModal from '@/components/dialogModal';
import { ClipLoader } from "react-spinners";
import SelectComponent from './select'
import ImageComponent from './imageComponent';

const AddReview = ({ product, setReviews }: any) => {
    const [size, setSize] = useState<String>("");
    const [style, setStyle] = useState<String>("");
    const [fit, setFit] = useState<String>("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState<number | null>(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch()

    const fits = ["Small", "True to size", "Large"];

    let uploaded_images: never[] = [];
    const handleSubmit = async () => {
        setLoading(true);
        const msgs = [];
        if (!size) {
            msgs.push({
                msg: "Please select a size!",
                type: "error",
            });
        }
        if (!style) {
            msgs.push({
                msg: "Please select a style",
                type: "error"
            })
        }
        if (!fit) {
            msgs.push({
                msg: "Please select a fit!",
                type: "error",
            });
        }
        if (!rating) {
            msgs.push({
                msg: "Please select a rating !",
                type: "error",
            });
        } if (!rating) {
            msgs.push({
                msg: "Please select a rating !",
                type: "error",
            });
        }
        if (!review) {
            msgs.push({
                msg: "Please add a review !",
                type: "error",
            });
        }
        if (msgs.length > 0) {
            dispatch(
                showDialog({
                    header: "There was an error while adding your review",
                    msgs,
                })
            );
        } else {
            if (images.length > 0) {
                const temp = images.map((img) => dataURItoBlob(img));
                const path = "reviews images";
                const formData = new FormData();
                formData.append("path", path);
                temp.forEach((img) => {
                    formData.append("file", img);
                });
                uploaded_images = await uploadImages(formData);
            }
            const { data } = await axios.put(`/api/product/${product._id}/review`, {
                size,
                style,
                fit,
                rating: Number(rating),
                review,
                images: uploaded_images,
            });
            setReviews(data.reviews);
            setStyle("");
            setSize("");
            setFit("");
            setImages([]);
            setRating(0);
            setReview("")
        }
        setLoading(false)
    }
    return (
        <div className='w-full'>
            <DialogModal type={""} />
            <div className="mt-10 flex gap-10">
                <SelectComponent
                    property={size}
                    text={"Size"}
                    data={product.allSizes.filter((x: any) => x.size !== size)}
                    handleChange={setSize}
                />
                <SelectComponent
                    property={style}
                    text="Style"
                    data={product.colors.filter((x: any) => x !== style)}
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
                />
                <textarea
                    name='review'
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder='Write your review here'
                    className='border border-solid border-borderColor outline-none h-[230px] w-full p-[20px] rounded-[10px] mt-8'
                />
                <button
                    className={`flex items-center justify-center gap-3 py-[10px] px-[20px] rounded-[3px] bg-yellow-500 mt-8 ${loading ? "cursor-not-allowed bg-gray-400 " : ""}`}
                    onClick={() => { handleSubmit() }}
                    disabled={loading}
                    type='submit'
                >
                    Submit Review {" "}
                    {loading ? <ClipLoader loading={loading} color='#fff' /> : !loading}
                </button>
            </div>
        </div>
    )
}

export default AddReview