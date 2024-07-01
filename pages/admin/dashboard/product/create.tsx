/* eslint-disable no-shadow */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
// import styles from "../../../../styles/products.module.scss";
// import Layout from "../../../../components/admin/layout";
import ProductHeader from "@/components/admin/product/productHeader";
import Image from "next/image";
import { IoMdCreate } from "react-icons/io";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { ClipLoader } from "react-spinners";
import { WeekNumberLabel } from "react-day-picker";
import SingularSelect from "@/components/selects/singularSelect";
import Style from "@/components/admin/createProduct/style";
import db from "../../../../utils/db";
import Product from "../../../../models/Product";
import Category from "../../../../models/Category";
import MultipleSelect from "../../../../components/selects/multipleSelect";
import AdminInput from "../../../../components/input/adminInput";
import { showDialog } from "../../../../store/dialogSlice";
import Images from "../../../../components/admin/createProduct/images";
import Colors from "../../../../components/admin/createProduct/colors";
import Sizes from "../../../../components/admin/createProduct/clickToAdd/Sizes";
import Details from "../../../../components/admin/createProduct/clickToAdd/Details";
import Questions from "../../../../components/admin/createProduct/clickToAdd/Questions";
import { validateCreateProduct } from "../../../../utils/validation";
import dataURItoBlob from "../../../../utils/dataURItoBlob";
import { uploadImages } from "../../../../requests/upload";
import AdminLayout from "../../../../components/admin/layout";


const initialState = {
    name: "",
    description: "",
    brand: "",
    sku: "",
    discount: 0,
    images: [],
    description_images: [],
    parent: "",
    category: "",
    subCategories: [],
    color: {
        color: "",
        image: "",
    },
    sizes: [
        {
            size: "",
            qty: "",
            price: "",
        },
    ],
    details: [
        {
            name: "",
            value: "",
        },
    ],
    questions: [
        {
            question: "",
            answer: "",
        },
    ],
    shippingFee: "",
};

// interface ColorImageProps {
//     color: string,
//     image: string,
// }

interface SizesProps {
    price: number;
    qty: number;
    size: string;
    _id: string;
}

