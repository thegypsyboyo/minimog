/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
import { useEffect, useState } from "react";
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
    ChevronLeft,
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Upload,
    Users2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import db from "../../../../utils/db";
import Product from "../../../../models/Product";
import Category from "../../../../models/Category";
import SingularSelect from "../../../../components/selects/singularSelect";
import MultipleSelect from "../../../../components/selects/multipleSelect";
import AdminInput from "../../../../components/input/adminInput";
import DialogModal from "../../../../components/dialogModal";
import { showDialog } from "../../../../store/dialogSlice";
import Images from "../../../../components/admin/createProduct/images";
import Colors from "../../../../components/admin/createProduct/colors";
import Style from "../../../../components/admin/createProduct/style";
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
export default function Create({ parents, categories }: any) {
    const [product, setProduct] = useState(initialState);
    const [subs, setSubs] = useState([]);
    const [colorImage, setColorImage] = useState("");
    const [images, setImages] = useState([]);
    //   const [description_images, setDescription_images] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    console.log(product);
    // useEffect(() => {
    //     const getParentData = async () => {
    //         const { data } = await axios.get(`/api/product/${product.parent || undefined}`);
    //         // console.log(data);
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
    const createProduct = async () => {
        const test = validateCreateProduct(product, images);
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
        if (images) {
            const temp = images.map((img) => dataURItoBlob(img));
            const path = "product images";
            const formData = new FormData();
            formData.append("path", path);
            temp.forEach((image) => {
                formData.append("file", image);
            });
            uploaded_images = await uploadImages(formData);
        }
        if (product.color.image) {
            const temp = dataURItoBlob(product.color.image);
            const path = "product style images";
            const formData = new FormData();
            formData.append("path", path);
            formData.append("file", temp);
            const cloudinary_style_img = await uploadImages(formData);
            style_img = cloudinary_style_img[0].url;
        }
        try {
            const { data } = await axios.post("/api/admin/product", {
                ...product,
                images: uploaded_images,
                color: {
                    image: style_img,
                    color: product.color.color,
                },
            });
            setLoading(false);
            toast.success(data.message);
        } catch (error: any) {
            setLoading(false);
            toast.error(error.response.data.message);
        }
    };
    return (
        <AdminLayout>
            {/* <div className={"styles.header"}>Create Product</div> */}
            {loading ? "loading ..." : ""}

            {/* <ProductHeader /> */}
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
                        sku: product.sku,
                        discount: product.discount,
                        color: product.color.color,
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
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <AdminInput
                                                            type="text"
                                                            label="Sku"
                                                            name="sku"
                                                            placholder="Product sku/ number"
                                                            onChange={handleChange}
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
                                                            sizes={product.sizes}
                                                            product={product}
                                                            setProduct={setProduct}
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
                                                <div className="flex gap-5 items-center justify-end mt-8">
                                                    <span className="text-xl">
                                                        Cancel
                                                    </span>
                                                    <button
                                                        className={`${"py-[7.4px]  px-[20px] rounded-[5px] bg-[#1b84ff] text-white"} ${"styles.btn__primary"} ${"styles.submit_btn"}`}
                                                        type="submit"
                                                    >
                                                        Create Product
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
                                                    />
                                                    <div className={"flex items-center gap-3 mt-5"}>
                                                        {product.color.image && (
                                                            <Image
                                                                src={product?.color?.image}
                                                                width={900}
                                                                height={900}
                                                                className={"w-[40px] h-[40px] object-cover rounded-full"}
                                                                alt=""
                                                            />
                                                        )}
                                                        {product.color.color && (
                                                            <span
                                                                className={"w-[40px] h-[40px] rounded-full"}
                                                                style={{ background: `${product.color.color}` }}
                                                            ></span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="w-full border border-borderColor rounded-[8px] px-[30px] py-[20px] bg-white mt-8 flex flex-col items-start">
                                                    <div className="">
                                                        <Colors
                                                            name="color"
                                                            product={product}
                                                            setProduct={setProduct}
                                                            colorImage={colorImage}
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <Style
                                                            name="styleInput"
                                                            product={product}
                                                            setProduct={setProduct}
                                                            colorImage={colorImage}
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
                                                    <Card x-chunk="dashboard-07-chunk-2">
                                                        <CardHeader>
                                                            <CardTitle>Product Category</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="grid gap-6 sm:grid-cols-1">
                                                                <div className="grid gap-3">
                                                                    <Label htmlFor="category">Category</Label>
                                                                    <Select>
                                                                        <SelectTrigger
                                                                            id="category"
                                                                            aria-label="Select category"
                                                                        >
                                                                            <SelectValue placeholder="Select category" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="clothing">Clothing</SelectItem>
                                                                            <SelectItem value="electronics">
                                                                                Electronics
                                                                            </SelectItem>
                                                                            <SelectItem value="accessories">
                                                                                Accessories
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div className="grid gap-3">
                                                                    <Label htmlFor="subcategory">
                                                                        Subcategory (optional)
                                                                    </Label>
                                                                    <Select>
                                                                        <SelectTrigger
                                                                            id="subcategory"
                                                                            aria-label="Select subcategory"
                                                                        >
                                                                            <SelectValue placeholder="Select subcategory" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="t-shirts">T-Shirts</SelectItem>
                                                                            <SelectItem value="hoodies">Hoodies</SelectItem>
                                                                            <SelectItem value="sweatshirts">
                                                                                Sweatshirts
                                                                            </SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
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

export async function getServerSideProps() {
    db.connectDb();
    const results = await Product.find().select("name subProducts").lean();
    const categories = await Category.find().lean();
    db.disconnectDb();
    return {
        props: {
            parents: JSON.parse(JSON.stringify(results)),
            categories: JSON.parse(JSON.stringify(categories)),
        },
    };
}
