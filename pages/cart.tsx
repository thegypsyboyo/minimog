/* eslint-disable no-unused-vars */
import CartHeader from '@/components/cart/cartHeader';
import Checkout from '@/components/cart/checkout';
import CartProducts from '@/components/cart/cartProducts';
import Footer from '@/components/home/shared/footer';
import Navbar from '@/components/home/shared/navbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Layout from '@/components/layout';
import { signIn, useSession } from 'next-auth/react';
import Router from 'next/router';
import { saveCart } from '@/requests/user';

interface CountryInfo {
    name: string;
    flag: string;
}

interface CurrencyInfo {
    code: string;
    name: string;
    symbol: string;
}

interface Props {
    country: CountryInfo | null;
    currency: CurrencyInfo | null;
}

const Cart = ({ country, currency }: Props) => {
    const { cart } = useSelector((state) => ({ ...(state as Record<string, any>) }));
    const { data: session } = useSession();
    const [shippingFee, setShippingFee] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [selected, setSelected] = useState([] as any);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setShippingFee(
            selected.reduce((a: any, c: any) => a + Number(c.shipping), 0).toFixed(2)
        );
        setSubtotal(selected.reduce((a: any, c: any) => a + c.price * c.qty, 0).toFixed(2));
        setTotal(
            (
                selected.reduce((a: any, c: any) => a + c.price * c.qty, 0) + Number(shippingFee)
            ).toFixed(2)
        );
    }, [selected, shippingFee]);

    const saveCartToDbHandler = async () => {
        if (session) {
            const res = saveCart(selected);
            Router.push("/checkout");
        } else {
            signIn();
        }
    }
    console.log("Cart Items:", cart);
    return (
        <main>
            <Navbar country={country} currency={currency} />
            <CartHeader
                cartItems={cart.cartItems}
                selected={selected}
                setSelected={setSelected}
            />
            <Layout className="my-[60px]">
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50%] p-0">Product</TableHead>
                            <TableHead className='w-[20%] p-0'>Price</TableHead>
                            <TableHead className='w-[20%] p-0'>Quantity</TableHead>
                            <TableHead className="w-[10%] p-0">Sub Total</TableHead>
                            {/* <TableHead className="text-right">Total</TableHead> */}
                        </TableRow>
                    </TableHeader>
                </Table>
                <div>
                    {cart.cartItems?.map((product: any, index: any) => (
                        <CartProducts
                            product={product}
                            key={index}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    ))}
                </div>
                <Checkout
                    subtotal={subtotal}
                    selected={selected}
                    total={total}
                    shippingFee={shippingFee}
                    saveCartToDbHandler={saveCartToDbHandler}
                />
            </Layout>
            <Footer />
        </main>
    )
}

export default Cart


export async function getServerSideProps() {

    try {
        // Fetch country data from Rest Countries API
        const countryResponse = await axios.get(`https://restcountries.com/v2/name/netherlands`);

        // Extract country and currency information
        const countryData = countryResponse.data[0];
        const country: CountryInfo = {
            name: countryData.name,
            flag: "https://www.iamexpat.nl/sites/default/files/styles/article_full_custom_user_desktop_1x/public/flag-netherlands.jpg" // or any other flag URL you prefer
        };

        const currencyData = countryData.currencies[0];
        const currency: CurrencyInfo = {
            code: currencyData.code,
            name: currencyData.name,
            symbol: currencyData.symbol
        };

        return {
            props: {
                country,
                currency
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                country: null,
                currency: null,
            }
        };
    }
}