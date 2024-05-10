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
    shippingFee,
    total,
    selected,
    saveCartToDbHandler,
}: checkoutProps) => {
    console.log("Sub Total:", subtotal);
    return (
        <div className='w-full flex items-center'>
            <div className="w-[75%]"></div>
            <div className="w-[25%]">
                <div className="w-full">
                    <h1 className="">Order summery</h1>
                    <div className={""}>
                        <span>Subtotal</span>
                        <span>US${subtotal}</span>
                    </div>
                    <div className={""}>
                        <span>Shipping</span>
                        <span>+{shippingFee}$</span>
                    </div>
                    <div className={""}>
                        <span>Total</span>
                        <span>US{total}$</span>
                    </div>
                    <div className={"styles.submit"}>
                        <button
                            disabled={selected.length == 0}
                            style={{
                                background: `${selected.length == 0 ? "#eee" : ""}`,
                                cursor: `${selected.length == 0 ? "not-allowed" : ""}`,
                            }}
                            onClick={() => saveCartToDbHandler()}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className=""></div> */}
        </div>
    )
}

export default Checkout