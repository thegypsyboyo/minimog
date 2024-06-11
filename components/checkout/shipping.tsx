/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import { changeActiveAddress, deleteAddress, saveAddress } from '@/requests/user'
import React, { useState } from 'react'
import * as Yup from "yup"
import "yup-phone"
import { RiDeleteBin6Line } from 'react-icons/ri'
import Image from 'next/image'
import { FaIdCard, FaMapMarkerAlt } from 'react-icons/fa'
import { GiPhone } from 'react-icons/gi'
import { IoIosRemoveCircleOutline, IoMdArrowDropupCircle } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { Form, Formik } from 'formik'
import styles from "./styles.module.scss"
import { countries } from "../data/countries";
// import Layout from '../layout'
import SingularSelect from '../selects/singularSelect'
import ShippingInput from '../input/shippingInput'


const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    state: "",
    city: "",
    zipCode: "",
    address1: "",
    address2: "",
    country: "",
};

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const Shipping = ({ user, addresses, setAddresses, profile }: any) => {

    const [shipping, setShipping] = useState(initialValues);
    const [visible, setVisible] = useState(!user?.address.length);

    const {
        firstName,
        lastName,
        phoneNumber,
        state,
        city,
        zipCode,
        address1,
        address2,
        country,

    } = shipping;

    const validate = Yup.object({
        firstName: Yup.string()
            .required("First name is required.")
            .min(3, "First name must be atleast 3 characters long.")
            .max(20, "First name must be less than 20 characters long."),
        lastName: Yup.string()
            .required("Last name is required.")
            .min(3, "Last name must be atleast 3 characters long.")
            .max(20, "Last name must be less than 20 characters long."),
        phoneNumber: Yup.string()
            .required("Phone number is required.")
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(3, "Phone number must be atleast 3 characters long.")
            .max(30, "Phone number must be less than 20 characters long."),
        state: Yup.string()
            .required("State name is required.")
            .min(2, "State name should contain 2-60 characters..")
            .max(60, "State name should contain 2-60 characters."),
        city: Yup.string()
            .required("City name is required.")
            .min(2, "City name should contain 2-60 characters.")
            .max(60, "City name should contain 2-60 characters."),
        zipCode: Yup.string()
            .required("ZipCode/Postal is required.")
            .min(2, "ZipCode/Postal should contain 2-30 characters..")
            .max(30, "ZipCode/Postal should contain 2-30 characters."),
        address1: Yup.string()
            .required("Address Line 1 is required.")
            .min(5, "Address Line 1 should contain 5-100 characters.")
            .max(100, "Address Line 1 should contain 5-100 characters."),
        address2: Yup.string()
            .min(5, "Address Line 2 should contain 5-100 characters.")
            .max(100, "Address Line 2 should contain 5-100 characters."),
        country: Yup.string().required("Country name is required."),
    })

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setShipping({ ...shipping, [name]: value })
    };
    const saveShippingHandler = async () => {
        const res = await saveAddress(shipping);
        setAddresses(res.addresses);
    }
    // const changeActiveHandler = async (id: any) => {
    //     const res = await changeActiveAddress(id);
    //     setAddresses(res.address);
    // }
    const changeActiveHandler = async (id: string) => {
        const res = await changeActiveAddress(id);
        // console.log("Res status:", res)
        setAddresses(res?.addresses)
    }
    const deleteHandler = async (id: any) => {
        const res = await deleteAddress(id);
        setAddresses(res.address);
    }

    // console.log("All Address:", addresses)
    return (

        <div className={styles.shipping}>
            <div className={"mt-6"}>
                <h3>Shipping Information</h3>
            </div>
            <div className={styles.addresses} >
                {addresses?.map((address: any) => (
                    <div
                        style={{ position: "relative" }}
                        key={address._id}
                    >
                        <div
                            className={styles.address__delete}
                            onClick={() => deleteHandler(address._id)}
                        >
                            <IoIosRemoveCircleOutline />
                        </div>
                        <div
                            className={`border-[1px] ${styles.address} 
                            ${address?.active && styles.active}`}
                            key={address._id}
                            onClick={() => changeActiveHandler(address._id)}
                        >
                            <div className={styles.address__side}>
                                <Image src={user.image} alt="" width={900} height={900} className='rounded-full w-[30px] h-[30px]' />
                            </div>
                            <div className={styles.address__col}>
                                <span>
                                    <FaIdCard />
                                    {address.firstName.toUpperCase()}{" "}
                                    {address.lastName.toUpperCase()}
                                </span>
                                <span>
                                    <GiPhone />
                                    {address.phoneNumber}
                                </span>
                            </div>
                            <div className={styles.address__col}>
                                <span>
                                    <FaMapMarkerAlt />
                                    {address.address1}
                                </span>
                                <span>{address.address2}</span>
                                <span>
                                    {address.city},{address.state},{address.country}
                                </span>
                                <span>{address.zipCode}</span>
                            </div>
                            <span
                                className={styles.active__text}
                                style={{
                                    display: `${!address.active && "none"}`,
                                }}
                            >
                                <span className='text-green-600'>
                                    Active
                                </span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <button className={styles.hide_show} onClick={() => setVisible(!visible)}>
                {visible ? (
                    <span>
                        <IoMdArrowDropupCircle style={{ fontSize: "2rem", fill: "#222" }} />
                    </span>
                ) : (
                    <span>
                        ADD NEW ADDRESS <AiOutlinePlus />
                    </span>
                )}
            </button>
            {visible && (
                <Formik
                    enableReinitialize
                    initialValues={{
                        firstName,
                        lastName,
                        phoneNumber,
                        state,
                        city,
                        zipCode,
                        address1,
                        address2,
                        country,
                    }}
                    validationSchema={validate}
                    onSubmit={() => saveShippingHandler()}
                >
                    {() => (
                        <Form>
                            {/* Singular country select */}
                            <SingularSelect
                                name="country"
                                value={country}
                                handleChange={handleChange}
                                placeholder={"*Country"}
                                data={countries}
                            />

                            <div className={styles.col}>
                                <ShippingInput
                                    name="firstName"
                                    placeholder="*First Name"
                                    onChange={handleChange}
                                />
                                <ShippingInput
                                    name="lastName"
                                    placeholder="*Last Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.col}>
                                <ShippingInput
                                    name="state"
                                    placeholder="*State/Province"
                                    onChange={handleChange}
                                />
                                <ShippingInput
                                    name="city"
                                    placeholder="*City"
                                    onChange={handleChange}
                                />
                            </div>
                            <ShippingInput
                                name="phoneNumber"
                                placeholder="*Phone number"
                                onChange={handleChange}
                            />
                            <ShippingInput
                                name="zipCode"
                                placeholder="*Post/Zip code"
                                onChange={handleChange}
                            />
                            <ShippingInput
                                name="address1"
                                placeholder="Address 1"
                                onChange={handleChange}
                            />
                            <ShippingInput
                                name="address2"
                                placeholder="Address 2"
                                onChange={handleChange}
                            />
                            <button type="submit">Save Address</button>
                        </Form>
                    )}

                </Formik>
            )}
        </div>
    )
}

export default Shipping