import { sidebarData } from '@/components/data/sidebar';
import Image from 'next/image';
import React from 'react'
import Link from 'next/link';
import ItemList from './item';

// interface UserProps {
//     email: string;
//     name: string;
//     role: string;
//     image: string;
//     _id: string;
// }
// type DataProps = {
//     session?: Partial<UserProps>; // Making all properties of UserProps optional
//     tab: string; // Explicitly typing tab as number
// }

type Props = {
    data: any;
}


const Sidebar = ({ data }: Props) => (
    <div className='w-full rounded-[10px] p-5 border h-fit border-solid'>
        <div className="flex flex-col h-full items-center">
            <div className="relative">
                {data.image && (
                    <Image
                        src={`${data?.image}`}
                        width={1150}
                        height={1150}
                        alt='user-image'
                        className='rounded-full w-[110px] h-[110px] border-solid border-[5px] border-black/20'
                    />
                )}
                <Link href={"/profile/security?tab=0&q=account-security"} className='absolute w-full h-full top-0 left-0 border-orange-50 right-0' />
            </div>
            <span className='mt-2 font-semibold uppercase text-sm'>{data?.name}</span>
            <ul className="w-full 
                 h-fit flex flex-col items-center mt-5">
                {sidebarData.map((item, index) => (
                    <ItemList
                        key={index}
                        item={item}
                        index={index.toString()}
                        visible={data.tab === index.toString()}
                    />
                ))}
            </ul>
        </div>
    </div>
)

export default Sidebar