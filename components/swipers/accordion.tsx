import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import Image from 'next/image'
import { ProductProps } from '@/types/typings'
import { ImageProps } from '../productCard/productSwiper'


// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";


interface MyProducts {
    images: ImageProps[],
    product: ProductProps
}

const AccordionCard = ({ images, product }: MyProducts) => {

    const [active, setActive] = useState<number>(0);

    const [prices, setPrices] = useState(
        (product?.subProducts[active]?.sizes.map((s: any) => s.price).sort((a: any, b: any) =>
            a - b // sort from lowest to highest prices.
        ))
    )
    const data = ""
    console.log("data", data)
    return (
        <div className='w-full flex flex-wrap relative font-noto'>

            <div className="w-[500px]">
                <div className="w-full overflow-hidden">
                    <Swiper
                        // direction={'horizontal'}
                        pagination={{
                            type: 'bullets',
                        }}
                        spaceBetween={0}
                        slidesPerView={1}
                        grabCursor={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        loop
                        modules={[Autoplay, Pagination, Navigation]}
                        className="w-full"
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className='w-full h-[500px]'>
                                    <Image
                                        width={1300}
                                        height={1300}
                                        alt='img-slide'
                                        className='w-full object-cover'
                                        src={img.url}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className="w-[calc(100%-500px)]">
                <div className="w-full pl-[20px] pt-[10px]">
                    <h1 className="text-[35px] font-noto font-light text-black">{product.name}</h1>
                    {prices?.length === 1
                        ? `$${prices[0]}$`
                        : `$${prices[0]} - ${prices[prices.length - 1]}$`}
                </div>
            </div>

        </div>
    )
}

export default AccordionCard