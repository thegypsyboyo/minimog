import React from 'react'
import Footer from '@/components/home/shared/footer';
import Navbar from '@/components/home/shared/navbar';
import axios from 'axios';


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
}

const Products = ({ country, currency }: Props) => (
    <main>
        <Navbar country={country} currency={currency} />
        Products
        <Footer />
    </main>
)

export default Products


export async function getServerSideProps() {

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
                currency
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {
                country: null,
                currency: null,
            }
        };
    }
}