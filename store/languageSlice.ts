/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
    value: string;
}

const initialState: LanguageState = {
    value: 'en', // Default language is English
};

export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
