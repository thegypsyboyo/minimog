import { SessionProvider } from "next-auth/react"

import { Provider } from "react-redux"
import '@/styles/globals.css';
import '@/styles/main.scss';

import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Session } from "next-auth";
import { Jost } from 'next/font/google';
import { persistStore } from "redux-persist";

import store from "@/store";
import { PersistGate } from "redux-persist/integration/react";

interface MyAppProps extends AppProps {
  session: Session;
}


const noto = Jost({
  subsets: ['latin'],
  variable: '--font-noto',
  display: 'swap'
})


const persistor = persistStore(store)

export default function App({
  Component,
  pageProps, session }: MyAppProps) {
  return (
    <>
      <Head>
        <title>Minimog - Home</title>
        <meta name="description" content="Online shopping service for all your needs" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <main className={`font-noto ${noto.variable}`}>
              <Component {...pageProps} />
            </main>
          </PersistGate>
        </Provider>
      </SessionProvider>
    </>
  );
}
