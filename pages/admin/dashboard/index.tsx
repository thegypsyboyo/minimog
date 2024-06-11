import AdminLayout from '@/components/admin/layout'
import React from 'react'
import { FaArrowCircleUp } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import User from '@/models/User'
import Product from '@/models/Product'
import Charts from './charts/chart'
// import RecentOrers from './orders'
import Products from './homeDashboard/products'
import Users from './homeDashboard/users'
// import Order from '@/models/Order'

const AdminDashboard = ({ products, users }: any) => {
    const { data: session } = useSession();
    // console.log("Session", session);
    return (
        <div>
            <AdminLayout>
                <div className="text-[15px] font-medium uppercase">
                    Hi, welcome back {session?.user?.name}
                </div>
                <div className="mt-9 grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
                    <div className={`bg-bluegradient pr-[10px] rounded-[7px] flex flex-col border-solid border-[1px] border-[#deebfd] shadow-shadow-light overflow-hidden`} >
                        <div className="px-[1em] pt-3 pb-2 text-white">
                            <div className="">
                                <h6 className="mb-3 tx-12 text-white">TODAY&apos;S ORDERS</h6>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="">
                                    <div className="w-full">
                                        <h4 className="text-[20px] font-bold mb-1 text-white">$5,74.12</h4>
                                        <p className="mb-0 text-[12px] text-white opacity-70">Compared to last week</p>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end">
                                    <span className="flex items-center gap-2">
                                        <FaArrowCircleUp className='text-sm' />
                                        <span className="text-white text-base opacity-70"> +427</span>
                                    </span>
                                </div>
                            </div>
                            <div className="h-[30px]"></div>
                        </div>
                    </div>
                    <div className="bg-redgradient pr-[10px] rounded-[7px] flex flex-col border-solid border-[1px] border-[#deebfd] shadow-shadow-light overflow-hidden">
                        <div className="px-[1em] pt-3 pb-2 text-white">
                            <div className="">
                                <h6 className="mb-3 tx-12 text-white">TODAY&apos;S ORDERS</h6>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="">
                                    <div className="w-full">
                                        <h4 className="text-[20px] font-bold mb-1 text-white">$5,74.12</h4>
                                        <p className="mb-0 text-[12px] text-white opacity-70">Compared to last week</p>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end">
                                    <span className="flex items-center gap-2">
                                        <FaArrowCircleUp className='text-sm' />
                                        <span className="text-white text-base opacity-70"> +427</span>
                                    </span>
                                </div>
                            </div>
                            <div className="h-[30px]"></div>
                        </div>
                    </div>
                    <div className="bg-greengradient pr-[10px] rounded-[7px] flex flex-col border-solid border-[1px] border-[#deebfd] shadow-shadow-light overflow-hidden">
                        <div className="px-[1em] pt-3 pb-2 text-white">
                            <div className="">
                                <h6 className="mb-3 tx-12 text-white">TODAY&apos;S ORDERS</h6>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="">
                                    <div className="w-full">
                                        <h4 className="text-[20px] font-bold mb-1 text-white">$5,74.12</h4>
                                        <p className="mb-0 text-[12px] text-white opacity-70">Compared to last week</p>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end">
                                    <span className="flex items-center gap-2">
                                        <FaArrowCircleUp className='text-sm' />
                                        <span className="text-white text-base opacity-70"> +427</span>
                                    </span>
                                </div>
                            </div>
                            <div className="h-[30px]"></div>
                        </div>
                    </div>
                    <div className="bg-orangegradient pr-[10px] rounded-[7px] flex flex-col border-solid border-[1px] border-[#deebfd] shadow-shadow-light overflow-hidden">
                        <div className="px-[1em] pt-3 pb-2 text-white">
                            <div className="">
                                <h6 className="mb-3 tx-12 text-white">TODAY&apos;S ORDERS</h6>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="">
                                    <div className="w-full">
                                        <h4 className="text-[20px] font-bold mb-1 text-white">$5,74.12</h4>
                                        <p className="mb-0 text-[12px] text-white opacity-70">Compared to last week</p>
                                    </div>
                                </div>
                                <div className="flex items-end justify-end">
                                    <span className="flex items-center gap-2">
                                        <FaArrowCircleUp className='text-sm' />
                                        <span className="text-white text-base opacity-70"> +427</span>
                                    </span>
                                </div>
                            </div>
                            <div className="h-[30px]"></div>
                        </div>
                    </div>
                </div>
                <Charts />
                <div className="mt-8 flex gap-3 ">
                    <Products products={products} />
                </div>
                <div className="pb-8 mt-8">
                    <Users users={users} />
                </div>


            </AdminLayout>
        </div>
    )
}


export default AdminDashboard

export async function getServerSideProps() {
    const users = await User.find({}).lean();
    // const orders = await Order.find().populate({ path: "user", model: User }).lean();
    const products = await Product.find().lean();
    console.log("Products:", products);
    console.log("Users:", users);
    return {
        props: {
            users: JSON.parse(JSON.stringify(users)),
            products: JSON.parse(JSON.stringify(products))
        }
    }
}