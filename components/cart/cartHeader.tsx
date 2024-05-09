import React, { useEffect, useState } from 'react'
import { compareArrays } from '@/utils/arraysUtils';

import Layout from '../layout';

const CartHeader = ({ cartItems, selected, setSelected }: any) => {

    const [active, setActive] = useState();

    useEffect(() => {
        const check = compareArrays(selected, cartItems);

        setActive(check)
    }, [cartItems, selected])


    const handleSelect = () => {
        if (selected.length !== cartItems.length) {
            setSelected(cartItems);
        } else {
            setSelected([]);
        }
    }

    console.log("");
    return (
        <section className='w-full h-[100px] mt-20'>
            <Layout>
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl">Item summer ({cartItems.length})</h1>
                    <div className="flex mt-10 items-center justify-center" onClick={() => handleSelect()}>
                        <div className={`${active ? "bg-yellow-500" : ""} w-[22px] h-[22px] rounded-full cursor-pointer hover:border-yellow-500 border border-borderColor`}>
                        </div>
                        <span className='ml-3'>select all</span>
                    </div>
                </div>
            </Layout>

        </section>
    )
}

export default CartHeader