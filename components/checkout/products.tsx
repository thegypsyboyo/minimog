/* eslint-disable no-underscore-dangle */
import Image from 'next/image'
import React from 'react'

const Products = ({ cart }: any) => {

    console.log("Cart:", cart)
    return (
        <div>
            <div className="">
                <div className="">
                    <h1 className="">Your shopping Cart</h1>
                </div>
                <span>{cart.products.length === 1 ? "OYu have 1 item in your cart" : `You have ${cart.products.length} items in your cart`}</span>
            </div>
            <div className="">
                {cart?.products?.map((product: any) => (
                    <div className='' key={product._id}>
                        <div className="w-full">
                            <Image
                                src={product.image}
                                alt='image-cart'
                                width={50}
                                height={50}
                                className='w-[60px] h-[60px] object-cover rounded-[4px] border border-borderColor p-0 mb-2'
                            />
                            <div className="flex items-center gap-5 mb-5">
                                <Image src={product.color.image} alt="" width={25} height={25}
                                    className='w-[25px] h-[25px] rounded-full object-cover border-solid border-borderColor mt-1'
                                />
                                <span>{product.size}</span>
                                <span>{product.qty}</span>
                            </div>
                            <div className="">
                                {product.name.length > 18 ? `${product.name.substring(0, 18)}...` : product.name}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products