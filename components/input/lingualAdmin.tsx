/* eslint-disable react-hooks/rules-of-hooks */
import { ErrorMessage, FieldAttributes, useField } from 'formik';
import React from 'react';

interface MyInputProps extends FieldAttributes<any> {
    placeholder?: string;
    type?: string;
    label?: string;
    languages: string[];  // Array of languages e.g., ['en', 'fr']
}

const LingualAdmin: React.FC<MyInputProps> = ({ placeholder, label, type, languages, ...props }) => {
    const getFieldName = (name: string, lang: string) => `${name}.${lang}`;

    return (
        <div>
            {label && (
                <div>
                    {label}
                    <span className="text-[#f8285a] ml-1 font-bold">*</span>
                </div>
            )}
            {languages.map((lang) => {
                const [field, meta, helpers] = useField(getFieldName(props.name, lang));
                return (
                    <div key={lang} className="mt-2">
                        <label className={`block ${meta.touched && meta.error ? "text-red-600" : ""}`}>
                            {`${label} (${lang.toUpperCase()})`}
                            <input
                                type={type}
                                placeholder={placeholder}
                                {...field}
                                {...props}
                                name={getFieldName(props.name, lang)}
                                onBlur={() => helpers.setTouched(true)}
                                className='w-full py-[.7em] px-[1em] outline-none border border-[#dbdfe9] rounded-[3px] mt-1'
                            />
                        </label>
                        {meta.touched && meta.error && (
                            <div className="text-red-600 mt-1">
                                <ErrorMessage name={getFieldName(field.name, lang)} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default LingualAdmin;
