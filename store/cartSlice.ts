/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = any;

interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            state.cartItems.push(action.payload);
        },
        updateCart(state, action: PayloadAction<CartItem[]>) {
            state.cartItems = action.payload;
        },
        emptyCart(state) {
            state.cartItems = [];
        },
    },
});

export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
