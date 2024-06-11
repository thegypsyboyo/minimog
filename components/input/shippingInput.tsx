/* eslint-disable no-unneeded-ternary */
import { ErrorMessage, useField } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input';

const ShippingInput = ({
    placeholder, ...props
}: any) => {

    const inputRef = useRef<any | null>(null);
    const [field, meta] = useField<any | null>(props);
    const [move, setMove] = useState(false);
    useEffect(() => {
        if (field.value.length > 0) {
            setMove(true);
        } else {
            setMove(false)
        }
    }, [field.value]);
    return (
        <div className={`w-full mb-[1.2rem] ${meta.touched && meta.error && "bg-[#ff000008] border-solid border-[#cc674f]"}`}>
            <div
                className="relative w-full"
                onFocus={() => setMove(true)}
                onBlur={() => setMove(field.value.length > 0 ? true : false)}
            >
                <Input
                    ref={inputRef}
                    type={field.type}
                    // name={field.name}
                    {...field}
                    {...props}
                    className='border-solid border-[1px] w-full pl-[1em] pt-[14px] text-[#222] focus:outline-none h-[60px] border-[#ccc] rounded-[5px]'
                />
                <span className={`absolute left-[1em] text-[14px] text-[#666666e2] ${move ? "!transition-all duration-200 transform top-[6px]" : "top-1/2 transform -translate-y-1/2"}`}
                    onClick={() => {
                        inputRef?.current?.focus()
                    }}
                >
                    {placeholder}
                </span>
            </div>
            <p className="text-red-600 text-[13px]">{meta.touched && meta.error && <ErrorMessage name={field.name} />}</p>
        </div>
    )
}

export default ShippingInput