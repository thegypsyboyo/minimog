/* eslint-disable no-unused-vars */
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
import getGreetingByTime from "@/utils/time"

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
    csrfToken: string | null;
    callbackUrl: string | null;
    providers: any[];
    greeting: string;
    // Adjust this type according to your provider data structure
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

export default function Signup({ providers, country, currency, greeting }: Props) {
    // console.log("The Providers:", csrfToken)
    const [user, setUser] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    const Router = useRouter()

    const { name, email, conf_password, success, error, password } = user;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const registrationValidation = Yup.object().shape({
        name: Yup.string().required('What is your name ?').min(2, "First name must be between 2 and 16 characters").max(16, 'First name must be between 2 and 16 characters.').matches(/^[aA-zZ]/, 'Numbers and special characters are not allowed'),

        email: Yup.string()
            .required(
                'You will need this when you log in and  if you enver need to reset your password'
            )
            .email('Enter a valid email address'),

        password: Yup.string()
            .required(
                'Enter a combination of at least six numbers, letters and puncution marks (such as ! and & )'
            )
            .min(6, "Password must be a mix of atleast 6 characters")
            .max(36, "Password cannot be more than 36 characters"),
        conf_password: Yup.string()
            .required("Confirm your password.")
            .oneOf([Yup.ref('password')], 'Passwords must much'),
    })

    const signUpHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post("/api/auth/signup", {
                name,
                email,
                password
            });
            setUser({ ...user, error: "", success: data.message });
            setLoading(false);
            setTimeout(async () => {
                const options = {
                    redirect: false,
                    email,
                    password,
                };
                const res = await signIn("credentials", options);
                Router.push("/");
            }, 2000);
        } catch (error: any) {
            setLoading(false)
            setUser({ ...user, success: "", error: error.response.data.message })
        }
    }
    console.log("Greetings from this time:", greeting)
    return (
        <>
            {
                loading && <DotLoaderSpinner loading={loading} />
            }
            <main className='relative'>
                {/* <Navbar country={country} currency={currency} /> */}
                <div className="relative">
                    <Layout>
                        <div className="w-full py-[60px]">
                            <h1 className="text-[42px] leading-[54px] font-normal text-center w-full">Sign in</h1>
                            <div className="mt-2.5 flex items-center justify-center">
                                <Link href={"/"} className='p-[15px] text-base font-normal'>Home</Link>
                                <span className="py-[15px] text-[12px] flex items-center justify-center"><ChevronRight className='!text-xs w-5 h-4' /></span>
                                <h2 className='p-[15px] text-base font-normal'>Account</h2>
                            </div>
                        </div>
                        <div className="pb-[80px] w-full items-center  flex justify-center md:flex-row flex-col">
                            <div className="w-full sm:w-[50%]  md:w-[50%] lg::w-[33.333%] md:mx-[40px]">
                                <h3 className="mb-[24px] text-[24px] font-medium leading-[32px]">Signin</h3>
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        name,
                                        email,
                                        password,
                                        conf_password
                                    }}
                                    validationSchema={registrationValidation}
                                    onSubmit={() => {
                                        signUpHandler();
                                    }}
                                >
                                    {() => (
                                        <Form>
                                            <LoginInput
                                                type="text"
                                                name="name"
                                                icon="user"
                                                placeholder={"Full name"}
                                                onChange={handleChange}
                                            />
                                            <LoginInput
                                                type="text"
                                                name="email"
                                                icon={"email"}
                                                placeholder='Enter your email'
                                                onChange={handleChange}
                                            />
                                            <LoginInput
                                                type="password"
                                                name="password"
                                                icon="password"
                                                placeholder="Enter Password"
                                                onChange={handleChange}
                                            />
                                            <LoginInput
                                                type="password"
                                                name="conf_password"
                                                icon="password"
                                                placeholder="Re-Type Password"
                                                onChange={handleChange}
                                            />
                                            <button className="bg-black border-black text-white px-[30px] py-[10px] rounded-[5px] outline-none text-center inline-block border-[1px] w-full" type='submit'>Sign up</button>
                                        </Form>
                                    )}
                                </Formik>
                                <div className="text-green-500">
                                    {success && <span>{success}</span>}
                                </div>
                                <div className="text-red-600">
                                    {error && <span>{error}</span>}
                                </div>
                                <div className="">
                                    <p className="my-5 text-center">
                                        Or continue with
                                    </p>
                                    {providers.map((provider) => {
                                        if (provider.name === "Credentials") {
                                            return;
                                        }
                                        return (
                                            <div key={provider.name} className=''>
                                                <button
                                                    className={"flex items-center justify-center py-[12px] px-[30px] bg-white border-solid border-borderColor text-black border my-4 rounded-[5px] gap-5 max-w-full w-full "}
                                                    onClick={() => signIn(provider.id)}
                                                >
                                                    <Image src={`/images/icons/${provider.name}.png`} alt="" width={60} height={60} className='w-[25px] h-[25px] rounded-full object-contain' />
                                                    <div className="text-lg">
                                                        <span className="pr-[4px]">
                                                            Continue with
                                                        </span>
                                                        {provider.name}
                                                    </div>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
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
    const greeting = getGreetingByTime()

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
                providers: [],
                greeting
            }
        };
    }
}