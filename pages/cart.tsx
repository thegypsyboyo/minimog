import CartHeader from '@/components/cart/cartHeader';
import CartProducts from '@/components/cart/cartProducts';
import Footer from '@/components/home/shared/footer';
import Navbar from '@/components/home/shared/navbar';
import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Layout from '@/components/layout';

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
    const { cart } = useSelector((state) => ({ ...state }));

    const [selected, setSelected] = useState([]);

    // console.log("Cart Items:", cart);
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
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
                {cart.cartItems.map((product: any, index: any) => (
                    <CartProducts
                        product={product}
                        key={index}
                        selected={selected}
                        setSelected={setSelected}
                    />
                ))}
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