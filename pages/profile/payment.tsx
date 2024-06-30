/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import Payment from '@/components/checkout/payment';
import DotLoaderSpinner from '@/components/loaders/dotLoader';
import ProfileLayout from '@/components/profile/layout';
import User from '@/models/User';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

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


type Props = {
    country: CountryInfo;
    currency: CurrencyInfo;
    user: UserProps,
    defaultPaymentMethod: string;
}

const PaymentMethod = ({ country, currency, user, defaultPaymentMethod }: Props) => {

    const [defaultPayment, setDefaultPayment] = useState(defaultPaymentMethod);

    const [paymentMethod, setPaymentMethod] = useState<string>(defaultPaymentMethod);

    console.log("Payment method", paymentMethod)

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handlePaymentMethod = async () => {
        setLoading(true)
        try {
            const { data } = await axios.put("/api/user/changePaymentMethod", {
                paymentMethod,
            });
            setError("");
            setDefaultPayment(data.paymentMethod);
            // window.location.reload();
            toast.success(data.message)
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            setError(error.response.data.message);
            toast.error(error.response.data.message);
        }
    }

    return (
        <ProfileLayout
            country={country}
            currency={currency}
            session={user}
        >
            <Payment
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
            />
            <button
                disabled={!paymentMethod || paymentMethod === defaultPayment}
                className={`${"bg-blue-600 w-[200px] h-[50px] rounded-[5px] text-white"} ${!paymentMethod || paymentMethod === defaultPayment ? "cursor-not-allowed bg-slate-300" : ""}`}
                onClick={() => handlePaymentMethod()}
            >
                {loading ? <DotLoaderSpinner loading={loading} /> : "Save changes"}
            </button>
            {error && <span className='text-red-600'>{error}</span>}
        </ProfileLayout>

    )
}

export default PaymentMethod


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    try {

        const { query, req } = ctx;
        const session = await getSession({ req });
        const tab = query.tab || 0;
        const user = session?.user as UserProps

        const userInfo = await User.findById(user._id).select("defaultPaymentMethod") as UserProps;

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
                defaultPaymentMethod: JSON.parse(JSON.stringify(userInfo.defaultPaymentMethod)),
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
