import { ErrorMessage, FieldAttributes, useField } from 'formik';
import React from 'react'


interface MyInputProps extends FieldAttributes<any> {
    placeholder?: string;
    type?: string;
    label?: string;

    // Add any additional props specific to your input component
}


const AdminInput: React.FC<MyInputProps> = ({ placeholder, label, type, ...props }) => {

    const [field, meta] = useField(props.name);

    return (
        <div>
            <span>
                {label}
                <span className="text-red-600">*</span>
            </span>
            <label
                className={`border border-[#dbdfe9] flex items-center h-[42px] overflow-hidden rounded-[3px] mt-2 w-full ${meta.touched && meta.error ? "text-red-600" : ""}`}
            >
                <input
                    type={props?.type}
                    placeholder={placeholder}
                    {...field}
                    {...props}
                    className='w-full py-[.7em] px-[1em] outline-none'
                />
            </label>
            {meta.touched && meta.error && (
                <div className={"text-red-600 mt-1"}>
                    <span className=''></span>
                    <ErrorMessage name={field.name} />
                </div>
            )}

        </div>
    )
}

export default AdminInput