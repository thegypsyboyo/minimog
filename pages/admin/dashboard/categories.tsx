import CategoryHeader from '@/components/admin/categories/header'
import ListCategories from '@/components/admin/categories/listCategories'
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

const Categories: React.FC<CatProps> = ({ categories }) => {

    const [data, setData] = useState(categories)
    console.log("Categories Data:", data);
    return (
        <div>
            <AdminLayout >
                <div className="">
                    <CategoryHeader />
                    <ListCategories categories={data} setSubCategories={setData} />
                </div>
            </AdminLayout>
        </div>
    )
}

export default Categories

export async function getServerSideProps() {
    await db.connectDb();
    const categories = await Category.find({}).sort({ updatedAt: -1 }).lean();

    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
        },
    };
}