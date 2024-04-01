import '@/styles/globals.css';
import '@/styles/main.scss';

import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import type { AppProps } from 'next/app';
import Head from 'next/head';


export default function App({
  Component,
  pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Minimog - Home</title>
        <meta name="description" content="Online shopping service for all your needs" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
