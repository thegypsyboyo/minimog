import Image from 'next/image';
import React, { useState } from 'react'
// import ReactImageMagnify from 'react-image-magnify';

const MainSwiper = ({ images, activeImg }: any) => {

    const [active, setActive] = useState<number>(0);
    return (
        <div className="flex flex-col lg:gap-5 lg:flex-row-reverse items-start justify-start ">
            <div className="w-full h-full relative">
                <Image src={activeImg || images[active].url} width={1200} height={1200} alt='main-image' className='object-cover h-full w-full' />
                {/* <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: activeImg || images[active].url
                    },
                    largeImage: {
                        src: activeImg || images[active].url,
                        width: 1200,
                        height: 2000
                    },
                    enlargedImageContainerDimensions: {
                        width: "150%",
                        height: "150%",
                    }
                }}
                    className=''
                /> */}
                {/* <ReactImageMagnify></ReactImageMagnify> */}
            </div>
            <div className="flex gap-2.5  mx-w-[500px] lg:flex-col  items-center lg:mt-0 mt-5 ">
                {images.map((img: any, index: any) => (
                    <div key={index} className={`${index === active && "border border-solid transition-all duration-300 ease-in border-black overflow-hidden !p-[5px] "} p-[5px] first-of-type:odd:pl-0 group !overflow-hidden w-full h-[90px]`} onMouseEnter={() => setActive(index)} >
                        <Image src={img.url} width={1200} height={1200} alt="" className='w-full h-full object-cover lg:flex-row cursor-pointer transition-all duration-300 ease-in transform ' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainSwiper