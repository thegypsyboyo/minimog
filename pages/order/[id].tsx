/* eslint-disable no-nested-ternary */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable default-case */
import React, { useEffect, useReducer } from 'react'
import { PayPalButtons, SCRIPT_LOADING_STATE, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import Header from '@/components/checkout/header';
import db from '@/utils/db';
import Order from '@/models/Order';
import User from '@/models/User';
import axios from 'axios';
import {
    ChevronLeft,
    ChevronRight,
    Copy,
    MoreVertical,
    Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"

import Layout from '@/components/layout';
import Image from 'next/image';
import StripePayment from '@/components/stripe';
import { PayPalIcon } from '@/components/icons';
import { BsCashStack, BsStripe } from 'react-icons/bs';
import { useExport } from '@/hooks/useExport';

function Reducer(state: any, action: any) {
    switch (action.type) {
        case "PAY_REQUEST":
            return { ...state, loading: true };
        case "PAY_PROCESS":
            return { ...state, loading: false, succes: true };
        case "PAY_FAIL":
            return { ...state, loading: false, error: action.payload };
        case "PAY_REESET":
            return { ...state, loading: false, success: false, error: false };
    }
}

export default function ClientOrder({
    orderData,
    paypal_client_id,
    stripe_public_key,
}: any) {
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const [dispatch] = useReducer(Reducer, {
        loading: true,
        error: "",
        success: "",
    });

    useEffect(() => {
        if (!orderData._id) {
            dispatch({
                type: "PAY_RESET"
            });
        } else {
            paypalDispatch({
                type: "resetOptions",
                value: {
                    "clientId": paypal_client_id,
                    currency: "USD"
                },
            });
            paypalDispatch({
                type: "setLoadingStatus",
                // value: "pending",
                value: SCRIPT_LOADING_STATE.PENDING,

            });
        }
    }, [dispatch, orderData._id, paypalDispatch, paypal_client_id]);

    function createOrderHandler(data: any, actions: any) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: orderData.total,
                    },
                },
            ],
        }).then((order_id: any) => {
            return order_id
        });
    }

    function onApproveHandler(data: any, actions: any) {
        return actions.order.capture().then(async function (details: any) {
            try {
                dispatch({ type: "PAY_REQUEST" });
                const { data } = await axios.put(`/api/order/${orderData._id}/pay`, details);
                dispatch({ type: "PAY_SUCCESS", payload: data });
            } catch (error) {
                dispatch({ type: "PAY_ERROR", payload: error })
            }
        })
    }

    function onErrorHandler(error: any) {
        console.log(error);
    }
    const { exportAsPDF } = useExport();

    return (
        <>
            <Header />
            <Layout>
                <div className='w-full my-10'>
                    <Card
                        className="overflow-hidden" x-chunk="dashboard-05-chunk-4" id='products'
                    >
                        <CardHeader className="flex flex-row items-start bg-muted/50">
                            <div className="grid gap-0.5">
                                <CardTitle className="group flex items-center gap-2 text-lg">
                                    {orderData._id}
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <Copy className="h-3 w-3" />
                                        <span className="sr-only">Copy Order ID</span>
                                    </Button>
                                </CardTitle>
                                <CardDescription>Date: {new Date(orderData.createdAt).toLocaleString("en-Us", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}</CardDescription>
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                                <Button size="sm" variant="outline" className="h-8 gap-1">
                                    <Truck className="h-3.5 w-3.5" />
                                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                        Track Order
                                    </span>
                                </Button>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="outline" className="h-8 w-8">
                                            <MoreVertical className="h-3.5 w-3.5" />
                                            <span className="sr-only">More</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className='bg-white'>
                                        {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                                        <DropdownMenuItem>
                                            <button onClick={() => exportAsPDF("product")} className='cursor-pointer'>
                                                Export
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {/* <div onClick={() => exportAsPDF('My order receipt')} className='cursor-pointer'>
                                    Export
                                </div> */}
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 text-sm">
                            <div className="grid gap-3">
                                <div className="font-semibold">Order Details</div>
                                <ul className="grid gap-3">
                                    {orderData.products.map((product: any) => (
                                        <li className="flex items-center justify-between" key={product._id}>
                                            <span className="text-muted-foreground flex items-center gap-3">
                                                <span>
                                                    {product.name.length > 15
                                                        ? `${product.name.substring(0, 15)}...`
                                                        : product.name}
                                                </span>
                                                x
                                                <span>{product.qty}</span>
                                                <span>/ {product.size}</span>
                                            </span>
                                            <span>$ {(product.price * product.qty).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Separator className="my-2" />
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${orderData.totalBeforeDiscount}</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Coupon Applied</span>
                                        {orderData.couponApplied ? (
                                            <span>${orderData.couponApplied}</span>
                                        ) : (
                                            <span>$0.00</span>
                                        )}
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span>${orderData.taxPrice}</span>
                                    </li>
                                    <li className="flex items-center justify-between font-semibold">
                                        <span className="text-muted-foreground">Total</span>
                                        <span>${orderData.total}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="grid gap-3 mt-10">
                                <div className="font-semibold">Order Status</div>
                                <div className='flex items-center justify-between mb-0'>
                                    <span>
                                        Order Status
                                    </span>
                                    <span
                                        className={
                                            orderData.status === "Not Processed"
                                                ? "text-red-600"
                                                : orderData.status === "Processing"
                                                    ? "text-yellow-500"
                                                    : orderData.status === "Dispatched"
                                                        ? "text-[#1e91cf]"
                                                        : orderData.status === "Cancelled"
                                                            ? "text-[#e3d4d4]"
                                                            : orderData.status === "Completed"
                                                                ? "text-[#4cb64c]"
                                                                : ""
                                        }
                                    >
                                        {orderData.status}
                                    </span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex items-center justify-between">
                                    <span>
                                        Payment Status
                                    </span>
                                    {orderData.isPaid ? (
                                        <Image src="/images/verified.png" alt="paid" width={20} height={20} />
                                    ) : (
                                        <Image src="/images/unverified.png" alt="paid"
                                            width={20}
                                            height={20}
                                        />
                                    )}
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid grid-cols-1 gap-4">
                                <div className="grid gap-3">
                                    <div className="font-semibold">Shipping Information</div>
                                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                                        <div className="flex gap-3 justify-between items-center">
                                            <span>Full name :</span>
                                            <span>
                                                {orderData.shippingAddress.firstName} {" "}
                                                {orderData.shippingAddress.lastName}
                                            </span>
                                        </div>
                                        <div className="flex gap-3 justify-between items-center">
                                            <span>Address One :</span>
                                            <span>
                                                {orderData.shippingAddress.address1}
                                            </span>
                                        </div>
                                        <div className="flex gap-3 justify-between items-center">
                                            <span>Address Two :</span>
                                            <span>
                                                {orderData.shippingAddress.address2}
                                            </span>
                                        </div>
                                        <div className="flex gap-3 justify-between items-center">
                                            <span>State/Province :</span>
                                            <span>
                                                {orderData.shippingAddress.state}
                                            </span>
                                        </div>
                                        <div className="flex gap-3 justify-between items-center">
                                            <span>City :</span>
                                            <span>
                                                {orderData.shippingAddress.city}
                                            </span>
                                        </div>
                                        <div className="flex gap-3 justify-between items-center">
                                            <span>Zipcode :</span>
                                            <span>{orderData.shippingAddress.zipCode}</span>

                                        </div>
                                        <div className="flex gap-3 justify-between items-center">
                                            <span>Country :</span>
                                            <span>{orderData.shippingAddress.country}</span>
                                        </div>
                                    </address>
                                </div>
                                <div className="grid auto-rows-max gap-3">
                                    <div className="font-semibold">Billing Information</div>
                                    <div className="text-muted-foreground">
                                        Same as shipping address
                                    </div>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Customer Information</div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Customer</dt>
                                        <dd>
                                            {orderData.shippingAddress.firstName} {" "}
                                            {orderData.shippingAddress.lastName}
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Email</dt>
                                        <dd>
                                            <a href="mailto:">{orderData.user.email}</a>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Payment Information</div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="flex items-center gap-1 text-muted-foreground capitalize">
                                            <span>
                                                {orderData.paymentMethod === "paypal" ? <span className='flex items-center gap-3'><PayPalIcon height={15} width={15} title='' /> Paypal</span> : ""}
                                                {orderData.paymentMethod === "credit_card" ? <span className='flex items-center gap-3'><BsStripe /> Stripe Card</span> : ""}
                                                {orderData.paymentMethod === "cash" ? <span className='flex items-center gap-3'><BsCashStack /> Cash Payment</span> : ""}
                                            </span>

                                        </dt>
                                        <dd>**** **** ****</dd>
                                    </div>
                                </dl>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                            <div className="text-xs text-muted-foreground">
                                <span>Updated {new Date(orderData.createdAt).toLocaleString("en-Us", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}</span>
                            </div>
                            <Pagination className="ml-auto mr-0 w-auto">
                                <PaginationContent>
                                    <PaginationItem>
                                        <Button size="icon" variant="outline" className="h-6 w-6">
                                            <ChevronLeft className="h-3.5 w-3.5" />
                                            <span className="sr-only">Previous Order</span>
                                        </Button>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <Button size="icon" variant="outline" className="h-6 w-6">
                                            <ChevronRight className="h-3.5 w-3.5" />
                                            <span className="sr-only">Next Order</span>
                                        </Button>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </CardFooter>
                    </Card>
                </div>
                {!orderData.isPaid && (
                    <div>
                        {orderData.paymentMethod === "paypal" && (
                            <div>
                                {isPending ? (
                                    <span>loading...</span>
                                ) : (
                                    <PayPalButtons
                                        createOrder={createOrderHandler}
                                        onApprove={onApproveHandler}
                                        onError={onErrorHandler}
                                    ></PayPalButtons>
                                )}
                            </div>
                        )}
                        {orderData.paymentMethod === "credit_card" && (
                            <StripePayment
                                total={orderData.total}
                                order_id={orderData._id}
                                stripe_public_key={stripe_public_key}
                            />
                        )}
                        {orderData.paymentMethod === "cash" && (
                            <div>cash</div>
                        )}
                    </div>
                )}
            </Layout>
        </>
    )
}

export async function getServerSideProps(context: any) {
    db.connectDb();
    const { query } = context;
    const { id } = query;
    const order = await Order.findById(id).populate({ path: "user", model: User }).lean();
    const paypal_client_id = process.env.PAYPAL_CLIENT_ID;
    const stripe_public_key = process.env.STRIPE_PUBLIC_KEY;

    db.disconnectDb();
    return {
        props: {
            orderData: JSON.parse(JSON.stringify(order)),
            paypal_client_id,
            stripe_public_key
        }
    }
}