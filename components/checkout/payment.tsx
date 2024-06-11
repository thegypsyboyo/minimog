/* eslint-disable array-callback-return */
import React from 'react'
import { paymentMethods } from "@/components/data/paymentMethods"
import Image from 'next/image'

const Payment = ({ paymentMethod, setPaymentMethod, profile }: any) => (
    <div className='mb-10'>
        {!profile && (
            <div className="my-2">
                <h1 className="">Payment methods</h1>
            </div>
        )}
        {paymentMethods.map((pm) => (
            <label
                htmlFor={pm.id}
                key={pm.id}
                className={`flex items-center gap-5 py-3.5 rounded-[5px] cursor-pointer justify-center px-3 mt-4  border border-solid !border-black text-black ${paymentMethod === pm.id ? "!bg-blue-600 !text-white py-3.5  !border-transparent" : ""} `}
            // style={{ background: `${paymentMethod === pm.id ? "#f5f5f5" : ""} ` }}
            >
                <input
                    type="radio"
                    name="payment"
                    id={pm.id}
                    checked={paymentMethod === pm.id}
                    onChange={() => setPaymentMethod(pm.id)}
                />
                <Image src={`/images/checkout/${pm.id}.webp`} width={40} height={40} alt='paymentmethod' />

                <div className="">
                    <span>Pay with {pm.name}</span>
                </div>

            </label>
        ))}
    </div>
)

export default Payment