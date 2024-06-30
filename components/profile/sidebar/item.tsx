import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import React, { useState } from 'react'
import { HiMinusSm, HiPlusSm } from 'react-icons/hi';
import slugify from 'slugify';

type LinksProps = {
    name?: string;
    link?: string;
    filter?: string;
}
// type Props = {
//     heading: string;
//     links: LinksProps[];
//     link?: any;
// }

type ItemProps = {
    item?: {
        heading: string;
        links?: LinksProps[];
        link?: any;
    };
    visible: boolean;
    index: string;
}

const ItemList = ({ item, visible, index }: ItemProps) => {

    const [show, setShow] = useState<boolean | undefined>(visible);
    const router: NextRouter = useRouter();
    const queryQ = router.query.q as string | undefined;
    return (
        <li className='w-full flex flex-col gap-0 p-0 m-0 items-center '>
            <div className="w-full">
                {item?.heading !== "Sign out" && (
                    <>
                        <div onClick={() => setShow((prev) => !prev)} className='flex items-center justify-between w-full cursor-pointer my-1.5'>
                            {item?.heading} {show ? <HiMinusSm /> : <HiPlusSm />}
                        </div>
                        {show && (
                            <ul className='flex flex-col list-disc gap-0 text-sm ml-7 font-medium '>
                                {item?.links?.map((link, i) => (

                                    <>
                                        {link.link?.startsWith("/profile/orders") ? (
                                            <li
                                                key={i}
                                                className={
                                                    (queryQ?.split("__")[0] || "") ===
                                                        slugify(link?.name as any, { lower: true })
                                                        ? "font-bold my-1 text-blue-600"
                                                        : "my-1"
                                                }
                                            >
                                                <Link href={`${link.link}?tab=${index}&q=${slugify(link.name as string, { lower: true })}__${link.filter}`}>
                                                    <span >{link.name}</span>
                                                </Link>
                                            </li>

                                        ) : (
                                            <li
                                                key={`${i} + 5`}
                                                className={
                                                    (queryQ || "") === slugify(link.name as string, { lower: true })
                                                        ? "font-bold text-blue-600 my-1"
                                                        : "my-1"
                                                }
                                            >
                                                <Link href={`${link.link}?tab=${index}&q=${slugify(link.name as string, { lower: true })}`}>
                                                    <span>{link.name}</span>
                                                </Link>
                                            </li>
                                        )}
                                    </>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
            <div className="w-full">
                {item?.heading === "Sign out" && (
                    <button onClick={() => signOut()}
                        className='bg-black py-2.5 px-[30px] rounded-[3px] text-white w-full mt-20'
                    >
                        Sign out
                    </button>
                )}
            </div>
        </li>
    )
}
export default ItemList