export default function Create({ parents, categories, products }: any) {
    const [product, setProduct] = useState(initialState);
    const [error, setError] = useState("");
    const [subs, setSubs] = useState([]);
    const [colorImage, setColorImage] = useState<any>();
    const [imageColor, setImageColor] = useState("");
    const [images, setImages] = useState([]);
    const [sizes, setSizes] = useState<SizesProps[]>([]);
    const [sku, setSku] = useState("");
    const [discount, setDiscount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();


    const { headerId } = router.query;

    console.log("COlor Image object after ading:", colorImage);
    // console.log("Checking products:", products.subProducts[0].color.color);

    useEffect(() => {
        if (headerId) {
            const existingProduct = products;
            if (existingProduct) {
                setProduct(existingProduct);
                setImages(existingProduct.subProducts[0].images?.map((img: any) => img.url));
                setColorImage(existingProduct.subProducts[0].color);
                setSizes(existingProduct.subProducts[0].sizes.map((ohk: any) => ohk));
                setSku(existingProduct.subProducts[0].sku);
                setDiscount(existingProduct.subProducts[0].discount)
            }
        }
    }, [headerId, products]);

    console.log("Color Images:", colorImage?.image)
    console.log("Subproduct SKU:", sku);
    console.log("Subproduct DIscount:", discount);

    // useEffect(() => {
    //     const getParentData = async () => {
    //         const { data } = await axios.get(`/api/product/${product.parent}`);
    //         console.log(data);
    //         if (data) {
    //             setProduct({
    //                 ...product,
    //                 name: data.name,
    //                 description: data.description,
    //                 brand: data.brand,
    //                 category: data.category,
    //                 subCategories: data.subCategories,
    //                 questions: [],
    //                 details: [],
    //             });
    //         }
    //     };
    //     getParentData();
    // }, [product, product.parent]);
    useEffect(() => {
        async function getSubs() {
            const { data } = await axios.get("/api/admin/subCategory", {
                params: {
                    category: product.category,
                },
            });
            console.log(data);
            setSubs(data);
        }
        getSubs();
    }, [product.category]);
    const handleChange = (e: any) => {
        const { value, name } = e.target;
        setProduct({ ...product, [name]: value });
    };


    const validate = Yup.object({
        name: Yup.string()
            .required("Please add a name")
            .min(10, "Product name must bewteen 10 and 300 characters.")
            .max(300, "Product name must bewteen 10 and 300 characters."),
        brand: Yup.string().required("Please add a brand"),
        category: Yup.string().required("Please select a category."),
        /*
        subCategories: Yup.array().min(
          1,
          "Please select atleast one sub Category."
        ),
       */
        sku: Yup.string().required("Please add a sku/number"),
        color: Yup.string().required("Please add a color"),
        description: Yup.string().required("Please add a description"),
    });

    const urlToBlob = async (url: string): Promise<Blob> => {
        const response = await fetch(url);
        const blob = await response.blob();
        return blob;
    };

    const createProduct = async () => {
        const test = validateCreateProduct(product, images, colorImage, sizes);
        if (test === "valid") {
            createProductHandler();
        } else {
            dispatch(
                showDialog({
                    header: "Please follow our instructions.",
                    msgs: test,
                })
            );
        }
    };
    let uploaded_images: any = [];
    let style_img = "";
    const createProductHandler = async () => {
        setLoading(true);
        if (images && images.length > 0) {
            const imageBlobs = await Promise.all(images.map(urlToBlob));
            const imageFormData = new FormData();
            imageFormData.append("path", "product images");
            imageBlobs.forEach((image, index) => {
                console.log(`Appending image ${index + 1}: ${image.type}`);
                imageFormData.append("file", image);
            });
            uploaded_images = await uploadImages(imageFormData);
        }

        if (colorImage?.image && typeof colorImage.image !== 'string') {
            const temp = colorImage.image;
            console.log("Temp data:", temp)
            const path = "product style images";
            const formData = new FormData();
            formData.append("path", path);
            formData.append("file", temp);
            const cloudinary_style_img = await uploadImages(formData);
            style_img = cloudinary_style_img[0].url;
        } else if (typeof colorImage?.image === 'string') {
            // If colorImage.image is a URL
            style_img = colorImage.image;
        }

        try {
            const url = "/api/admin/product";
            const method = headerId ? "put" : "post";

            const { data } = await axios({
                method,
                url,
                data: {
                    ...product,
                    images: uploaded_images,
                    color: {
                        image: style_img,
                        color: colorImage?.color,
                    },
                    id: headerId,
                    sizes,
                    discount,
                    sku,
                }
            })
            setError("");
            setLoading(false);
            toast.success(data.message);
        } catch (error: any) {
            setError(error.response.data.message);
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };
    return (
        <AdminLayout>
            <div className="">
                <Formik
                    enableReinitialize
                    initialValues={{
                        name: product.name,
                        brand: product.brand,
                        description: product.description,
                        category: product.category,
                        subCategories: product.subCategories,
                        parent: product.parent,
                        sku: sku,
                        discount: discount,
                        color: colorImage?.color,
                        imageInputFile: "",
                        // styleInout: "py-[20px] px-[20px] mt-8 bg-white",
                    }}
                    validationSchema={validate}
                    onSubmit={() => {
                        createProduct();
                    }}
                    className=""
                >
                    {(formik) => (
                        <Form className="w-full pb-10">
                            <div className="bg-white p-5">
                                <div className="w-full bg-white  flex items-start overflow-hidden mt-8 relative">
                                </div>
                                <div className="grid flex-1 items-start gap-4 px-0 sm:py-0 md:gap-8">
                                    <div className="mx-auto grid w-full gap-4">
                                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 ">
                                                <Card x-chunk="dashboard-07-chunk-0">
                                                    <CardHeader>
                                                        <CardTitle>Product Details</CardTitle>
                                                        <CardDescription>
                                                            Add product information like title and description here
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="grid gap-6">
                                                            <div className="grid gap-3">
                                                                <AdminInput
                                                                    type="text"
                                                                    label="Product Name"
                                                                    name="name"
                                                                    placeholder="Product name"
                                                                    onChange={handleChange}
                                                                />
                                                                <AdminInput
                                                                    type="text"
                                                                    label="Product Description"
                                                                    name="description"
                                                                    placeholder="Product description"
                                                                    onChange={handleChange}
                                                                />

                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                                <div className="w-full border border-borderColor rounded-[8px]  px-[30px] py-[20px] mt-0 bg-white">
                                                    <div className="">
                                                        <h1 className="text-[28px] font-medium mb-6">Advanced Options </h1>
                                                    </div>
                                                    <div className="mt-7">
                                                        <AdminInput
                                                            type="text"
                                                            label="Discount"
                                                            name="discount"
                                                            placholder="Product discount"
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setDiscount(e.target.valueAsNumber)}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <AdminInput
                                                            type="text"
                                                            label="Sku"
                                                            name="sku"
                                                            placholder="Product sku/ number"
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setSku(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="mt-7">
                                                        <AdminInput
                                                            type="text"
                                                            label="Brand"
                                                            name="brand"
                                                            placholder="Product brand"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full border border-borderColor rounded-[8px]  px-[30px] py-[20px] mt-0 bg-white">
                                                    <div className="">
                                                        <h1 className="text-[28px] font-medium mb-6">Advanced Options </h1>
                                                    </div>
                                                    <div className="mt-7">
                                                        <Sizes
                                                            sizes={sizes}
                                                            // product={product}
                                                            // setProduct={setProduct}
                                                            setSizes={setSizes}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-full border border-borderColor rounded-[8px]  px-[30px] py-[20px] mt-0 bg-white">
                                                    <div className="">
                                                        <h1 className="text-[28px] font-medium mb-6">Advanced Options </h1>
                                                    </div>
                                                    <div className="mt-7">
                                                        <Details
                                                            details={product.details}
                                                            product={product}
                                                            setProduct={setProduct}
                                                        />
                                                    </div>
                                                    <div className="mt-7">
                                                        <Questions
                                                            questions={product.questions}
                                                            product={product}
                                                            setProduct={setProduct}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex gap-5 items-center mt-4">
                                                    <button
                                                        className={`bg-blue-600 py-2.5 rounded-[3px] px-8 text-white ${loading ? "cursor-not-allowed" : ""}`}
                                                        type="submit"
                                                        disabled={loading}
                                                    >
                                                        {loading && <ClipLoader loading={loading} />}
                                                        {headerId ? "Update product" : "Create Product"}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="items-start lg:gap-0">
                                                <div className="w-full mt-0">
                                                    <Images
                                                        name="imageInputFile"
                                                        header="Media"
                                                        text="Add images"
                                                        images={images}
                                                        setImages={setImages}
                                                        setColorImage={setColorImage}
                                                        setImageColor={setImageColor}
                                                    />
                                                    <div className={"flex items-center gap-3 mt-5"}>
                                                        {colorImage?.image && (
                                                            <Image
                                                                src={colorImage?.image}
                                                                width={900}
                                                                height={900}
                                                                className={"w-[40px] h-[40px] object-cover rounded-full"}
                                                                alt=""
                                                            />
                                                        )}
                                                        {/* {colorImage?.color && (
                                                            <span
                                                                className={"w-[40px] h-[40px] rounded-full"}
                                                                style={{ background: colorImage.color }}
                                                            ></span>
                                                        )} */}
                                                        {colorImage?.color && (
                                                            <span
                                                                className={"w-[40px] h-[40px] rounded-full"}
                                                                style={{ background: colorImage.color }}
                                                            ></span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="w-full border border-borderColor rounded-[8px] px-[30px] py-[20px] bg-white mt-8 flex flex-col items-start">
                                                    <div className="">
                                                        <Colors
                                                            name="color"
                                                            // product={product}
                                                            // setProduct={setProduct}
                                                            colorImage={colorImage}
                                                            setColorImage={setColorImage}
                                                            imageColor={imageColor}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <Style
                                                            name="styleInput"
                                                            // product={product}
                                                            // setProduct={setProduct}
                                                            colorImage={colorImage}
                                                            setColorImage={setColorImage}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    {/* <SingularSelect
                                                        name="parent"
                                                        value={product.parent}
                                                        placeholder="Parent product"
                                                        data={parents}
                                                        header="Add to an existing product"
                                                        handleChange={handleChange}
                                                    /> */}
                                                    <SingularSelect
                                                        name="category"
                                                        value={product.category}
                                                        placeholder="Category"
                                                        data={categories}
                                                        header="Select a Category"
                                                        handleChange={handleChange}
                                                        disabled={product.parent}
                                                    />
                                                    {product.category && (
                                                        <MultipleSelect
                                                            value={product.subCategories}
                                                            data={subs}
                                                            header="Select SubCategories"
                                                            name="subCategories"
                                                            disabled={product.parent}
                                                            handleChange={handleChange}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>

        </AdminLayout>
    );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

    const { query } = ctx;

    const headerId = query.headerId || null;

    db.connectDb();
    const results = await Product.find().select("name subProducts").lean();
    const products = await Product.findById(headerId).lean();
    // console.log("Products:", products)
    const categories = await Category.find().lean();
    db.disconnectDb();
    return {
        props: {
            parents: JSON.parse(JSON.stringify(results)),
            categories: JSON.parse(JSON.stringify(categories)),
            products: JSON.parse(JSON.stringify(products))
        },
    };
}
