/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from "react"
import { getSession } from 'next-auth/react'
import User from '@/models/User'
import Cart from '@/models/Cart'
import db from '@/utils/db'
import Header from "@/components/checkout/header"
import Shipping from "@/components/checkout/shipping"
import Products from "@/components/checkout/products"
import Payment from "@/components/checkout/payment"
import Summery from "@/components/checkout/summery"
import Layout from "@/components/layout"
// import Layout from "@/components/layout"


const Checkout = ({ cart, user }: any) => {

    const [addresses, setAddresses] = useState(user?.address || []);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    useEffect(() => {
        const check = addresses?.find((address: any) => address?.active === true)
        if (check) {
            setSelectedAddress(check);
        } else {
            setSelectedAddress("")
        }
    }, [addresses]);

    console.log("Seleced Address:", selectedAddress);
    return (
        <>
            <Header />
            <div className="flex flex-wrap min-h-screen">
                <div className="w-[60%]">
                    <div className="w-full px-[40px]">
                        <Layout>
                            <Shipping
                                user={user}
                                addresses={addresses}
                                setAddresses={setAddresses}
                            />
                            <Payment
                                paymentMethod={paymentMethod}
                                setPaymentMethod={setPaymentMethod}
                            />
                        </Layout>
                    </div>
                </div>
                <div className="w-[40%] bg-[#f5f5f5]">

                    <div className="w-full p-[20px]">
                        <Layout>

                            <Products
                                cart={cart}
                            />
                            <Summery
                                totalAfterDiscount={totalAfterDiscount}
                                setTotalAfterDiscount={setTotalAfterDiscount}
                                user={user}
                                cart={cart}
                                paymentMethod={paymentMethod}
                                selectedAddress={selectedAddress}
                            />
                        </Layout>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout

export async function getServerSideProps(context: any) {
    await db.connectDb();
    const session: any = await getSession(context);
    const user = await User.findById(session?.user?._id);
    const cart = await Cart.findOne({ user: user._id });

    await db.disconnectDb();

    if (!cart) {
        return {
            redirect: {
                destination: "/cart",
            },
        };
    }
    return {
        props: {
            cart: JSON.parse(JSON.stringify(cart)),
            user: JSON.parse(JSON.stringify(user)),
        },
    };
}