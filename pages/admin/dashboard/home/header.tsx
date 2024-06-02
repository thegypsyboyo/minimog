/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import AdminLayout from '@/components/admin/layout'
import React, { useEffect, useState } from 'react'
import db from '@/utils/db';
import Header from '@/models/home/Header';
import CreateHeader from '@/components/admin/home/createHeader';

interface SliderProps {
    _id: string;
    images: [],
    video: [],
    title: string,
    description: string,
    slug: string,
}
type HeaderProps = {
    headers: SliderProps[];
}
const HeaderPage: React.FC<HeaderProps> = ({ headers }) => {

    const [data, setData] = useState<SliderProps[]>(headers);
    const [editingHeader, setEditingHeader] = useState<SliderProps | any>(null);

    const handleEditClick = (header: SliderProps) => {
        setEditingHeader(header);
    }

    return (
        <AdminLayout>

            <CreateHeader
                setHeaders={setData}
                headers={headers}
                headerData={editingHeader}
                headerId={editingHeader?._id}
            />
        </AdminLayout>
    )
}

export default HeaderPage

export async function getServerSideProps(ctx: any) {
    await db.connectDb();
    const results = await Header.find().lean();
    // console.log("results:", results)
    await db.disconnectDb();
    return {
        props: {
            headers: JSON.parse(JSON.stringify(results))
        }
    }

}