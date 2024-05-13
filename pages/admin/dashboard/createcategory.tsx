import CreateCategory from '@/components/admin/categories/createCategory'
import CreateCategoryHeader from '@/components/admin/categories/createHeader'
import AdminLayout from '@/components/admin/layout'
import Category from '@/models/Category'
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

type CatProps = {
    categories: Props[];
    // setSubCategories?: Props;
}

const Createcategory: React.FC<CatProps> = ({ categories }) => {

    const [data, setData] = useState(categories);

    return (
        <div>
            <AdminLayout>
                <CreateCategoryHeader />
                <CreateCategory setCategories={setData} />
            </AdminLayout>
        </div>
    )
}


export default Createcategory

export async function getServerSideProps() {
    await db.connectDb();
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();

    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
        },
    };
}