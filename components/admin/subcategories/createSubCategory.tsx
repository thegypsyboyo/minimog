import AdminInput from '@/components/input/adminInput';
import SingularSelect from '@/components/selects/singularSelect';
import axios from 'axios';
import { Form, Formik } from 'formik';
import React, { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify';
import * as Yup from "yup"

interface Props {
    _id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
// interface SubCategoryProps {
//     name: string;
//     slug: string;
//     parent: any;
// }

type SubCatProps = {
    setSubCategories: any;
    categories: Props[];
}


const CreateSubCategory: React.FC<SubCatProps> = ({ categories, setSubCategories }) => {
    // console.log("Categories:", categories);
    // console.log("SUbCategories:", subCategories);
    const [name, setName] = useState<string>("");
    const [parent, setParent] = useState<string>("");

    const validate = Yup.object({
        name: Yup.string()
            .required("SubCategory name is required.")
            .min(2, "SubCategory name must be bewteen 2 and 30 characters.")
            .max(30, "SubCategory name must be bewteen 2 and 30 characters."),
        // .matches(
        //     /^[a-zA-Z\s]*$'/,
        //     "Numbers and special charcters are not allowed."
        // ),
        parent: Yup.string().required("Please choose a parent category."),
    });

    const submitHandler = async () => {
        try {
            const { data } = await axios.post("/api/admin/subCategory", {
                name,
                parent,
            });
            setSubCategories(data.subCategories);
            setName("");
            setParent("");
            toast.success(data.message);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{ name, parent }}
            validationSchema={validate}
            onSubmit={() => {
                submitHandler();
            }}
        >
            {() => (
                <Form className="bg-white text-black mt-[30px] px-[2.25rem] py-[20px]">
                    <AdminInput
                        label='Subcategory name'
                        name="name"
                        placeholder='Subcategory name'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                    <SingularSelect
                        data={categories}
                        name="parent"
                        handleChange={(e: ChangeEvent<HTMLInputElement>) => setParent(e.target.value)}
                        value={parent}
                    />
                    <div className={"w-full flex justify-between items-center mt-6"}>
                        <span></span>
                        <button className={`py-[8px] px-[30px] rounded-[5px] bg-blue-500 text-white `}>
                            Add SubCategory
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default CreateSubCategory