/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { validateCreateHeader } from '@/utils/validation';
import { showDialog } from '@/store/dialogSlice';
import dataURItoBlob from '@/utils/dataURItoBlob';
import { uploadImages } from '@/requests/upload';
import AdminInput from '@/components/input/adminInput';
// import Images from '../createProduct/images';
import { useRouter } from 'next/router';
import LingualAdmin from '@/components/input/lingualAdmin';
import ImagesUpload from './ImagesUpload';
import VideosUpload from './VideoUpload';

// interface SliderProps {
//     _id: string;
//     images: [],
//     // alt: string,
//     video: [],
//     title: string,
//     description: string,
//     slug: string,
// }
// type HeaderProps = {
//     setHeaders: any;
//     headerData: {
//         _id: string;
//         title: string;
//         description: string;
//         images: string[];
//         video: string[];
//     };
//     headerId?: string;
//     headers: SliderProps[] // Add this to identify if it's an edit
// }

// const initialState = {
//     title: "",
//     description: "",
//     video: [],
//     images: [],
//     _id: "",
//     slug: "",
// }

interface SliderProps {
    _id: string;
    images: [],
    video: [],
    title: {
        en: string,
        fr: string
    },
    description: {
        en: string,
        fr: string
    },
    slug: string,
}

type HeaderProps = {
    setHeaders: any;
    headerData: {
        _id: string;
        title: {
            en: string,
            fr: string
        };
        description: {
            en: string,
            fr: string
        };
        images: string[];
        video: string[];
    };
    headerId?: string;
    headers: SliderProps[] // Add this to identify if it's an edit
}
const initialState = {
    title: { en: "", fr: "" },
    description: { en: "", fr: "" },
    video: [],
    images: [],
    _id: "",
    slug: "",
}

const CreateHeader: React.FC<HeaderProps> = ({ setHeaders, headerData, headers }) => {

    const [header, setHeader] = useState<any>(initialState);
    const [images, setImages] = useState<string[]>([]);
    const [video, setVideo] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { headerId } = router.query;
    // console.log("Header Id is:", headerId)
    const dispatch = useDispatch();

    // Function to convert URL to blob
    const urlToBlob = async (url: string): Promise<Blob> => {
        const response = await fetch(url);
        const blob = await response.blob();
        return blob;
    };

    useEffect(() => {
        if (headerId) {
            const existingHeader = headers.find((header) => header._id === headerId);
            if (existingHeader) {
                setHeader(existingHeader);
                setImages(existingHeader.images.map((img: any) => img.url));
                setVideo(existingHeader.video.map((vid: any) => vid.url));
            }
        }
    }, [headers, headerId]);


    // const validate = Yup.object({
    //     title: Yup.string().required("Header title is required").min(5, "Title must be more than 8 characters").max(100, "Title must be between 8 and 30 characteres"),
    //     description: Yup.string().required("Description is required").min(5, "Description must be more than 5 characters").max(150, "Description must be between 5 and 150 characteres"),
    // })
    const validate = Yup.object({
        title: Yup.object({
            en: Yup.string().required("Header title in English is required").min(5, "Title must be more than 5 characters").max(100, "Title must be between 5 and 100 characters"),
            fr: Yup.string().required("Header title in French is required").min(5, "Title must be more than 5 characters").max(100, "Title must be between 5 and 100 characters"),
        }),
        description: Yup.object({
            en: Yup.string().required("Description in English is required").min(5, "Description must be more than 5 characters").max(150, "Description must be between 5 and 150 characters"),
            fr: Yup.string().required("Description in French is required").min(5, "Description must be more than 5 characters").max(150, "Description must be between 5 and 150 characters"),
        }),
    });
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { value, name } = e.target;
    //     setHeader({ ...header, [name]: value });
    //     // setHeaders({ ...header, [name]: value });
    // }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        const [field, lang] = name.split('.');
        setHeader({ ...header, [field]: { ...header[field], [lang]: value } });
    };

    // let uploaded_images: never[] = [];
    const createHeaderHandler = async () => {
        setLoading(true);
        let uploaded_images: any = [];
        let uploaded_video: any = [];

        if (images && images.length > 0) {
            const imageBlobs = await Promise.all(images.map(urlToBlob));
            const imageFormData = new FormData();
            imageFormData.append("path", "header images");
            imageBlobs.forEach((image, index) => {
                console.log(`Appending image ${index + 1}: ${image.type}`);
                imageFormData.append("file", image);
            });
            uploaded_images = await uploadImages(imageFormData);
        }

        if (video && video.length > 0) {
            const videoBlobs = await Promise.all(video.map(urlToBlob));
            const videoFormData = new FormData();
            videoFormData.append("path", "header videos");
            videoBlobs.forEach((file, index) => {
                console.log(`Appending video ${index + 1}: ${file.type}`);
                videoFormData.append("file", file);
            });
            uploaded_video = await uploadImages(videoFormData);
        }

        // if (images && images.length > 0) {
        //     const temp = images.map((img) => dataURItoBlob(img));
        //     console.log("Converted Image Blobs:", temp); // Log converted video Blobs

        //     const path = "header images";
        //     const formData = new FormData();
        //     formData.append("path", path);
        //     temp.forEach((image: any, index) => {
        //         console.log(`Appending image ${index + 1}: ${image.type}`);
        //         formData.append("file", image);
        //     });
        //     uploaded_images = await uploadImages(formData);
        // }
        // if (video && video.length > 0) {
        //     console.log("Received video files:", video); // Log received video files
        //     const path = "header videos";
        //     const formData = new FormData();
        //     formData.append('path', path);
        //     video.forEach((file: any, index) => {
        //         console.log(`Appending video ${index + 1}: ${file.type}`);
        //         formData.append("file", file);
        //     });
        //     uploaded_video = await uploadImages(formData);
        // }

        try {
            setLoading(true);
            const url = headerId ? `/api/admin/home/header` : "/api/admin/home/header"
            const method = headerId ? "put" : "post";

            // const { data } = await axios.post("/api/admin/home/header", {
            // ...header,
            // images: uploaded_images.length ? uploaded_images : [],
            // video: uploaded_video.length ? uploaded_video : [],
            // });

            const { data } = await axios({
                method,
                url,
                data: {
                    ...header,
                    images: uploaded_images.length ? uploaded_images : [],
                    video: uploaded_video.length ? uploaded_video : [],
                    id: headerId || null
                }
            })
            setLoading(false);
            toast.success(data.message);
            setHeaders(data.header);
            // setHeaders((prev: any) => [...prev, data]);
        } catch (error: any) {
            setLoading(false);
            toast.error(error.response.data.message)
        }
    }


    const createHeader = async () => {
        const validationMessage = validateCreateHeader(images, video);
        if (validationMessage === "valid") {
            createHeaderHandler();
        } else {
            dispatch(
                showDialog({
                    header: "Please fill all product information",
                    msgs: validationMessage
                })
            )
        }
        // router.push("/admin/dashboard/home/headers")
    }

    // const []
    return (
        <Formik
            enableReinitialize
            initialValues={{
                title: header.title,
                description: header.description,
                imageFileInput: "",
            }}
            // initialValues={{
            //     title: { en: header.title.en || "", fr: header.title.fr || "" },
            //     description: { en: header.description.en || "", fr: header.description.fr || "" },
            //     imageFileInput: "",
            // }}
            validationSchema={validate}
            onSubmit={() => {
                createHeader();
            }}
        >
            {() => (
                <Form>
                    <div className="w-full bg-white border-borderColor p-[30px] flex flex-col border rounded-[8px] border-solid mb-10">
                        <h1 className="text-[28px] font-medium mb-6">General</h1>
                        {/* <AdminInput
                            type="text"
                            label="Header title"
                            name="title"
                            placeholder="Product name"
                            onChange={handleChange}
                        />
                        <p className="text-[#99a1b7] mt-2 text-[15px]">Slider name is required and recommended to be unique</p>
                        <AdminInput
                            type="textarea"
                            label="Description"
                            name="description"
                            placeholder="Description"
                            onChange={handleChange}
                        /> */}
                        <LingualAdmin
                            type="text"
                            label="Header title"
                            name="title"
                            placeholder="Header title"
                            languages={['en', 'fr']}
                            onChange={handleChange}
                        />
                        <p className="text-[#99a1b7] mt-2 text-[15px]">Slider name is required and recommended to be unique</p>
                        <LingualAdmin
                            type="textarea"
                            label="Description"
                            name="description"
                            placeholder="Description"
                            languages={['en', 'fr']}
                            onChange={handleChange}
                        />

                        <ImagesUpload
                            name="imageInputFile"
                            header="Media"
                            text="Add images"
                            images={images}
                            setImages={setImages}
                        />
                        <VideosUpload
                            name="videoInputFile"
                            header="Media"
                            text="Add Videos"
                            video={video}
                            setVideo={setVideo}
                        />
                    </div>
                    <button
                        className={`${"py-[7.4px]  px-[20px] rounded-[5px] bg-[#1b84ff] text-white"} ${"styles.btn__primary"} ${"styles.submit_btn"}`}
                        type="submit"
                    >
                        {headerId ? "Update Header" : "Create Header"}
                    </button>
                </Form>
            )}
        </Formik>
    )
}
export default CreateHeader