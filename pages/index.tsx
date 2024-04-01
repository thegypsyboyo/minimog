import Footer from '@/components/home/shared/footer';
import Header from '@/components/home/shared/header';
import Navbar from '@/components/home/shared/navbar';
import { cn } from "@/lib/utils"

// eslint-disable-next-line camelcase
import { Noto_Sans } from 'next/font/google';


const noto = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto'
  // display: 'swap',
  // adjustFontFallback: false
})

export default function Home() {
  return (
    <>
      <Navbar />
      <main
        // className={`${noto.variable} text-[60px] text-[#222222] font-[400] font-noto min-h-screen`}
        className={cn(
          "",
          noto.variable
        )}
      >
        <Header />
      </main>
      <Footer />
    </>
  );
}
