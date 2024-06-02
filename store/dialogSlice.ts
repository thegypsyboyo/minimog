/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: false,
    header: "",
    msgs: [],
    link: {
        link: "",
        link_text: "",
    },
};

export const DialogSlice = createSlice({
    name: "dialog",
    initialState,
    reducers: {
        showDialog(state: any, action) {
            state.show = true;
            state.header = action.payload.header;
            state.msgs = action.payload.msgs;
            state.link = action.payload.link;
        },
        hideDialog(state: any, action) {
            state.show = false;
            state.header = "";
            state.msgs = [];
            state.link = {};
        },
    },
});

export const { showDialog, hideDialog } = DialogSlice.actions;

export default DialogSlice.reducer;
