/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface ExpandState {
    expandSidebar: boolean;
}

const initialState = {
    expandSidebar: true,
};

export const ExpandSlice = createSlice({
    name: "expandSidebar",
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.expandSidebar = !state.expandSidebar;
        },
    },
});

export const { toggleSidebar } = ExpandSlice.actions;

export default ExpandSlice.reducer; 