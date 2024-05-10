/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import axios from "axios"

export const saveCart = async (cart: any) => {
    try {
        const { data } = await axios.post("/api/user/saveCart", {
            cart
        })
        return data
    } catch (error: any) {
        return error.response.data.message
    }
}

export const saveAddress = async (address: any, userId: any) => {
    try {
        const { data } = await axios.post("/api/user/saveAddress", {
            address,
            userId,
        });
        return data
    } catch (error: any) {
        return error.response.data.message
    }
}

export const changeActiveAddress = async (id: String) => {
    try {
        const { data } = await axios.put("/api/user/manageAddress", {
            id,
        });
        return data;
    } catch (error: any) {
        return error.response.data.message;
    }
};

export const deleteAddress = async (id: String) => {
    try {
        const { data } = await axios.delete("/api/user/manageAddress", {
            data: { id },
        });
        return data;
    } catch (error: any) {
        return error.response.data.message;
    }
};

export const applyCoupon = async (coupon: any) => {
    const { data } = await axios.post("/api/user/applyCoupon", {
        coupon,
    });
    return data;
};
