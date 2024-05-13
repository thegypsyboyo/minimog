import AdminInput from '@/components/input/adminInput';
import axios from 'axios';
import { Form, Formik } from 'formik';
import Router from 'next/router';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import * as Yup from "yup"

type CatProps = {
    setCategories?: any;
    // setSubCategories?: Props;
}
const CreateCategory: React.FC<CatProps> = ({ setCategories }) => {

    const [name, setName] = useState<string>("");

    const validate = Yup.object({
        name: Yup.string().required("Category name is required").min(2, "Category must be more than 2 characters").max(30, "Category must be between 2 and 30 characteres")
    });

    const submitHandler = async () => {
        try {
            const { data } = await axios.post("/api/admin/category", { name });
            setCategories(data.categories);
            setName("");
            toast.success(data.message);
            Router.push("/admin/dashboard/categories")
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (

        <div>
            <Formik
                enableReinitialize
                initialValues={{ name }}
                validationSchema={validate}
                onSubmit={() => {
                    submitHandler()
                }}
            >
                {() => (
                    <Form className="bg-white text-black mt-[30px] px-[2.25rem] py-[20px]">
                        <div className="">
                            <AdminInput
                                type="text"
                                label="Category name"
                                name="name"
                                placeholder="Category name"
                                onChange={(e: any) => setName(e.target.value)}
                            />
                            <div className={"w-full flex justify-between items-center mt-6"}>
                                <span></span>
                                <button className={`py-[8px] px-[30px] rounded-[5px] bg-blue-500 text-white `}>
                                    Add Category
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateCategory