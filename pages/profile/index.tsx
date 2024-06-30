import ProfileLayout from '@/components/profile/layout';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'

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
type Props = {
    user: Partial<UserProps>;
    tab: number;
    currency: CurrencyInfo;
    country: CountryInfo;
}

const Profile = ({ user, tab, country, currency }: Props) => (
    <ProfileLayout
        tab={tab}
        session={user}
        country={country}
        currency={currency}
    >{""}</ProfileLayout>
)

export default Profile

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    try {
        const { query, req } = ctx;
        const session = await getSession({ req });
        // const { tab } = query;
        const tab = query.tab || 0;
        console.log("Tab", tab);

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
            }
        };

    } catch (error) {
        console.log("An error occured.")
        return {
            props: {
                user: null,
                tab: null
            }
        };
    }
}