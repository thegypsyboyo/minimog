// import styles from "./styles.module.scss";
import { useRef, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";
import Image from "next/image";
// import { Swiper as SwiperPops } from "swiper/react";

// images: Image[];
export interface ImageProps {
    url: string;
    public_url: string;
}
interface ImagePropsArray {
    images: ImageProps[]
}
export default function ProductSwiper({ images }: ImagePropsArray) {
    const swiperRef = useRef<any>(null);
    useEffect(() => {
        swiperRef.current?.swiper?.autoplay.stop();
    }, [swiperRef]);

    return (
        <div
            className={"w-full relative cursor-pointer bg-red-500 h-full overflow-hidden"}
            onMouseEnter={() => {
                swiperRef?.current.swiper.autoplay.start();
            }}
            onMouseLeave={() => {
                swiperRef?.current.swiper.autoplay.stop();
                swiperRef?.current.swiper.slideTo(0); // add this line if you want the slider to go back to first index on mouse leave.
            }}
        >
            <Swiper
                ref={swiperRef || null}
                centeredSlides={true}
                autoplay={{ delay: 500, stopOnLastSlide: false }}
                speed={500}
                modules={[Autoplay]}
                className="h-full"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index} className="w-full h-full bg-yellow-500">
                        <Image src={img.url} alt="" width={1200} height={900} className="w-full object-cover h-full" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
