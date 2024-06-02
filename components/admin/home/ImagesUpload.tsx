/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { useRef } from 'react'
import { ErrorMessage, useField } from "formik";
import { RiDeleteBin7Fill, RiUploadCloud2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import Image from "next/image";
import { showDialog } from '@/store/dialogSlice';


const ImagesUpload = ({
    images,
    setImages,
    header,
    text,
    name,
    ...props
}: any) => {
    const dispatch = useDispatch();
    const fileInput = useRef<any>(null);
    // eslint-disable-next-line no-unused-vars
    const [field, meta] = useField(props);

    const handleImages = (e: any) => {
        let files = Array.from(e.target.files);
        files.forEach((img: any, i) => {
            if (images.length === 1) {
                dispatch(
                    showDialog({
                        header: "Maximu 1 image is allowed.",
                        msgs: [
                            {
                                msg: `Maximum of total 1 image is allowed.`,
                                type: "error",
                            },
                        ],
                    })
                );
                return;
            }
            if (
                img.type !== "image/jpeg" &&
                img.type !== "image/png" &&
                img.type !== "image/webp"
            ) {
                dispatch(
                    showDialog({
                        header: "Unsopported Format.",
                        msgs: [
                            {
                                msg: `${img.name} format is unsupported ! only JPEG,PNG,WEBP are allowed.`,
                                type: "error",
                            },
                        ],
                    })
                );
                files = files.filter((item) => item !== img.name);

            } else if (img.size > 1024 * 1024 * 10) {
                dispatch(
                    showDialog({
                        header: "Unsopported Format.",
                        msgs: [
                            {
                                msg: `${img.name} size is too large, maximum of 10mb allowed.`,
                                type: "error",
                            },
                        ],
                    })
                );

            } else {
                const reader = new FileReader();
                reader.readAsDataURL(img);
                reader.onload = (e: any) => {
                    setImages((images: any) => [...images, e.target.result]);
                };
            }
        });
    }
    const handleRemove = (image: any) => {
        setImages((images: any) => images.filter((item: any) => item !== image));
    };
    return (
        <div className="">
            <div className={"styles.flex"}>
                <span className="text-[27px] font-medium">
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
                    multiple
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
                            <span className="text-[#99a1b7] text-sm">Upload upto 10 files</span>
                        </div>
                    </div>
                    {/* <p className="text-sm mt-2">Set the product media gallery.</p> */}
                </div>
            ) : (
                <div className="flex w-full gap-2 items-center flex-wrap">
                    {images.map((img: any, i: any) => (
                        <div className={"flex relative"} key={i}>
                            {/* <div className={styles.blur}></div> */}
                            <Image
                                width={200}
                                height={200}
                                src={img}
                                alt="image upload"
                                className="w-[200px] object-cover h-[200px] rounded-[5px]"
                            />
                            <div className={"absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"}>
                                <div className="flex items-center justify-center bg-black text-white pb-3.5 gap-4 h-[40px] rounded-[4px] px-4 relative">
                                    <button onClick={() => handleRemove(img)}>
                                        <RiDeleteBin7Fill />
                                    </button>
                                    {/* <button onClick={() => setColorImage(img)}>
                        <GiExtractionOrb />
                      </button>
                      <button>
                        <RiShape2Line />
                      </button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ImagesUpload