/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-underscore-dangle */
import ProfileLayout from '@/components/profile/layout'
import Order from '@/models/Order';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { FiExternalLink } from "react-icons/fi";
// import React from 'react'
import * as React from "react"
import {
    File,
    ListFilter,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ordersLinks } from '@/components/data/sidebar';
import slugify from 'slugify';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
// import Image from 'next/image';

interface CountryInfo {
    name: string;
    flag: string;
}

interface CurrencyInfo {
    code: string;
    name: string;
    symbol: string;
}

interface UserProps {
    email: string;
    name: string;
    role: string;
    image: string;
    _id: string;

}

type PaymentMethod = "paypal" | "credit_card" | "COD"

type OrderProps = {
    user: UserProps;
    _id: string;
    products: [
        {
            name: string;
            image: string;
            size: string;
            color: {
                color: string;
                image: string;
            };
            qty: number;
            price: number;
        }
    ];
    total: number;
    paymentMethod: PaymentMethod;
    isPaid: boolean;
    status: string;
}

type Props = {
    user: Partial<UserProps>;
    tab: number;
    currency: CurrencyInfo;
    country: CountryInfo;
    orders: OrderProps[];
}

const Orders = ({ user, tab, country, currency, orders }: Props) => {

    const router: NextRouter = useRouter();
    const queryQ = router.query.q as string | undefined
    console.log("Orers Image:", orders[0].products[0].image)
    return (
        <ProfileLayout
            session={user}
            country={country}
            currency={currency}
            tab={tab}
        >
            <Head>
                <title>{(user?.name)?.split(" ")[0]} - Orders</title>
            </Head>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <div className="flex flex-col">
                    <main className="grid flex-1 items-start gap-0 p-4 lg:grid-cols-1 xl:grid-cols-1">
                        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
                            <Tabs defaultValue="year">
                                <div className="flex items-center">
                                    <TabsList>
                                        <TabsTrigger value="week">Week</TabsTrigger>
                                        <TabsTrigger value="month">Month</TabsTrigger>
                                        <TabsTrigger value="year">Year</TabsTrigger>
                                    </TabsList>
                                    <div className="ml-auto flex items-center gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild className='bg-white'>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-7 gap-1 text-sm"
                                                >
                                                    <ListFilter className="h-3.5 w-3.5" />
                                                    <span className="sr-only sm:not-sr-only">Filter</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className='bg-white'>
                                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {ordersLinks.map((link, i) => (
                                                    <DropdownMenuCheckboxItem
                                                        checked={link.name === queryQ?.split("__")[1]}
                                                        key={i}
                                                        className={slugify(link.name, { lower: true }) === queryQ?.split("__")[0]
                                                            ? "!text-blue-600 font-bold"
                                                            : ""
                                                        }
                                                    >
                                                        <Link
                                                            href={`/profile/orders?tab=${tab}&q=${slugify(link.name, { lower: true })}__${link.filter}`}
                                                        >
                                                            {link.name}
                                                        </Link>
                                                    </DropdownMenuCheckboxItem>
                                                ))}

                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 gap-1 text-sm"
                                        >
                                            <File className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only">Export</span>
                                        </Button>
                                    </div>
                                </div>
                                <TabsContent value="week">
                                </TabsContent>
                            </Tabs>
                            <Card x-chunk="dashboard-05-chunk-3">
                                <CardHeader className="px-7">
                                    <CardTitle>Orders</CardTitle>
                                    <CardDescription>
                                        Recent orders from your store.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Product</TableHead>
                                                <TableHead className="hidden text-center sm:table-cell">
                                                    Product Id
                                                </TableHead>
                                                <TableHead className="hidden text-center sm:table-cell">
                                                    Payment Method
                                                </TableHead>
                                                <TableHead className="hidden text-center md:table-cell">
                                                    Total
                                                </TableHead>
                                                <TableHead className="text-center">
                                                    Status
                                                </TableHead>
                                                <TableHead className="text-center">
                                                    View
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {orders ? (
                                                <>
                                                    {orders?.map((order, i: number) => (
                                                        <TableRow
                                                            key={i}
                                                            className="bg-accent">
                                                            <TableCell>
                                                                <div className="">
                                                                    <Image
                                                                        src={`${orders[0].products[0].image}`}
                                                                        alt='product-image'
                                                                        width={150}
                                                                        height={150}
                                                                        className='w-[100px] h-[60px] object-cover'
                                                                    />
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="hidden text-center sm:table-cell">
                                                                <Badge className="text-xs" variant="secondary">
                                                                    {order._id}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="hidden text-center  sm:table-cell">
                                                                {order.paymentMethod === "paypal"
                                                                    ? "Paypal"
                                                                    : order.paymentMethod === "credit_card"
                                                                        ? "Credit Card"
                                                                        : "COD"}
                                                            </TableCell>
                                                            <TableCell className="hidden text-center sm:table-cell">
                                                                <Badge className="text-xs" variant="secondary">
                                                                    {order.total}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="hidden text-center md:table-cell">
                                                                {order.status}
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <Link href={`/order/${order._id}`}>
                                                                    <FiExternalLink />
                                                                </Link>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </>

                                            ) : (
                                                <div className='py-[40px] text-center w-full flex items-center justify-center text-xl'>No orders were found here.</div>
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </main>
                </div>
            </div>
        </ProfileLayout>

    )
}

export default Orders

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    try {
        const { query, req } = ctx;
        const session: any = await getSession({ req });
        const tab = query.tab || 0;
        console.log("Tab", tab);
        const queryQ = query.q as string || null;
        const filter = queryQ?.split("__")[1]
        let orders = [];
        if (!filter) {
            orders = await Order.find({ user: session?.user._id })
                .sort({
                    createdAt: -1,
                })
                .lean();
        } else if (filter === "paid") {
            orders = await Order.find({ user: session?.user._id, isPaid: true })
                .sort({
                    createdAt: -1,
                })
                .lean();
        } else if (filter === "unpaid") {
            orders = await Order.find({ user: session?.user._id, isPaid: false })
                .sort({
                    createdAt: -1,
                })
                .lean();
        } else {
            orders = await Order.find({ user: session?.user._id, status: filter })
                .sort({
                    createdAt: -1,
                })
                .lean();
        }

        console.log("Filter:", orders[0].products[0].image);
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
                user: session?.user,
                tab,
                country,
                currency,
                orders: JSON.parse(JSON.stringify(orders)),
            },
        };
    } catch (error) {
        return {
            props: {
                user: null,
                tab: null,
                country: null,
                currency: null,
                orders: null,
            }
        };
    }
}