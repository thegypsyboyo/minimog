/* eslint-disable import/no-named-as-default */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import thunk from "redux-thunk"
import storage from "redux-persist/lib/storage";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
// import thunk from "redux-thunk";
import cart from "./cartSlice"
import expandSidebar from "./ExpandSlice";
import dialog from "./dialogSlice";
import languageSlice from "./languageSlice";

const reducers = combineReducers({ cart, dialog, expandSidebar, language: languageSlice });

const config = {
    key: "root",
    storage,
};

const reducer = persistReducer(config, reducers);

const store = configureStore({
    reducer,
    // middleware: [thunk],
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

    // middleware: () => new Tuple(thunk),
    devTools: process.env.NODE_ENV !== "production",
})

export default store;