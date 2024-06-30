import Navbar from '@/components/home/shared/navbar';
import Head from 'next/head';
import React from 'react'
import Layout from '@/components/layout';
import Sidebar from '../sidebar';

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
    children: React.ReactNode;
    session: Partial<UserProps>;
    tab?: any;
    currency: CurrencyInfo;
    country: CountryInfo;
}

const ProfileLayout = ({ children, session, tab, country, currency }: Props) => (
    <div>
        <Head>
            <title>
                Profile - {session?.name}
            </title>
        </Head>
        <Navbar country={country} currency={currency} />
        <Layout >
            <div className="grid grid-cols-[200px_1fr] gap-6 mb-8">

                <Sidebar
                    data={{
                        ...session,
                        tab
                    }}
                />
                <div className="border border-solid rounded-[10px] p-8">
                    {children}
                </div>
            </div>
        </Layout>
    </div>

)

export default ProfileLayout