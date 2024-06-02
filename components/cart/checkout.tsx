/* eslint-disable eqeqeq */
import React from 'react'

interface checkoutProps {
    subtotal: number;
    shippingFee: number;
    selected: [],
    total: number,
    saveCartToDbHandler: any
}
const Checkout = ({
    subtotal,
    // shippingFee,
    // total,
    selected,
    saveCartToDbHandler,
}: checkoutProps) => (
    <div className='w-full flex items-center'>
        <div className="hidden md:block md:w-[65%]"></div>
        <div className="w-full md:w-[35%]">
            <div className="w-full">
                {/* <h1 className="">Order summery</h1> */}
                <div className={"flex items-center justify-between gap-4 text-[17px] font-medium mb-3"}>
                    <span>Subtotal</span>
                    <span>US${subtotal}</span>
                </div>
                {/* <div className={""}>
                        <span>Shipping</span>
                        <span>+{shippingFee}$</span>
                    </div>
                    <div className={""}>
                        <span>Total</span>
                        <span>US{total}$</span>
                    </div> */}
                <p className="font-normal text-sm text-primaryForground">Shipping fee and taxes calculated at checkout</p>
                <div className={"w-full mt-15"}>
                    <button
                        disabled={selected.length == 0}
                        className="bg-black text-white rounded-[3px] py-2.5 px-[20px] w-full flex items-center justify-center uppercase"
                        style={{
                            background: `${selected.length == 0 ? "#eee" : ""}`,
                            cursor: `${selected.length == 0 ? "not-allowed" : ""}`,
                        }}
                        onClick={() => saveCartToDbHandler()}
                    >
                        Check out
                    </button>
                </div>
            </div>
        </div>
        {/* <div className=""></div> */}
    </div>
)

export default Checkout