/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React from 'react'
import { paymentMethods } from "@/components/data/paymentMethods"
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '../ui/card';


type Props = {
    paymentMethod: string;
    setPaymentMethod: (paymentMethod: string) => void;
    profile?: string;
};

const Payment = ({ paymentMethod, setPaymentMethod, profile }: Props) => (
    <div className='mb-10'>
        {!profile && (
            <div className="my-2">
                <h1 className="text-lg mb-5 uppercase font-semibold">Payment methods</h1>
            </div>
        )}
        <Card className="w-full">
            <CardHeader className='text-lg font-normal'>Select a default payment method.</CardHeader>
            <CardContent className='grid  md:grid-cols-2 grid-cols-1 lg:grid-cols-2 gap-3'>
                {paymentMethods.map((pm) => (
                    <label
                        htmlFor={pm.id}
                        key={pm.id}
                        className={`flex w-full  flex-grow-0 flex-shrink-0 basis-auto items-center py-3 gap-5 rounded-[3px]  cursor-pointer justify-center px-3 mt-4  border border-solid !border-black/20 text-black ${paymentMethod === pm.id ? "!bg-blue-600 !text-white py-3  !border-transparent" : ""} `}
                    >
                        <input
                            type="radio"
                            name="payment"
                            className='w-[15px] h-[15px] outline-none '
                            id={pm.id}
                            checked={paymentMethod === pm.id}
                            onChange={() => setPaymentMethod(pm.id)}
                        />
                        <Image src={`/images/checkout/${pm.id}.webp`} width={40} height={40} alt='paymentmethod' className='w-[40px] h-[25px] object-cover rounded-[3px]' />

                        <div className="">
                            <span>{pm.name}</span>
                        </div>

                    </label>
                ))}
            </CardContent>
        </Card>
    </div>
)

export default Payment