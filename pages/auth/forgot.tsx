/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-shadow */
// import { BiLeftArrowAlt } from "react-icons/bi";
import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import Link from "next/link";
import axios from "axios";
// import { getSession, signIn } from "next-auth/react";
import DotLoaderSpinner from "@/components/loaders/dotLoader";


import LoginInput from "@/components/input/loginInput";
// import CircledIconBtn from "../../components/buttons/circledIconBtn";
import Footer from "@/components/home/shared/footer";
import Navbar from "@/components/home/shared/navbar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Layout from "@/components/layout";
// import { useRouter } from "next/router";


export default function Forgot() {
    // const [email, setEmail] = useState("");
    // const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");
    // const [loading, setLoading] = useState("");
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');


    const emailValidation = Yup.object().shape({
        email: Yup.string()
            .required(
                'You will need this when you log in and  if you enver need to reset your password'
            )
            .email('Enter a valid email address'),
    })

    const forgotHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post("/api/auth/forgot", {
                email,
            });
            setSuccess(data.message);
            setError("");
            setLoading(false);
            setEmail("")
        } catch (error: any) {
            setLoading(false);
            setSuccess("");
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred');
            }
        }
    }

    return (
        <>
            {loading && <DotLoaderSpinner loading={loading} />}
            <main>
                <Navbar country={{ flag: "/favicon.png", name: "" }} currency={{ code: "", name: "", symbol: "" }} />
                <div className="">
                    <Layout>
                        <div className="w-full py-[60px]">
                            <h1 className="text-[42px] leading-[54px] font-normal text-center w-full">Reset Password</h1>
                            <div className="mt-2.5 flex items-center justify-center">
                                <Link href={"/"} className='p-[15px] text-base font-normal'>Home</Link>
                                <span className="py-[15px] text-[12px] flex items-center justify-center"><ChevronRight className='!text-xs w-5 h-4' /></span>
                                <h2 className='p-[15px] text-base font-normal'>Reset password</h2>
                            </div>
                        </div>
                        <div className="pb-[80px] w-full items-start flex justify-center md:flex-row flex-col">
                            <div className="w-full md:w-1/2 md:mx-[40px]">
                                <h3 className="mb-[24px] text-[24px] font-medium leading-[32px]">Reset Password</h3>
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        email,
                                    }}
                                    validationSchema={emailValidation}
                                    onSubmit={() => {
                                        forgotHandler()
                                    }}
                                >
                                    {() => (
                                        <Form>
                                            <LoginInput
                                                type="text"
                                                name="email"
                                                icon="email"
                                                placeholder="Email Address"
                                                className="placeholder:capitalize font-normal"
                                                onChange={(e: any) => setEmail(e.target.value)}
                                            />
                                            <button className="py-[10px] text-white bg-black flex items-center justify-center px-[30px] rounded-[5px] font-medium">Submit</button>
                                            <div style={{ marginTop: "10px" }}>
                                                {error && <span className={"text-red-500"}>{error}</span>}
                                                {success && <span className={"text-green-500"}>{success}</span>}
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <div className="w-full md:w-1/2 md:mx-[40px] md:mt-0 mt-[40px]">
                                <h3 className="mb-[24px] text-[24px] font-medium leading-[32px]">New Customer</h3>
                                <p className="">Sign up for early Sale access plus tailored new arrivals, trends and promotions. To opt out, click unsubscribe in our emails.</p>
                                <Link href={`/signup`} className="bg-black border-black text-white px-[30px] py-[10px] rounded-[5px] outline-none text-center inline-block border-[1px] font-medium mt-[25px]" >Sign Up</Link>
                            </div>
                        </div>
                    </Layout>
                </div>
                <Footer />
            </main>
        </>
    )
}
