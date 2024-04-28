/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import Image from 'next/image';
import { IoArrowDown } from "react-icons/io5";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

const TableSelect = ({ property, text, data, handleChange }: any) => {
    console.log("")
    const [visible, setVisible] = useState<any>(false);
    return (
        <div>
            <span>{text}: </span>
            <div className="">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={text == "Rating" || text == "Size" || text == "Order" ? (
                            property || `Select ${text}`
                        ) : text == "Style" && property?.image ? (
                            <Image
                                src={property?.image}
                                alt=""
                                width={1400}
                                height={1300}
                                className='w-full h-[30px] object-cover'
                            />
                        ) : ("Select Style")} />

                    </SelectTrigger>
                    <SelectContent className='bg-white'>
                        <SelectGroup>
                            <SelectLabel>{text == "Size" ? (
                                property || `Select ${text}:`
                            ) : text == "Style" && property?.image ? (
                                <Image
                                    width={1300}
                                    height={1300}
                                    src={property?.image}
                                    alt=""
                                    className='w-full h-[30px] object-cover'
                                />
                            ) : text == "How does it fit" && property ? (
                                property
                            ) : !property && text == "How does it fit" ? (
                                "How Does it fit"
                            ) : (
                                "Select Style"
                            )}</SelectLabel>

                            {data.map((item: any, i: any) => {
                                if (text == "Rating") {
                                    return (
                                        <SelectItem value={item} key={i} onClick={() => handleChange(item.value)}>
                                            <span>{item.text}</span>
                                        </SelectItem>
                                    );
                                }
                                if (text == "Size") {
                                    return (
                                        <SelectItem value={item} key={i} onClick={() => handleChange(item.size)}>
                                            <span>{item.size}</span>
                                        </SelectItem>
                                    );
                                }
                                if (text == "Style") {
                                    return (
                                        <SelectItem value={item}
                                            key={i}
                                            onClick={() => handleChange(item)}
                                            style={{ backgroundColor: `${item.color}` }}
                                        >
                                            <span>
                                                {item.image ? (
                                                    <Image
                                                        src={item.image}
                                                        width={1400}
                                                        height={1300}
                                                        alt=""
                                                        className='w-full h-[30px] object-cover'
                                                    />
                                                ) : (
                                                    "All Styles"
                                                )}
                                            </span>
                                        </SelectItem>
                                    );
                                }
                                if (text == "Order") {
                                    return (
                                        <SelectItem
                                            value={item}
                                            style={{ width: text == "Order" && "200px" }}
                                            key={i}
                                            onClick={() => handleChange(item.value)}
                                        >
                                            <span>{item.text}</span>
                                        </SelectItem>
                                    );
                                }
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default TableSelect