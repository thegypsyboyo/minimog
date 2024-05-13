import { ErrorMessage, useField, FieldAttributes } from 'formik'
import React from 'react'

interface MyInputProps extends FieldAttributes<any> {
    placeholder?: string;
    type?: string;
    className?: string;
    // Add any additional props specific to your input component
}


const LoginInput: React.FC<MyInputProps> = ({ placeholder, className, type, ...props }) => {
    const [field, meta] = useField(props.name);

    return (
        <div className={`my-6 relative bg-white h-[55px] grid grid-cols-[(15% 85%)] ${meta.touched && meta.error ? "mt-[5rem]" : ""}`}>
            <input
                type={type}
                // name={field.name}
                placeholder={placeholder}
                {...field}
                {...props}
                className={`py-[10px] px-[12px] border-solid border-borderColor text-primaryForground w-full outline-none leading-3 transition-all duration-200 ease-in rounded-[5px] border-[1px] text-base lowercase placeholder:capitalize font-normal ${className}`}
            />
            {meta.touched && meta.error && (
                <div className="absolute top-[-70px] p-[10px] min-h-[50px] w-full rounded-[5px] grid place-items-center text-white font-semibold bg-red-500">
                    {/* <span className='absolute bottom-[-9x] left-[1em] border border-t border-t-red-600  border-r-[10px] border-r-transparent border-l-transparent border-l-[10px] ' /> */}
                    <ErrorMessage name={field.name} />
                </div>
            )}
        </div>
    )
}

export default LoginInput