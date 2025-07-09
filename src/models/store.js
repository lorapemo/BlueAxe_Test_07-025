import { configureStore } from "@reduxjs/toolkit";
import screenReducer from '../controller/screenSlice';

export const store = configureStore({
    reducer: {
        screen: screenReducer,
    }
});