/* eslint-disable arrow-body-style */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react'
import Navbar from '@/components/home/shared/navbar'
import Footer from '@/components/home/shared/footer'
import db from '@/utils/db'
import Product from '@/models/Product'
import Category from '@/models/Category'
import SubCategory from '@/models/SubCategory'
// import { ProductProps } from '@/types/typings'
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
            </Head>
            <Navbar country={country} currency={currency} />
            <section className="relative py-[120px] pt-[30px] grid place-items-center">
                {/* {product?.name} */}
                <div className="text-[14px] font-light">
                    Home / {product?.category?.name} / {product?.name}
                    {product.subCategories.map((sub: any, index: any) => (
                        <span key={index}>  {sub.name}  </span>
                    ))}
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

export async function getServerSideProps(context: any) {
    const { query } = context;
    const { slug } = query;
    const { style } = query;
    const size = query.size || 0;
    db.connectDb();
    //------------
    const product: any = await Product.findOne({ slug })
        .populate({ path: "category", model: Category })
        .populate({ path: "subCategories", model: SubCategory })
        .populate({ path: "reviews.reviewBy", model: User })
        .lean();
    const subProduct = product?.subProducts[style];
    const prices = subProduct?.sizes
        .map((s: any) => s.price)
        .sort((a: any, b: any) => a - b);
    const newProduct = {
        ...product,
        style,
        images: subProduct.images,
        sizes: subProduct.sizes,
        discount: subProduct.discount,
        sku: subProduct.sku,
        colors: product.subProducts.map((p: any) => p.color),
        priceRange: subProduct.discount
            ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(2)} to ${(
                prices[prices.length - 1] -
                prices[prices.length - 1] / subProduct.discount
            ).toFixed(2)}$`
            : `From ${prices[0]} to ${prices[prices.length - 1]}$`,
        price:
            subProduct.discount > 0
                ? (
                    subProduct.sizes[size].price -
                    subProduct.sizes[size].price / subProduct.discount
                ).toFixed(2)
                : subProduct.sizes[size].price,
        priceBefore: subProduct.sizes[size].price,
        quantity: subProduct.sizes[size].qty,
        ratings: [
            {
                percentage: calculatePercentage(5),
            },
            {
                percentage: calculatePercentage(4),
            },
            {
                percentage: calculatePercentage(3),
            },
            {
                percentage: calculatePercentage(2),
            },
            {
                percentage: calculatePercentage(1),
            },
        ],
        reviews: product.reviews.reverse(),
        allSizes: product.subProducts
            .map((p: any) => p.sizes)
            .flat()
            .sort((a: any, b: any) => a.size - b.size)
            .filter(
                (element: any, index: any, array: any) =>
                    array.findIndex((el2: any) => el2.size === element.size) === index
            ),
    };
    function calculatePercentage(num: number) {
        return (
            (product.reviews.reduce((a: number, review: any) => {
                return (
                    a +
                    (review.rating === num || review.rating === num + 0.5 ? 1 : 0)
                );
            }, 0) *
                100) /
            product.reviews.length
        ).toFixed(1);
    }
    db.disconnectDb();


    // Fetch country name from IP registry
    try {
        const ipResponse = await axios.get("https://api.ipregistry.co/?key=beclb0k4pr2to92s");
        const countryName = ipResponse.data?.location?.country; // Ensure proper access to country name
        // console.log("Country Name:", countryName);

        // Fetch country data from Rest Countries API
        const countryResponse = await axios.get(`https://restcountries.com/v2/name/${(countryName.name)}`);
        // const countryResponse = await axios.get(`https://restcountries.com/v2/name/netherlands`);

        // console.log("Country Response:", countryResponse.data);

        // Extract country and currency information
        const countryData = countryResponse.data[0];
        const country: CountryInfo = {
            name: countryData.name,
            flag: countryData.flags?.svg // or any other flag URL you prefer
        };
        const currencyData = countryData.currencies[0];
        const currency: CurrencyInfo = {
            code: currencyData.code,
            name: currencyData.name,
            symbol: currencyData.symbol
        };
        // console.log("related", related);
        return {
            props: {
                country,
                currency,
                product: JSON.parse(JSON.stringify(newProduct)),
                // related: JSON.parse(JSON.stringify(related)),
            },
        };
    } catch (error) {
        return {
            props: {
                country: null,
                currency: null,
                product: JSON.parse(JSON.stringify(newProduct)),
                // related: JSON.parse(JSON.stringify(related)),

            }
        };
    }
}
