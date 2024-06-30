/* eslint-disable no-nested-ternary */
import Footer from '@/components/home/shared/footer';
import HomeHeader from '@/components/home/shared/header';
import Navbar from '@/components/home/shared/navbar';
import { cn } from "@/lib/utils"
import { Jost } from 'next/font/google';
import axios from "axios"

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import { useSession } from "next-auth/react"
import ProductIdeas from '@/components/home/productIdeas';
import NewArrivals from '@/components/home/newArrivals';
import db from '@/utils/db';
import Product from "@/models/Product"
import { ProductProps } from '@/types/typings';
import ProductCard from '@/components/productCard/productCard';
import Layout from '@/components/layout';
import { BsChevronRight } from 'react-icons/bs';
import Link from 'next/link';
import Products from '@/components/swipers/products';
import arrival from '@/components/data/arrival.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { useEffect, useRef } from 'react';
import FavProduct from '@/components/favProduct';
import Video from '@/components/favProduct/video';
import ShopCollection from '@/components/shopCollecction';
import DressEdit from '@/components/dressEdit';
import Header from "@/models/home/Header"
import { useSelector } from 'react-redux';

// import ProductCard from '@/components/productCard/ProductCard';

// eslint-disable-next-line camelcase


const noto = Jost({
  subsets: ['latin'],
  variable: '--font-noto'
})

interface CountryInfo {
  name: string;
  flag: string;
  // flag?: {
  //   emojitwo: string;
  // };
}
interface MediaProps {
  url: string;
  public_url: string;
}
interface SliderProps {
  _id: string;
  images: MediaProps[],
  // alt: string,
  video: MediaProps[],
  title: { en: "", fr: "" },
  description: { en: "", fr: "" },
  // title: string,
  // description: string,
  slug: string,
}

interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
}

interface Props {
  country: CountryInfo | null;
  currency: CurrencyInfo | null;
  products: ProductProps[] | null;
  headers: SliderProps[];
}

const productData = arrival as unknown as ProductProps[];

export default function Home({ country, currency, products, headers }: Props) {
  // const { data: session } = useSession()
  // console.log("session", session)
  const language = useSelector((state: any) => state.language.value);

  console.log("EEnglish:", language)
  const swiperRef = useRef<any>();
  useEffect(() => {
    swiperRef.current?.swiper?.autoplay.stop();
  }, [swiperRef]);
  return (
    <>
      <Navbar country={country} currency={currency} />
      <main
        className={cn(
          noto.variable,
          "font-noto w-full"
        )}
      >
        <HomeHeader headers={headers} />
        <ProductIdeas />
        <NewArrivals />
        <Layout>
          <div className="flex md:flex-row flex-col items-center justify-center md:justify-between mb-8">
            <div className="lg:text-[40px] md:text-[35px] text-[28px] font-normal text-black">This week&apos;s hightlight</div>
            <Link href={""} className="font-medium flex gap-1 items-center">
              <span>Shop all items</span>
              <BsChevronRight className='!font-bold' />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {products?.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </Layout>
        <Layout>
          <div className="flex w-full flex-wrap pt-0 py-[0px] relative mb-10">
            <div className="lg:w-1/2 w-full h-[900px] lg:mb-0 mb-4 lg:mt-0 mt-[160px]">
              <Video />
            </div>
            <div className="lg:w-1/2 w-full lg:px-[80px] lg:relative">
              <div className="lg:relative absolute flex items-center flex-col w-full  left-0 top-0">
                <h1 className='font-medium text-lg text-center'>Favorite products</h1>
                <h2 className='font-normal text-[50px] lg:mb-8 text-center mt-4 mb-10 '>Shop this look</h2>
              </div>
              <Swiper
                direction={'horizontal'}
                pagination={{
                  type: 'fraction',
                }}
                spaceBetween={25}
                slidesPerView={2}
                grabCursor={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }}
                loop
                modules={[Autoplay, Pagination, Navigation]}
                className="h-[550px] relative w-full !overflow-hidden"
                onMouseEnter={() => {
                  swiperRef?.current.swiper.autoplay.start();
                }}
                onMouseLeave={() => {
                  swiperRef?.current.swiper.autoplay.stop();
                  swiperRef?.current.swiper.slideTo(0); // add this line if you want the slider to go back to first index on mouse leave.
                }}
              >
                {productData.map((product, index) => (
                  <SwiperSlide key={index}  >
                    <FavProduct product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </Layout>
        <ShopCollection />
        <Layout className='overflow-hidden pt-[120px]'>
          <div className='flex justify-between items-center mb-8'>
            <div className="lg:text-[40px] md:text-[35px] text-[28px] font-normal text-black">This week&apos;s hightlight</div>
            <Link href={""} className="font-medium flex gap-1 items-center">
              <span>Shop all items</span>
              <BsChevronRight className='!font-bold' />
            </Link>
          </div>
          <div
            className='!overflow-hidden w-full'
          >
            <Swiper
              pagination={{
                type: 'fraction',
              }}
              spaceBetween={25}
              slidesPerView={1}
              grabCursor={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2
                },
                768: {
                  slidesPerView: 3
                },
                1024: {
                  slidesPerView: 4
                }
              }}
              loop
              modules={[Autoplay, Pagination, Navigation]}
              className="h-full w-full !overflow-hidden"
              onMouseEnter={() => {
                swiperRef?.current.swiper.autoplay.start();
              }}
              onMouseLeave={() => {
                swiperRef?.current.swiper.autoplay.stop();
                swiperRef?.current.swiper.slideTo(0); // add this line if you want the slider to go back to first index on mouse leave.
              }}
            >
              {productData.map((product, index) => (
                <SwiperSlide key={index} className='overflow-hidden'>
                  <Products product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Layout>
        <DressEdit />
      </main >
      <Footer />
    </>
  );
}

export async function getServerSideProps(): Promise<{ props: Props }> {
  db.connectDb();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  const test = await Header.find({}).sort({ createAt: -1 }).lean();
  // console.log("Header:", test)
  try {
    // Fetch country name from IP registry
    // const ipResponse = await axios.get("https://api.ipregistry.co/?key=beclb0k4pr2to92s");
    // const countryName = ipResponse.data?.location?.country; // Ensure proper access to country name
    // console.log("Country Name:", countryName);

    // Fetch country data from Rest Countries API
    // const countryResponse = await axios.get(`https://restcountries.com/v2/name/${(countryName.name)}`);
    const countryResponse = await axios.get(`https://restcountries.com/v2/name/netherlands`);

    // console.log("Country Response:", countryResponse.data);

    // Extract country and currency information
    const countryData = countryResponse.data[0];
    // const country: CountryInfo = {
    //   name: countryData.name,
    //   flag: countryData.flags?.svg // or any other flag URL you prefer
    // };
    const country: CountryInfo = {
      name: "nethelands",
      flag: "https://www.iamexpat.nl/sites/default/files/styles/article_full_custom_user_desktop_1x/public/flag-netherlands.jpg" // or any other flag URL you prefer
    };
    // console.log("Country Info:", country);

    const currencyData = countryData.currencies[0];
    const currency: CurrencyInfo = {
      code: currencyData.code,
      name: currencyData.name,
      symbol: currencyData.symbol
    };
    // console.log("Currency Info:", currency);

    return {
      props: {
        country,
        currency,
        headers: JSON.parse(JSON.stringify(test)),
        products: JSON.parse(JSON.stringify(products)),
      }
    };
  } catch (error) {
    // console.error("Error fetching data:", error);
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        country: null,
        currency: null,
        headers: JSON.parse(JSON.stringify(test)),

      }
    };
  }
}