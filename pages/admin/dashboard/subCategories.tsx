/* eslint-disable no-unused-vars */
import AdminLayout from '@/components/admin/layout'
import CreateSubCategory from '@/components/admin/subcategories/createSubCategory'
import SubHeader from '@/components/admin/subcategories/subHeader'
import Category from '@/models/Category'
import SubCategory from '@/models/SubCategory'
import db from '@/utils/db'
import React, { useState } from 'react'

interface Props {
    _id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface SubCategoryProps {
    name: string;
    slug: string;
    parent: any;
}

type SubCatProps = {
    setSubCategories: any;
    subCategories: SubCategoryProps[];
    categories: Props[];
}

const SubCategories: React.FC<SubCatProps> = ({ setSubCategories, subCategories, categories }) => {
    const [name, setName] = useState<SubCategoryProps[]>(subCategories);
    return (
        <div>
            <AdminLayout>
                <SubHeader />
                <CreateSubCategory categories={categories} setSubCategories={setName} />
            </AdminLayout>
        </div>
    )
}



export default SubCategories

export async function getServerSideProps() {
    await db.connectDb();
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();
    const subCategories = await SubCategory.find({})
        .populate({ path: "parent", model: Category })
        .sort({ updatedAt: -1 })
        .lean();

    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
        }
    }

}