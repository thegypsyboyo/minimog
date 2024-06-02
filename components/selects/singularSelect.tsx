/* eslint-disable no-underscore-dangle */
import { MenuItem, TextField } from '@mui/material';
import { ErrorMessage, FieldAttributes, useField } from 'formik';
import Image from 'next/image';
import React from 'react'

interface Props {
    _id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
interface MyInputProps extends FieldAttributes<any> {
    data?: Props[],
    handleChange: any,
    placeholder?: string,
    header?: string,
    disabled?: any,

    // Add any additional props specific to your input component
}
const SingularSelect: React.FC<MyInputProps> = ({
    data,
    handleChange,
    placeholder,
    header,
    disabled,
    ...rest
}) => {
    const [field, meta] = useField(rest.name);

    return (
        <div className="w-full">
            {header && (
                <div className={`pb-[5px] flex flex-col ${meta.error ? "text-red-600" : ""} `}>
                    <div className="flex gap-2 items-center">
                        {meta.error && (
                            <Image
                                src={"/images/warning.png"}
                                alt='warning'
                                width={100}
                                height={90}
                            />
                        )}
                        <p className="mb-2 text-[20px] font-medium">
                            {header}
                        </p>
                    </div>
                </div>
            )}
            <TextField
                variant='outlined'
                name={field.name}
                placeholder={placeholder}
                select
                label={placeholder}
                disabled={disabled}
                value={field.value}
                onChange={handleChange}
                className={`w-full p-2 mt-[1em] ${meta.touched && meta.error && "text-red-600"}`}
            >
                <MenuItem key={""} value="">
                    No Selected / Or Empty
                </MenuItem>
                {data?.map((option: any) => (
                    <MenuItem key={option._id} value={option._id || option.name} className=''>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
            {meta.touched && meta.error && (
                <span className="text-red-600">
                    <ErrorMessage name={field.name} />
                </span>
            )}
        </div>
    )
}

export default SingularSelect