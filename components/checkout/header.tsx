import React from 'react'
import { RiShoppingBagLine } from "react-icons/ri";

import Link from 'next/link';
import Layout from '../layout'


const Header = () => (
    <div className='w-full border-b border-b-[#ccc]'>
        <Layout>
            <div className="flex items-center py-[0.8em] flex-wrap gap-8 text-2xl font-medium justify-between">
                <div className="">Minimog Fashion Shop</div>
                <div className=" text-[#1773b0] text-2xl">
                    <Link href="/browse">
                        <RiShoppingBagLine className='' />
                    </Link>
                </div>
            </div>
        </Layout>
    </div>
)

export default Header