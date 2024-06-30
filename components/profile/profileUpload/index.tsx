/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useRef } from 'react';
import { ErrorMessage, useField } from "formik";
import { RiDeleteBin7Fill, RiUploadCloud2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { showDialog } from '@/store/dialogSlice';

const ProfileUpload = ({
    images,
    setImages,
    header,
    text,
    name,
    ...props
}: any) => {
    const dispatch = useDispatch();
    const fileInput = useRef<any>(null);
    const [field, meta] = useField(props);

    const handleImages = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            if (
                file.type !== "image/jpeg" &&
                file.type !== "image/png" &&
                file.type !== "image/webp"
            ) {
                dispatch(
                    showDialog({
                        header: "Unsupported Format.",
                        msgs: [
                            {
                                msg: `${file.name} format is unsupported! Only JPEG, PNG, WEBP are allowed.`,
                                type: "error",
                            },
                        ],
                    })
                );
            } else if (file.size > 1024 * 1024 * 10) {
                dispatch(
                    showDialog({
                        header: "Unsupported Format.",
                        msgs: [
                            {
                                msg: `${file.name} size is too large, maximum of 10MB allowed.`,
                                type: "error",
                            },
                        ],
                    })
                );

            } else {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e: any) => {
                    setImages([e.target.result]);
                };
            }
        }
    }

    const handleRemove = () => {
        setImages([]);
    };

    return (
        <div className="">
            <div className={"mt-2 mb-3 "}>
                <span className="text-[20px] font-medium">
                    {header}
                </span>
            </div>
            <span>
                {meta.touched && meta.error && (
                    <div className={"text-red-600"}>
                        <span></span>
                        <ErrorMessage name={name} />
                    </div>
                )}
            </span>
            <div>
                <input
                    type="file"
                    name={name}
                    ref={fileInput}
                    hidden
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImages}
                />
            </div>
            {!images.length ? (
                <div>
                    <div className="rounded-[.475rem] border-dashed border-[#1b84ff] bg-[#e9f3ff] w-full h-auto py-[1.5rem] px-[1.7rem] border flex items-center cursor-pointer gap-5" onClick={() => fileInput?.current.click()}>
                        <RiUploadCloud2Fill className="text-[56px]" />
                        <div className="">
                            <h1 className="text-lg font-medium">Drop files here or click to upload</h1>
                            <span className="text-[#99a1b7] text-sm">Upload one file</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex w-full gap-2 items-center flex-wrap">
                    {images && (
                        <>
                            {images?.map((img: any, i: any) => (
                                <div className={"flex relative"} key={i}>
                                    <Image
                                        width={200}
                                        height={200}
                                        src={img}
                                        alt="image upload"
                                        className="w-[200px] object-cover h-[200px] rounded-[5px]"
                                    />
                                    <div className={"absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"}>
                                        <div className="flex items-center justify-center bg-black text-white pb-3.5 gap-4 h-[40px] rounded-[4px] px-4 relative">
                                            <button onClick={handleRemove}>
                                                <RiDeleteBin7Fill />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default ProfileUpload;
