/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
import Image from 'next/image';
import React, { useRef, useState } from 'react'
import { MdOutlineRemoveCircle } from 'react-icons/md';

const ImageComponent = ({ images, setImages }: any) => {
    console.log("")
    const [error, setError] = useState("");
    const inputRef = useRef<any>(null);
    const handleImages = (e: any) => {
        let files = Array.from(e.target.files);
        files.forEach((img: any, i: any) => {
            if (images.length > 3 || i == 2) {
                setError("Maximum of 3 images are allowed!")
            }
            if (
                img.type !== "image/jpeg" &&
                img.type !== "image/png" &&
                img.type !== "image/webp"
            ) {
                setError(`${img.name} format is unsupported. Only JPEG, PNG and WEBP are allowed!`);
                files = files.filter((item: any) => item.name !== img.name);
            } else if (img.size > 1024 * 1024 * 5) {
                setError(`${img.name} size is too large.Max 5mb allowed`)
            } else {
                setError("");
                const reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onload = (e: any) => {
                    setImages((images: any) => [...images, e.target?.result]);
                }
            }

        })
    }

    const removeImage = (image: any) => {
        setImages((images: any) => images.filter((img: any) => img !== image));
        if (images.length < 3) {
            setError("")
        }
    }
    return (
        <div>
            <input
                type="file"
                ref={inputRef}
                hidden
                onChange={handleImages}
                multiple
                accept='images/png, images/jpeg, image/webp'
            />
            <button
                onClick={() => inputRef?.current.click()}
                style={{ width: "150px" }}
                className={"py-[10px] px-[20px] bg-yellow-500 mt-5"}
            >
                Add Images
            </button>

            {error && <div className='mt-4 text-red-600 text-lg'>{error}</div>}
            <div className="mt-4 flex gap-3 mb-5">
                {images.length > 0 &&
                    images.map((img: any, i: any) => (
                        <span key={i}>
                            <MdOutlineRemoveCircle
                                onClick={() => removeImage(img)}
                                className='mb-3 text-2xl cursor-pointer '
                            />
                            <Image
                                src={img}
                                width={1500}
                                height={1500}
                                alt="upload image"
                                className='w-[130px] h-[80px] object-cover'
                            />
                        </span>
                    ))

                }
            </div>
        </div>
    )
}

export default ImageComponent