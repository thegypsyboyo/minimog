import React from 'react'
import { useSelector } from "react-redux";

import Layout from '@/components/layout';
import DialogModal from "@/components/dialogModal/index"
import Sidebar from "./sibebar"
import AdminNavbar from './navbar';

type LayoutType = {
    children: React.ReactNode;
    // className?: string,
}
const AdminLayout: React.FC<LayoutType> = ({ children }) => {

    const { expandSidebar } = useSelector((state) => ({ ...(state as Record<string, any>) }));
    const showSidebar = expandSidebar?.expandSidebar;
    // const dispatch = useDispatch();

    return (
        <div className="relative">
            <DialogModal type={undefined} />
            <Sidebar />
            <div
                className={`${showSidebar ? "md:ml-[250px]" : "md:ml-[80px]"} transition-all duration-200 ease-in`}
            >
                <AdminNavbar />
                <Layout className='min-h-screen bg-[#ecf0fa] pt-[100px]'>
                    {children}
                </Layout>
            </div>
        </div>
    )
}


export default AdminLayout