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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/router'
import styles from "./styles.module.scss"
import { countries } from "../data/countries";
// import Layout from '../layout'
import SingularSelect from '../selects/singularSelect'
import ShippingInput from '../input/shippingInput'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Separator } from '../ui/separator'



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
    const [visible, setVisible] = useState(!addresses?.length);
    const router = useRouter();


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
        router.reload();
    }

    // console.log("All Address:", addresses)
    return (

        <div className={styles.shipping}>
            {addresses?.map((address: any) => (
                <Card className="w-full relative" key={address._id} onClick={() => changeActiveHandler(address._id)}>
                    <div className={(address.active && styles.active)}
                    />
                    <CardContent >
                        <Separator className="my-4" />
                        <div className="w-full flex justify-between mb-8">
                            {address.active ?
                                (
                                    <span className='text-green-600 text-sm uppercase'>Active Address</span>
                                )
                                : (
                                    <span></span>
                                )}
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button><span>
                                        <RiDeleteBin6Line className='text-2xl text-red-600' />
                                    </span></Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className='bg-white border-none !rounded-[10px]'>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your selected address.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className='rounded-[5px] border-borderColor'>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteHandler(address._id)} className='bg-red-600 text-white rounded-[5px] border-none'>Continue</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid gap-3">
                                <div className="font-semibold">Shipping Information</div>
                                <address className="grid gap-0.5 not-italic text-muted-foreground">
                                    <div className="flex gap-3 justify-between items-center">
                                        <span>Full name :</span>
                                        <span>
                                            {address.firstName} {" "}
                                            {address.lastName}
                                        </span>
                                    </div>
                                    <div className="flex gap-3 justify-between items-center">
                                        <span>Address One :</span>
                                        <span>
                                            {address.address1}
                                        </span>
                                    </div>
                                    <div className="flex gap-3 justify-between items-center">
                                        <span>Address Two :</span>
                                        <span>
                                            {address.address2}
                                        </span>
                                    </div>
                                    <div className="flex gap-3 justify-between items-center">
                                        <span>Phone Number :</span>
                                        <span>
                                            {address.phoneNumber}
                                        </span>
                                    </div>
                                    <div className="flex gap-3 justify-between items-center">
                                        <span>State/Province :</span>
                                        <span>
                                            {address.state}
                                        </span>
                                    </div>
                                    <div className="flex gap-3 justify-between items-center">
                                        <span>City :</span>
                                        <span>
                                            {address.city}
                                        </span>
                                    </div>
                                    <div className="flex gap-3 justify-between items-center">
                                        <span>Zipcode :</span>
                                        <span>{address.zipCode}</span>

                                    </div>
                                    <div className="flex gap-3 justify-between items-center">
                                        <span>Country :</span>
                                        <span>{address.country}</span>
                                    </div>
                                </address>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <button className={"border-black/20 rounded-[3px] mt-4 p-2 py-3 border w-full flex items justify-center"} onClick={() => setVisible(!visible)}>
                {visible ? (
                    <span>
                        <IoMdArrowDropupCircle style={{ fontSize: "2rem", fill: "#222" }} />
                    </span>
                ) : (
                    <span className='flex items-center gap-3 justify-center w-full'>
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