/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react'
import Navbar from '@/components/home/shared/navbar'
import Footer from '@/components/home/shared/footer'
import db from '@/utils/db'
import Product from '@/models/Product'
import Category from '@/models/Category'
import SubCategory from '@/models/SubCategory'
import { ProductProps } from '@/types/typings'
import User from '@/models/User'
import axios from 'axios'
import Head from 'next/head'
import MainSwiper from '@/components/productDetails/mainSwiper'
import ProductInfo from '@/components/productDetails/productInfo'
import Layout from '@/components/layout'

import Reviews from '@/components/productDetails/reviews'

interface CountryInfo {
    name: string;
    flag: string;
    // flag?: {
    //   emojitwo: string;
    // };
}

interface CurrencyInfo {
    code: string;
    name: string;
    symbol: string;
}

interface Props {
    country: CountryInfo | null;
    currency: CurrencyInfo | null;
    product: any;
}
const ProductDetails = ({ country, currency, product }: Props) => {

    // console.log("Products:", product)
    const [activeImg, setActiveImg] = useState()
    return (

        <>
            <Head>
                <title>{product.name}</title>
                {/* <desc>{product.description}</desc> */}
            </Head>
            <Navbar country={country} currency={currency} />
            <section className="relative py-[120px] pt-[30px] grid place-items-center">
                {/* {product?.name} */}
                <div className="text-[14px] font-light">
                    Home / {product.category.name} / {product?.name}
                    {/* {product.subCategories.map((sub, index) => (
                        <span key={index}>  {sub.name}  </span>
                    ))} */}
                </div>
                <Layout>
                    <div className={"relative w-full h-full grid md:grid-cols-[(1fr,350px)] lg:grid-cols-2 gap-8 mt-[50px] overflow-hidden"}>
                        <MainSwiper activeImg={activeImg} images={product.images} />
                        <ProductInfo product={product} setActiveImg={setActiveImg} />
                    </div>
                    <Reviews product={product} />
                </Layout>
            </section>
            <Footer />
        </>
    )
}

export default ProductDetails

export async function getServerSideProps(context: any): Promise<{ props: Props }> {
    const { query } = context;
    const { slug } = query;
    const { style } = query;
    const size = query.size || 0;
    db.connectDb();
    //------------
    const product: ProductProps | null = await Product.findOne({ slug })
        .populate({ path: 'category', model: Category })
        .populate({ path: "subCategories._id", model: SubCategory })
        .populate({ path: "reviews.reviewBy", model: User })
        .lean();
    const subProduct = product?.subProducts[style] as any;
    const prices = (subProduct.sizes.map((s: any) => s.price)).sort((a: any, b: any) => a - b)

    const newProduct = {
        ...product,
        style,
        images: subProduct?.images,
        sizes: subProduct?.sizes,
        discount: subProduct?.discount,
        sku: subProduct?.sku,
        colors: product?.subProducts.map((p: { color: any }) => p.color),
        priceRange: subProduct.discount
            ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(2)} to ${(
                prices[prices.length - 1] -
                prices[prices.length - 1] / subProduct.discount
            ).toFixed(2)}$`
            : `From ${prices[0]} to ${prices[prices.length - 1]}$`,
        price:
            subProduct.discount > 0
                ? (subProduct.sizes[size].price -
                    subProduct.sizes[size].price / subProduct.discount).toFixed(2)
                : subProduct.sizes[size].price,
        beforePrice: subProduct.sizes[size].price,
        quantity: subProduct.sizes[size].qty,
        ratings: [
            {
                percentage: 76,
            },
            {
                percentage: 16,
            },
            {
                percentage: 6,
            },
            {
                percentage: 4,
            },
            {
                percentage: 0,
            },
        ],
        allSizes: product?.subProducts
            .map((p: { sizes: any }) => p.sizes)
            .flat().sort((a: { size: number }, b: { size: number }) => a.size - b.size)
            .filter(
                (element: { size: any }, index: any, array: any[]) =>
                    array.findIndex((e12: { size: any }) => e12.size === element.size) === index
            )
    }

    console.log("NewProd", newProduct)

    db.disconnectDb();
    // return {
    //     props: {
    //         product: JSON.parse(JSON.stringify(newProduct))
    //     },
    // };
    try {
        // Fetch country name from IP registry
        // const ipResponse = await axios.get("https://api.ipregistry.co/?key=beclb0k4pr2to92s");
        // const countryName = ipResponse.data?.location?.country; // Ensure proper access to country name
        // console.log("Country Name:", countryName);

        // Fetch country data from Rest Countries API
        // const countryResponse = await axios.get(`https://restcountries.com/v2/name/${(countryName.name)}`);
        const countryResponse = await axios.get(`https://restcountries.com/v2/name/netherlands`);

        // console.log("Country Response:", countryResponse.data);

        // Extract country and currency information
        const countryData = countryResponse.data[0];
        // const country: CountryInfo = {
        //   name: countryData.name,
        //   flag: countryData.flags?.svg // or any other flag URL you prefer
        // };
        const country: CountryInfo = {
            name: "nethelands",
            flag: "https://www.iamexpat.nl/sites/default/files/styles/article_full_custom_user_desktop_1x/public/flag-netherlands.jpg" // or any other flag URL you prefer
        };
        // console.log("Country Info:", country);

        const currencyData = countryData.currencies[0];
        const currency: CurrencyInfo = {
            code: currencyData.code,
            name: currencyData.name,
            symbol: currencyData.symbol
        };
        // console.log("Currency Info:", currency);

        return {
            props: {
                country,
                currency,
                product: JSON.parse(JSON.stringify(newProduct)),
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                product: JSON.parse(JSON.stringify(newProduct)),
                country: null,
                currency: null
            }
        };
    }
}
