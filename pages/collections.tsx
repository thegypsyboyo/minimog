/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import BrandFilter from '@/components/collections/brand-filter';
import CategoryFilter from '@/components/collections/category-filter';
import ColorsFilter from '@/components/collections/colors-filter';
import CollectionsHeader from '@/components/collections/header';
import HeadingFilters from '@/components/collections/heading-filters';
import Navbar from '@/components/home/shared/navbar';
import Layout from '@/components/layout';
import ProductCard from '@/components/productCard/productCard';
import Category from '@/models/Category';
import Product from '@/models/Product';
import SubCategory from '@/models/SubCategory';
import { removeDuplicates } from '@/utils/arraysUtils';
import db from '@/utils/db';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react'



interface CountryInfo {
    name: string;
    flag: string;
}

interface CurrencyInfo {
    code: string;
    name: string;
    symbol: string;
}

interface SizesProps {
    size: string;
    price: number;
    qty: number;
    _id: string;
}

interface ImagesProps {
    public_id: string;
    resource_type: string;
    url: string;
}
interface ColorProps {
    color: string;
    image: string;
}

interface SubProductProps {
    color: ColorProps;
    discount: number;
    images: ImagesProps[];
    sizes: SizesProps[];
    sku: string;
    _id: string;
}

interface ProductProps {
    name: string;
    subProducts: SubProductProps[];

}

type Props = {
    country: CountryInfo;
    currency: CurrencyInfo;
    products: ProductProps[];
    categories: any;
    subCategories: any;
    brands: string[];
    colors: string[];
}


const Collections = ({ country, currency, products, categories, subCategories, brands, colors }: Props) => {

    const router = useRouter();
    const filter = ({
        search,
        category,
        brand,
        color,
    }: any) => {

        const path = router.pathname;
        const { query } = router;
        if (search) query.search = search;
        if (brand) query.brand = brand;
        if (category) query.category = category;
        if (color) query.color = color;

        router.push({
            pathname: path,
            query,
        })
    }

    const searchHandler = (search: string) => {
        if (search === "") {
            filter({ search: {} });
        } else {
            filter({ search })
        }
    }

    const categoryHandler = (category: string) => {
        filter({ category })
    }
    const brandHandler = (brand: string) => {
        filter({ brand })
    }
    const colorHandler = (color: string) => {
        filter({ color })
    }

    function replaceQuery(queryName: string, value: string) {
        const existedQuery = router.query[queryName] as any;
        const valueCheck = existedQuery?.search(value);
        const _check = existedQuery?.search(`_${value}`);
        let result = "" as any;
        if (existedQuery) {
            if (existedQuery === value) {
                result = {};
            } else if (valueCheck !== -1) {
                if (_check !== -1) {
                    result = existedQuery?.replace(`_${value}`, "");
                } else if (valueCheck === 0) {
                    result = existedQuery?.replace(`${value}_`, "");
                } else {
                    result = existedQuery?.replace(value, "");
                }
            } else {
                result = `${existedQuery}_${value}`;
            }
        } else {
            result = value;
        }
        return {
            result,
            active: !!(existedQuery && valueCheck !== -1),
        };
    }

    return (
        <>
            <Head>
                <title>Minimog - Collections</title>
            </Head>
            <div>
                <Navbar
                    country={country}
                    currency={currency}
                    searchHandler={searchHandler}
                />
                <div className="">
                    <CollectionsHeader
                        description=''
                        image=''
                        title=''
                    />
                </div>
                <Layout>
                    <div className="mt-10 grid gap-10 grid-cols-[100px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[250px,1fr]">
                        <div className="w-full">
                            <button className='text-sm font-bold text-black border-black border py-2 px-6 rounded-[3px] uppercase hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in hover:border-blue-600 '>Clear all ( 3 )</button>
                            <CategoryFilter
                                categories={categories}
                                subCategories={subCategories}
                                categoryHandler={categoryHandler}
                                replaceQuery={replaceQuery}
                            />
                            <BrandFilter
                                brandHandler={brandHandler}
                                brands={brands}
                                replaceQuery={replaceQuery}
                            />
                            <ColorsFilter
                                colorHandler={colorHandler}
                                colors={colors}
                                replaceQuery={replaceQuery}
                            />
                        </div>
                        <div className="overflow-hidden w-full">
                            <HeadingFilters

                            />
                            <div className="w-full grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6">
                                {products?.map((product, index) => (
                                    <ProductCard
                                        product={product}
                                        key={index}
                                    />
                                ))}
                            </div>
                            <div className='flex justify-end'>Pagination</div>
                        </div>
                    </div>
                </Layout>
            </div>
        </>
    )
}

