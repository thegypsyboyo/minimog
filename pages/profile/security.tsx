/* eslint-disable no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import CircleIconBtn from '@/components/buttons';
import LoginInput from '@/components/input/loginInput';
import ProfileLayout from '@/components/profile/layout'
import ProfileUpload from '@/components/profile/profileUpload';
import { uploadImages } from '@/requests/upload';
import { showDialog } from '@/store/dialogSlice';
import { validateUserProfile } from '@/utils/validation';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { GetServerSidePropsContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from "yup"


interface UserProps {
    email: string;
    name: string;
    role: string;
    image: string;
    defaultPaymentMethod: string;
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


type Props = {
    country: CountryInfo;
    currency: CurrencyInfo;
    user: UserProps
}

const Security = ({ user, country, currency }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [current_password, setCurrent_password] = useState("");
    const [password, setPassword] = useState("");
    const [conf_password, setConf_password] = useState("");
    const [name, setName] = useState("");
    const [images, setImages] = useState<any>([]);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();


    const dispatch = useDispatch();
    const { data: session, update } = useSession();


    const validate = Yup.object({
        current_password: Yup.string()
            .required(
                "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
            )
            .min(6, "Password must be atleast 6 characters.")
            .max(36, "Password can't be more than 36 characters"),
        password: Yup.string()
            .required(
                "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
            )
            .min(6, "Password must be atleast 6 characters.")
            .max(36, "Password can't be more than 36 characters"),
        conf_password: Yup.string()
            .required("Confirm your password.")
            .oneOf([Yup.ref("password")], "Passwords must match."),
        name: Yup.string().min(6, "Name must contain atleast 6 characters")
    })

    const urlToBlob = async (url: string): Promise<Blob> => {
        const response = await fetch(url);
        const blob = await response.blob();
        return blob;
    }

    useEffect(() => {
        if (user._id) {
            setName(user.name)
            setImages([user.image]); // Ensure image is a single string in an array
        }
    }, [user.image, user._id, user.name])


    const changeUserDetailsHandler = async () => {
        setLoading(true);
        let uploaded_image: string = "";

        if (images && images.length > 0) {
            const imageBlob = await urlToBlob(images[0]);
            const imageFormData = new FormData();
            imageFormData.append("path", "profile images");
            imageFormData.append("file", imageBlob);

            const uploaded_images = await uploadImages(imageFormData);
            if (uploaded_images.length) {
                uploaded_image = uploaded_images[0].url; // Assuming the API returns an array of uploaded images
                console.log("Uploaded Image:", uploaded_image)
            }
        }

        try {
            const { data } = await axios.put("/api/user/changeDetails", {
                current_password,
                password,
                image: uploaded_image, // Sending the single image URL
                name,
            });
            // Manually update the session
            const updatedUser = data.user as UserProps;
            // console.log("Upated uerrrr:", updatedUser)

            const newSession = {
                ...session,
                user: {
                    ...session?.user,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    image: updatedUser.image,
                },
            };

            await update(newSession);

            setLoading(false);
            toast.success(data.message);
            setError("");
            setSuccess(data.message);
            router.reload();
        } catch (error: any) {
            setLoading(false);
            setSuccess("");
            toast.error(error.response.data.message);
            setError(error.response.data.message);
        }

    }


    const updateUser = async () => {
        const validationMessage = validateUserProfile(images);
        if (validationMessage === "valid") {
            changeUserDetailsHandler();
        } else {
            dispatch(
                showDialog({
                    header: "Please fill all information",
                    msgs: validationMessage
                })
            )
        }
    }


    return (
        <ProfileLayout
            session={user}
            country={country}
            currency={currency}
        >
            <Head>
                <title>Profile - Change user information</title>
            </Head>
            <Formik
                enableReinitialize
                initialValues={{
                    current_password,
                    password,
                    conf_password,
                    name,
                    images,
                }}
                validationSchema={validate}
                onSubmit={() => {
                    updateUser();
                }}
            >
                {() => (
                    <Form>
                        <ProfileUpload
                            name="imageInputFile"
                            header="Change profile Image"
                            text="Add images"
                            images={images}
                            setImages={setImages}
                        />
                        <LoginInput
                            type="password"
                            name="current_password"
                            icon="password"
                            placeholder="Current Password"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrent_password(e.target.value)}
                        />
                        <LoginInput
                            type="password"
                            name="password"
                            icon="password"
                            placeholder="New Password"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                        <LoginInput
                            type="password"
                            name="conf_password"
                            icon="password"
                            placeholder="Confirm Password"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setConf_password(e.target.value)}
                        />
                        <LoginInput
                            type='text'
                            name="name"
                            placeholder='Your name'
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        />
                        <CircleIconBtn
                            text='Update'
                            type='submit'
                            loading={loading}
                        />
                        {error && <span className={"mt-2 text-red-600"}>{error}</span>}
                        {success && <span className={"mt-2 text-green-600"}>{success}</span>}
                    </Form>
                )}

            </Formik>
        </ProfileLayout>

    )
}

export default Security

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

    try {
        const { query, req } = ctx;
        const session = await getSession({ req });
        const tab = query.tab || 0;
        const user = session?.user as UserProps


        console.log("Updated session:", user);
        // console.log("User:", user);
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
