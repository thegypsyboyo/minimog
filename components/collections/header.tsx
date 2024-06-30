import React from 'react'
import Layout from '../layout';

type Props = {
    title: string;
    description: string;
    image: string;
}

const CollectionsHeader = ({ title, description, image }: Props) => (
    <div className='w-full h-[330px] relative ' >
        <div className='w-full h-full bg-center bg-cover bg-no-repeat absolute top-0 left-0 bottom-0 right-0 -z-10 ' style={{ backgroundImage: `url(/images/collections/banner.jpg)` }} />
        <Layout>
            <div className="flex items-center flex-col justify-center w-full h-[330px] z-20">
                <h1 className="text-white text-5xl mb-6 text-center leading-[60px]">Shop collections</h1>
                <p className="max-w-[600px] text-white w-full text-center">Here is your chance to upgrade your wardrobe
                    with a variation of styles and fits that are both feminine and relaxed.</p>
            </div>
        </Layout>
    </div>
)

export default CollectionsHeader