export default Collections

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

    function createRegex(data: any, styleRegex: any) {
        if (data.length > 1) {
            for (let i = 1; i < data.length; i++) {
                styleRegex += `|^${data[i]}`;
            }
        }
        return styleRegex;
    }
    try {

        const { query } = ctx;
        const searchQuery = query.search || "";
        const categoryQuery = query.category || "";

        const brandQuery = typeof query.brand === 'string' ? query.brand.split("__") : "";

        const brandRegex = `^${brandQuery[0]}`;
        const brandSearchRegex = createRegex(brandQuery, brandRegex);

        const colorQuery = typeof query.color === "string" ? query.color.split("__") : "";
        const colorRegex = `^${colorQuery[0]}`;
        const colorSearchRegex = createRegex(colorQuery, colorRegex);


        const search = searchQuery && searchQuery !== ""
            ? {
                name: {
                    $regex: searchQuery,
                    $options: "i"
                },
            }
            : {};

        const category = categoryQuery && categoryQuery !== ""
            ? {
                category: categoryQuery
            }
            : {}

        const brand = typeof brandQuery && brandQuery !== ""
            ? {
                brand: {
                    $regex: brandSearchRegex,
                    $options: "i",
                },
            }
            : {};

        const color = typeof colorQuery && colorQuery !== ""
            ? {
                "subProducts.color.color": {
                    $regex: colorSearchRegex,
                    $options: "i",
                }
            }
            : {}
        // const brand = typeof brandQuery === 'string' && brandQuery !== ""
        //     ? {
        //         brand: {
        //             // $regex: new RegExp(brandQuery, "i"),
        //             $regex: brandSearchRegex,
        //             $options: "i",
        //         },
        //     }
        //     : {};

        db.connectDb();

        const dbProduct = await Product.find({
            ...search,
            ...category,
            ...brand,
            ...color,
        }).lean();
        const categories = await Category.find().lean();

        const brandDb = await Product.find({
            ...category,
        }).distinct("brand") as any;

        const colors = await Product.find({
            ...category,
        }).distinct("subProducts.color.color")

        const brands = removeDuplicates(brandDb);
        // const subCategories = await SubCategory.find().populate({
        //     path: "parent",
        //     model: Category
        // }).lean();

        // console.log("DB Products:", dbProduct)

        // const totalProducts = await Product.countDocuments({
        //     ...search,
        //     ...category,
        //     ...brand,
        // })

        const ipResponse = await axios.get("https://api.ipregistry.co/?key=beclb0k4pr2to92s");
        const countryName = ipResponse.data?.location?.country;
        const countryResponse = await axios.get(`https://restcountries.com/v2/name/${(countryName.name)}`);
        const countryData = countryResponse.data[0];
        const country: CountryInfo = {
            name: countryData.name,
            flag: countryData.flags?.svg
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
                currency,
                products: JSON.parse(JSON.stringify(dbProduct)),
                categories: JSON.parse(JSON.stringify(categories)),
                brands,
                colors,
            }
        }

    } catch (error) {
        return {
            props: {
                user: null,
                address: null,
                tab: null
            }
        }
    }
}


