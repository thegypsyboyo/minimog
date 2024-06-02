/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from 'next/image';

interface SelectComponentProps {
    property: any;
    text: string;
    data: any[];
    handleChange: (value: any) => void;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ property, text, data, handleChange }) => {
    const [selectedValue, setSelectedValue] = useState(property);

    const onSelect = (value: any) => {
        setSelectedValue(value);
        handleChange(value);
    };

    return (
        <div>
            <span>{text}</span>
            <div className="">
                <Select onValueChange={onSelect}>
                    <SelectTrigger className="w-[180px]">
                        {/* <SelectValue>
                            {text === "Size" ? (
                                selectedValue || `Select ${text}`
                            ) : text === "Style" && selectedValue.image ? (
                                <img src={selectedValue.image} alt="" />
                            ) : text === "How does it fit" && selectedValue ? (
                                selectedValue
                            ) : !selectedValue && text === "How does it fit" ? (
                                "How Does it fit"
                            ) : (
                                "Select Style"
                            )}
                        </SelectValue> */}
                        <SelectValue
                            placeholder={text === "Size" ? (
                                property || `Select ${text}`
                            ) : text === "Style" && property.image ? (
                                <Image src={property.image} width={60} height={60} alt="" />
                            ) : text === "How does it fit" && property ? (
                                property
                            ) : !property && text === "How does it fit" ? (
                                "How Does it fit"
                            ) : (
                                "Select Style"
                            )} >
                            {text === "Size" ? (
                                selectedValue || `Select ${text}`
                            ) : text === "Style" && selectedValue.image ? (
                                <Image src={selectedValue.image} width={30} height={30} className='rounded-full w-[27px] h-[27px] object-cover border border-borderColor' alt="" />
                            ) : text === "How does it fit" && selectedValue ? (
                                selectedValue
                            ) : !selectedValue && text === "How does it fit" ? (
                                "How Does it fit"
                            ) : (
                                "Select Style"
                            )}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectGroup>
                            <SelectLabel>
                                {text === "Size" ? (
                                    selectedValue || `Select ${text}`
                                ) : text === "Style" && selectedValue.image ? (
                                    <Image src={selectedValue.image} alt="" width={60} height={60} className='w-[30px] h-[30px] rounded-full border border-borderColor' />
                                ) : text === "How does it fit" && selectedValue ? (
                                    selectedValue
                                ) : !selectedValue && text === "How does it fit" ? (
                                    "How Does it fit"
                                ) : (
                                    "Select Style"
                                )}
                            </SelectLabel>

                            {data.map((item, i) => {
                                if (text === "Size") {
                                    return (
                                        <SelectItem key={i} value={item.size} onClick={() => onSelect(item.size)}>
                                            <span>{item.size}</span>
                                        </SelectItem>
                                    );
                                }
                                if (text === "Style") {
                                    return (
                                        <SelectItem
                                            key={i}
                                            value={item}
                                            onClick={() => onSelect(item)}
                                            style={{ backgroundColor: `${item.color} ` }}
                                        >
                                            <span>
                                                <Image
                                                    src={item.image}
                                                    alt=""
                                                    width={1500}
                                                    height={1500}
                                                    className="w-full h-[20px] object-cover"
                                                />
                                            </span>
                                        </SelectItem>
                                    );
                                }
                                if (text === "How does it fit") {
                                    return (
                                        <SelectItem key={i} value={item} onClick={() => onSelect(item)}>
                                            <span>{item}</span>
                                        </SelectItem>
                                    );
                                }
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default SelectComponent;
