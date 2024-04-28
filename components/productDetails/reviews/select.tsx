/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
/* eslint-disable @next/next/no-img-element */
import React from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Image from 'next/image';

const SelectComponent = ({ property, text, data, handleChange }: any) => (
    <div>
        <span>{text}</span>
        <div className="">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={text == "Size" ? (
                        property || `Select ${text}`
                    ) : text == "Style" && property.image ? (
                        <img src={property.image} alt="" />
                    ) : text == "How does it fit" && property ? (
                        property
                    ) : !property && text == "How does it fit" ? (
                        "How Does it fit"
                    ) : (
                        "Select Style"
                    )} />
                    {/* <span
                        className={`flex`}
                        style={{
                            padding: "0 5px",
                        }}
                    >
                        {text == "Size" ? (
                            property || `Select ${text}`
                        ) : text == "Style" && property.image ? (
                            <img src={property.image} alt="" />
                        ) : text == "How does it fit" && property ? (
                            property
                        ) : !property && text == "How does it fit" ? (
                            "How Does it fit"
                        ) : (
                            "Select Style"
                        )}
                    </span> */}
                </SelectTrigger>
                <SelectContent className='bg-white'>
                    <SelectGroup>
                        <SelectLabel>{text == "Size" ? (
                            property || `Select ${text}`
                        ) : text == "Style" && property.image ? (
                            <img src={property.image} alt="" />
                        ) : text == "How does it fit" && property ? (
                            property
                        ) : !property && text == "How does it fit" ? (
                            "How Does it fit"
                        ) : (
                            "Select Style"
                        )}</SelectLabel>

                        {data.map((item: any, i: any) => {
                            if (text == "Size") {
                                return (
                                    <SelectItem key={i} onClick={() => handleChange(item.size)} value={item}>
                                        <span>{item.size}</span>
                                    </SelectItem>
                                );
                            }
                            if (text == "Style") {
                                return (
                                    <SelectItem
                                        key={i}
                                        onClick={() => handleChange(item)}
                                        value={item}
                                        style={{ backgroundColor: `${item.color} ` }}
                                    >
                                        <span>
                                            <Image
                                                src={item.image}
                                                alt=""
                                                width={1500}
                                                height={1500}
                                                className='w-full h-[20px] object-cover' />
                                        </span>
                                    </SelectItem>
                                );
                            }
                            if (text == "How does it fit") {
                                return (
                                    <SelectItem key={i} onClick={() => handleChange(item)} value={item}>
                                        <span>{item}</span>
                                    </SelectItem>
                                );
                            }
                        })}
                        {/* <SelectItem value="apple">Apple</SelectItem> */}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
)

export default SelectComponent 