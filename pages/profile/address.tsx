/* eslint-disable no-underscore-dangle */
import Shipping from '@/components/checkout/shipping';
import ProfileLayout from '@/components/profile/layout';
import User from '@/models/User'
import axios from 'axios';
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import React, { useState } from 'react'


type AddressProps = {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address1: string,
    address2: string,
    city: string,
    zipCode: string,
    state: string,
    country: string,
    active: {
        type: boolean,
        default: false,
    }
}

interface UserProps {
    email: string;
    name: string;
    role: string;
    image: string;
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

type AddressObj = {
    _id: string;
    address: AddressProps[]
}

type Props = {
    country: CountryInfo;
    currency: CurrencyInfo;
    user: UserProps
    addresses: AddressObj;
}
const Address = ({ user, addresses, country, currency }: Props) => {

    const [address, setAddress] = useState<Partial<AddressProps[]>>(addresses.address);
    console.log("addressesssss:", addresses.address)
    return (
        <ProfileLayout
            country={country}
            session={user}
            currency={currency}
        >
            <Shipping
                user={user}
                addresses={address}
                setAddresses={setAddress}
                profile
            />
        </ProfileLayout>
    )
}


export default Address

export async function getServerSideProps(ctx: GetServerSidePropsContext) {

    try {
        const { query, req } = ctx;
        const session = await getSession({ req });
        const tab = query.tab || 0;
        const user = session?.user as UserProps

        const address = await User.findById(user._id).select("address").lean()

        console.log("Addrees:", address)
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
                user: session?.user,
                addresses: JSON.parse(JSON.stringify(address)),
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

