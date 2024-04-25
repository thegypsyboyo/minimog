/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import Footer from '@/components/home/shared/footer';
import Navbar from '@/components/home/shared/navbar';
// import Navbar from '@/components/home/shared/navbar'
import Layout from '@/components/layout';
import DotLoaderSpinner from '@/components/loaders/dotLoader';
import axios from 'axios';
// import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import { getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import * as Yup from "yup"
import { Formik, Form } from "formik"
import LoginInput from '@/components/input/loginInput';
import Image from 'next/image';

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
    csrfToken: string;
    callbackUrl: string | null;
    providers: any[]; // Adjust this type according to your provider data structure
}

const initialValue = {
    login_email: "",
    login_password: "",
    name: "",
    email: "",
    password: "",
    conf_password: "",
    success: "",
    error: "",
    login_error: ""
}

export default function Signin({ providers, csrfToken, callbackUrl, country, currency }: Props) {
    console.log("The Providers:", csrfToken)
    const [user, setUser] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    const Router = useRouter()
    const currentPath = Router.asPath;

    const { login_email, login_password, login_error } = user;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const loginValidation = Yup.object().shape({
        login_email: Yup.string().trim().required('Email address is required.').email('Please enter a valid email address'),
        login_password: Yup.string().required('Please provide a password')
    });

    const signInHandler = async () => {
        setLoading(true);
        const options = {
            redirect: false,
            email: login_email,
            password: login_password,
        };

        const res = await signIn("credentials", options);
        setUser({ ...user, success: "", error: "" });
        setLoading(false);
        if (res?.error) {
            setLoading(false);
            setUser({ ...user, login_error: res.error })
        } else {
            return Router.push(callbackUrl || "/");
        }
    }
    return (
        <>
            {
                loading && <DotLoaderSpinner loading={loading} />
            }
            <main className=''>
                {/* <Navbar country={country} currency={currency} /> */}
                <div className="">
                    <Layout>
                        <div className="w-full py-[60px]">
                            <h1 className="text-[42px] leading-[54px] font-normal text-center w-full">Log in</h1>
                            <div className="mt-2.5 flex items-center justify-center">
                                <Link href={"/"} className='p-[15px] text-base font-normal'>Home</Link>
                                <span className="py-[15px] text-[12px] flex items-center justify-center"><ChevronRight className='!text-xs w-5 h-4' /></span>
                                <h2 className='p-[15px] text-base font-normal'>Account</h2>
                            </div>
                        </div>
                        <div className="pb-[80px] w-full items-start flex justify-center md:flex-row flex-col">
                            <div className="w-full md:w-1/2 md:mx-[40px]">
                                <h3 className="mb-[24px] text-[24px] font-medium leading-[32px]">Log in</h3>
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        login_email,
                                        login_password,
                                    }}
                                    validationSchema={loginValidation}
                                    onSubmit={() => {
                                        signInHandler()
                                    }}
                                >
                                    {() => (
                                        <Form method='post' action={"/api/auth/signin/email"}>
                                            <input
                                                type='hidden'
                                                name="csrfToken"
                                                defaultValue={csrfToken}
                                            />
                                            <LoginInput
                                                type="text"
                                                name="login_email"
                                                icon="email"
                                                placeholder="Email Address"
                                                onChange={handleChange}
                                            />
                                            <LoginInput
                                                type="password"
                                                name="login_password"
                                                icon="password"
                                                placeholder="Enter your passowrd"
                                                onChange={handleChange}
                                            />
                                            <div className="">
                                                <Link href={"/auth/forgot"}>Forgot password ?</Link>
                                            </div>
                                            <button className="bg-black border-black text-white px-[30px] py-[10px] rounded-[5px] outline-none text-center inline-block border-[1px]w-full ">Sign in</button>
                                            {login_error && (
                                                <span className={"text-white"}>{login_error}</span>
                                            )}
                                        </Form>
                                    )}
                                </Formik>
                                <div className="">
                                    <p className="my-5">
                                        Or continue with
                                    </p>
                                    {providers.map((provider) => {
                                        if (provider.name === "Credentials") {
                                            return;
                                        }
                                        return (
                                            <div key={provider.name} className=''>
                                                <button
                                                    className={"flex items-center justify-center py-[14px] px-[30px] bg-white border-solid border-borderColor text-black border my-4 rounded-[5px] gap-5 max-w-full w-full "}
                                                    onClick={() => signIn(provider.id)}
                                                >
                                                    <Image src={`/images/icons/${provider.name}.png`} alt="" width={60} height={60} className='w-[30px] h-[30px] rounded-full object-contain' />
                                                    {provider.name}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 md:mx-[40px] md:mt-0 mt-[40px]">
                                <h3 className="mb-[24px] text-[24px] font-medium leading-[32px]">New Customer</h3>
                                <p className="">Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>
                                <Link href={`/signup?callbackUrl=${encodeURIComponent(currentPath)}`} className="bg-black border-black text-white px-[30px] py-[10px] rounded-[5px] outline-none text-center inline-block border-[1px] mt-[25px]" >Sign Up</Link>

                            </div>
                        </div>
                    </Layout>
                </div>
                <Footer />
            </main>
        </>
    )
}

export async function getServerSideProps(context: any) {

    const { req, query } = context;

    const session = await getSession({ req });

    // const { callbackUrl } = query;
    // const callbackUrl = query.callbackUrl as string | null; // Ensure callbackUrl is string or null
    const callbackUrl = query.callbackUrl ? query.callbackUrl.toString() : null; // Ensure callbackUrl is string or null



    if (session) {
        return {
            redirect: {
                destination: callbackUrl || "/",
            },
        };
    }

    // Fetch CSRF token
    const csrfToken = await getCsrfToken(context);

    // Fetch OAuth providers
    // const providers = await getProviders();
    const providers = Object.values(await getProviders());


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
                currency,
                csrfToken,
                callbackUrl,
                providers
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                country: null,
                currency: null,
                csrfToken,
                callbackUrl,
                providers: [] // Set providers to an empty array if fetching fails
            }
        };
    }
}