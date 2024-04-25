import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import thunk from "redux-thunk"
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
// import { thunk } from "redux-thunk";
import cart from "./cartSlice"

const reducers = combineReducers({ cart });

const config = {
    key: "root",
    storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
    reducer,
    // middleware: [thunk],
    // middleware: () => new Tuple(thunk),
    // devTools: process.env.NODE_ENV !== "production",
})

export default store;