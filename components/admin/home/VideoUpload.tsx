/* eslint-disable no-shadow */
import React, { useRef } from 'react';
import { ErrorMessage, useField } from "formik";
import { RiDeleteBin7Fill, RiUploadCloud2Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { showDialog } from '@/store/dialogSlice';

const VideosUpload = ({ video, setVideo, header, name }: any) => {
    const dispatch = useDispatch();
    const fileInput = useRef<any>(null);
    const [field, meta] = useField(name);

    const handleVideos = async (e: any) => {
        const files = Array.from(e.target.files);
        console.log("Selected video files:", files); // Log selected video files

        files.forEach(async (file: any) => {
            if (video.length === 1) {
                dispatch(
                    showDialog({
                        header: "Maximum 1 video is allowed.",
                        msgs: [
                            {
                                msg: `Maximum of total 1 video is allowed.`,
                                type: "error",
                            },
                        ],
                    })
                );
                return;
            }

            if (!file.type.startsWith('video')) {
                dispatch(
                    showDialog({
                        header: "Unsupported Format",
                        msgs: [
                            {
                                msg: `${file.name} format is unsupported! Only videos are allowed.`,
                                type: "error",
                            },
                        ],
                    })
                );
                return;
            }

            if (file.size > 1024 * 1024 * 100) {
                dispatch(
                    showDialog({
                        header: "File Size Limit Exceeded",
                        msgs: [
                            {
                                msg: `${file.name} size is too large, maximum of 100mb allowed.`,
                                type: "error",
                            },
                        ],
                    })
                );
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async (e: any) => {
                const videoDataUrl = e.target.result;
                setVideo((prevVideos: any) => [...prevVideos, videoDataUrl]);
            };
        });
    };

    const handleRemove = (video: any) => {
        setVideo((prevVideos: any) => prevVideos.filter((vid: any) => vid !== video));
    };


    return (
        <div>
            <div>
                <span className="text-[27px] font-medium">{header}</span>
            </div>
            <span>
                {meta.touched && meta.error && (
                    <div className="text-red-600">
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
                    accept="video/mp4,video/quicktime"
                    onChange={handleVideos}
                />
            </div>
            {!video.length ? (
                <div>
                    <div onClick={() => fileInput?.current.click()}>
                        <RiUploadCloud2Fill />
                        <h1>Drop files here or click to upload</h1>
                        <span>Upload up to 10 videos</span>
                    </div>
                </div>
            ) : (
                <div>
                    {video.map((video: any, index: number) => (
                        <div key={index}>
                            <video width={200} height={200} controls>
                                <source src={video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <button onClick={() => handleRemove(video)}>
                                <RiDeleteBin7Fill />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VideosUpload;
