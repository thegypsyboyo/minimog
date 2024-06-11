/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useState } from 'react'
import * as Yup from "yup"
import { Form, Formik } from "formik"
import { applyCoupon } from '@/requests/user'
import axios from 'axios'

import Router from "next/router"
import ShippingInput from '../input/shippingInput'


const Summery = ({
    totalAfterDiscount,
    setTotalAfterDiscount,
    // user,
    cart,
    paymentMethod,
    selectedAddress
}: any) => {

    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState<any>();
    const [error, setError] = useState("");
    const [order_error, setOrder_Error] = useState("")

    const validateCoupon = Yup.object({
        coupon: Yup.string().required("Please enter a coupon first !"),
    });

    const applyCouponHandler = async () => {
        const res = await applyCoupon(coupon);
        if (res.message) {
            setError(res.message);
        } else {
            setTotalAfterDiscount(res.totalAfterDiscount);
            setDiscount(res.discount);
            setError("");
        }
    };
    const placeOrderHandler = async () => {
        try {
            if (paymentMethod === "") {
                setOrder_Error("Please choose a payment method.");
                return
            } if (!selectedAddress) {
                setOrder_Error("Please choose a shipping address.");
                return;
            }
            const { data } = await axios.post("/api/order/create", {
                products: cart.products,
                shippingAddress: selectedAddress,
                paymentMethod,
                total: totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
                totalBeforeDiscount: cart.cartTotal,
                couponApplied: coupon,
            });
            Router.push(`/order/${data.order_id}`);
        } catch (error: any) {
            setOrder_Error(error.response.data.message);
        }
    }

    return (
        <div className="bg-blue-600 h-0 w-full">
            <div className="">
                <h1 className="my-2">Order summery</h1>
            </div>
            <Formik
                enableReinitialize
                initialValues={{ coupon }}
                validationSchema={validateCoupon}
                onSubmit={() => {
                    applyCouponHandler();
                }}
            >
                {(formik) => (
                    <Form>
                        <ShippingInput
                            name="coupon"
                            placeholder="*Coupon"
                            onChange={(e: any) => setCoupon(e.target.value)}
                        />
                        <div className="flex flex-col items-start">
                            {error && <span className='text-red-600 '>{error}</span>}
                            <button className='py-[10px] px-[30px] bg-blue-600 text-white mb-8'>Apply coupon</button>
                        </div>
                        <div className={"styles.infos"}>
                            <span>
                                Total : <b>{cart.cartTotal}$</b>{" "}
                            </span>
                            {discount > 0 && (
                                <span className={"styles.coupon_span"}>
                                    Coupon applied : <b>-{discount}%</b>
                                </span>
                            )}
                            {totalAfterDiscount < cart.cartTotal &&
                                totalAfterDiscount !== "" && (
                                    <span>
                                        New price : <b>{totalAfterDiscount}$</b>
                                    </span>
                                )}
                        </div>
                    </Form>
                )}
            </Formik>
            <button className='bg-black text-white rounded-[3px] mt-5 px-[20px] py-[7px]' onClick={() => placeOrderHandler()}>
                Place Order
            </button>
            {order_error && <span className='text-red-600'>{order_error}</span>}
        </div>
    );
}

export default Summery