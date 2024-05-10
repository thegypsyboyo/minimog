/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface ExpandState {
    expandSidebar: boolean;
}

const initialState: ExpandState = {
    expandSidebar: true,
};

export const expandSlice = createSlice({
    name: "expandSidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.expandSidebar = !state.expandSidebar;
        },
    },
});

export const { toggleSidebar } = expandSlice.actions;

export default expandSlice.reducer;
