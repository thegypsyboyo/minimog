import { ApplePayIcon, GooglePayIcon, MastercardIcon, MetaPayIcon, PayPalIcon, VisaIcon } from "@/components/icons"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import React from "react"
import { BsFacebook, BsInstagram, BsPinterest, BsTiktok, BsYoutube } from "react-icons/bs"

const Footer = () => (
    <section className="w-full">
        <div className="w-full bg-footerBackground text-primaryForground py-[30px] lg:py-[80px]">
            <Layout>
                <div className="w-full flex flex-wrap">
                    <div className="lg:w-[33.333%] md:w-1/2 w-[90%]">
                        <div className="w-full pr-[20px]">
                            <h3 className="font-normal text-[25px]">Let&apos;s get in touch</h3>
                            <div className="">
                                <p className="text-base mr-4 font-medium text-primaryForground/40">Sign up for our newletter and receive 10% off for your first order</p>
                                <form className="">
                                    <div className="w-full rounded-lg mt-4 overflow-hidden">
                                        <Input className="outline-none border border-[#dedede] !rounded-md mt-3 bg-white py-[6px] px-[12px] w-full leading-3 text-primaryForground  border-solid" />
                                    </div>
                                    <Button className="bg-primaryForground text-white mt-5 rounded-md">Subscribe now</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[5%]">
                    </div>
                    <div className="lg:w-[18%] md:w-1/2 lg:px-[20px] w-full">
                        <div className="w-full">
                            <h3 className="mb-3 text-lg lg:mt-0 mt-6 font-medium text-black">Quick links</h3>
                            <ul className="w-full">
                                <li className="leading-[34px] block">
                                    <Link href={"/"}>My Account</Link>
                                </li>
                                <li className="leading-[34px] block">
                                    <Link href={"/"}>Cart</Link>
                                </li>
                                <li className="leading-[34px] block">
                                    <Link href={"/"}>Wishlist</Link>
                                </li>
                                <li className="leading-[34px] block">
                                    <Link href={"/"}>Product Compare</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:w-[18%] md:w-1/2 lg:mt-0 mt-6 lg:px-[20px] w-full">
                        <div className="w-full">
                            <h3 className="mb-3 text-lg font-medium text-black">Our company</h3>
                            <ul className="w-full">
                                <li className="leading-[34px] block">
                                    <Link href={"/"}>About us</Link>
                                </li>
                                <li className="leading-[34px] block">
                                    <Link href={"/"}>Delivery Information</Link>
                                </li>
                                <li className="leading-[34px] block">
                                    <Link href={"/"}>Privacy Policy</Link>
                                </li>
                                <li className="leading-[34px] block">
                                    <Link href={"/"}>Terms and Conditions</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:w-[25%] md:w-1/2 lg:px-[20px] w-full">
                        <div className="w-full">
                            <h3 className="mb-3 text-lg lg:mt-0 mt-6 font-medium text-black">Our Store</h3>
                            <div className="flex flex-wrap gap-3 py-1.5">
                                <Link href={""} className="text-primaryForground w-[48px] h-[48px] p-0 inline-flex items-center justify-center rounded-full bg-[#e9e9e9] transition-all duration-300 ">
                                    <BsPinterest />
                                </Link>
                                <Link href={""} className="text-primaryForground w-[48px] h-[48px] p-0 inline-flex items-center justify-center rounded-full bg-[#e9e9e9] transition-all duration-300 ">
                                    <BsInstagram />
                                </Link>
                                <Link href={""} className="text-primaryForground w-[48px] h-[48px] p-0 inline-flex items-center justify-center rounded-full bg-[#e9e9e9] transition-all duration-300 ">
                                    <BsFacebook />
                                </Link>
                                <Link href={""} className="text-primaryForground w-[48px] h-[48px] p-0 inline-flex items-center justify-center rounded-full bg-[#e9e9e9] transition-all duration-300 ">
                                    <BsTiktok />
                                </Link>
                                <Link href={""} className="text-primaryForground w-[48px] h-[48px] p-0 inline-flex items-center justify-center rounded-full bg-[#e9e9e9] transition-all duration-300 ">
                                    <BsTiktok />
                                </Link>
                                <Link href={""} className="text-primaryForground w-[48px] h-[48px] p-0 inline-flex items-center justify-center rounded-full bg-[#e9e9e9] transition-all duration-300 ">
                                    <BsYoutube />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
        <div className="w-full bg-footerBackground text-primaryForground">
            <Layout>
                <div className="flex lg:flex-row flex-col lg:items-end justify-between pt-[20px] pb-[30px] ">
                    <div className="lg:mb-0 mb-6">
                        <span className="">© MINIMOG 2024</span>
                    </div>
                    <div className="flex lg:items-end lg:justify-end flex-col ">
                        <ul className="flex flex-row gap-[16px]">
                            <li className="">
                                <ApplePayIcon width={38} height={24} title="Apple Pay" />
                            </li>
                            <li className="">
                                <MetaPayIcon width={38} height={24} title="Meta Pay" />
                            </li>
                            <li className="">
                                <GooglePayIcon width={38} height={24} title="Mastercard" />
                            </li>
                            <li className="">
                                <PayPalIcon width={38} height={24} title="Mastercard" />
                            </li>
                            <li className="">
                                <MastercardIcon width={38} height={24} title="Mastercard" />
                            </li>
                            <li className="">
                                <VisaIcon width={38} height={24} title="Visa" />
                            </li>
                        </ul>
                        <div className="">
                            <ul className="text-[14px] text-end flex w-full mt-[12px] gap-[40px] items-start text-primaryForground/60 font-medium ">
                                <li className="pointer relative">
                                    <Link href={""}>Privacy Policy</Link>
                                    <div className="absolute top-1/2 right-[-20px] w-[1px] h-1/2 content-[] transform translate-y-[-50%] bg-primaryForground" />
                                </li>
                                <li className="pointer relative">
                                    <Link href={""}>Terms of Service</Link>
                                    <div className="absolute top-1/2 right-[-20px] w-[1px] h-1/2 content-[] transform translate-y-[-50%] bg-primaryForground" />
                                </li>
                                <li className="pointer relative">
                                    <Link href={""}>Appointments</Link>
                                    <div className="absolute top-1/2 right-[0px] left-0 w-[0px] h-1/2 content-[] transform translate-y-[-50%] bg-primaryForground" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    </section>
)

export default Footer