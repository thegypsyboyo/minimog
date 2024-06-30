/* eslint-disable no-underscore-dangle */
import ProfileLayout from "@/components/profile/layout";
import Product from "@/models/Product";
import User from "@/models/User";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

import {
    MoreHorizontal,
} from "lucide-react"

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
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
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
import Image from "next/image";


interface UserProps {
    email: string;
    name: string;
    role: string;
    image: string;
    defaultPaymentMethod?: string,
    _id: string;
}

interface CountryInfo {
    name: string;
    flag: string;
}

interface CurrencyInfo {
    code: string;
    name: string;
    symbol: string;
}

interface ImagesProps {
    public_id: string;
    resource_type: string;
    url: string;
}

interface SizesProps {
    size: string;
    price: number;
    qty: number;
}
interface SubProductsProps {
    images: ImagesProps[];
    sku: string;
    sizes: SizesProps[];
}

interface WishlistProps {
    product: {
        _id: string;
        brand: string;
        category: string;
        createdAt: Date
        name: string;
        subProducts: SubProductsProps[];
    }
    style: string;
}

type Props = {
    country: CountryInfo;
    currency: CurrencyInfo;
    user: UserProps,
    wishlist: WishlistProps[];
}

const Wishlist = ({ country, currency, user, wishlist }: Props) => {

    console.log("WIshlist:", wishlist[0].product);
    return (
        <ProfileLayout
            session={user}
            currency={currency}
            country={country}
        >
            <div className="">
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader className='w-full'>
                        <CardTitle>Your Wishlist</CardTitle>
                        <CardDescription>
                            Manage your wishlist.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table className='overflow-x-auto w-full'>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px] sm:table-cell text-center">
                                        <span className="sr-only">Image</span>
                                        <span className="">Image</span>
                                    </TableHead>
                                    <TableHead className="text-center">Name</TableHead>
                                    <TableHead className="text-center">SKU</TableHead>
                                    <TableHead className="text-center">Price</TableHead>
                                    <TableHead className="text-center">
                                        <span className="">Actions</span>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {wishlist.map((wish, index) => (
                                    <TableRow key={index}>

                                        <TableCell className="hidden sm:table-cell text-center" >
                                            <Image
                                                alt="Product image"
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src={wish.product.subProducts[0].images[0].url}
                                                width="64"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium max-w-[200px] text-center">
                                            {wish.product.name.length > 35 ? `${wish.product.name.substring(0, 28)} ...` : `${wish.product.name}`}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {wish.product.subProducts[0].sku}
                                        </TableCell>
                                        <TableCell className="text-center">${wish.product.subProducts[0].sizes[0].price}</TableCell>
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className='bg-white'>
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>Remove</DropdownMenuItem>
                                                    {/* <DropdownMenuItem>Delete</DropdownMenuItem> */}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    {/* <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                            products
                        </div>
                    </CardFooter> */}
                </Card>
            </div>
        </ProfileLayout>

    )
}

export default Wishlist

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    try {

        const { query, req } = ctx;
        const session = await getSession({ req });
        const tab = query.tab || 0;
        const user = session?.user as UserProps

        const userWishlist = await User.findById(user._id).select("wishlist").populate({
            path: "wishlist.product",
            model: Product
        }) as any;


        // console.log("users wishlist", wishlist.wishlist[0].product)

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
                user,
                tab,
                country,
                currency,
                wishlist: JSON.parse(JSON.stringify(userWishlist.wishlist)),
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
