import { configureStore } from "@reduxjs/toolkit";
import screenReducer from '../controller/screenSlice';
import pokemonTypeReducer from '../controller/pokemonTypeSlice';
import pokemonFetchedReducer from '../controller/pokemonFetchedSlice';
import totalPagesSlice from '../controller/totalPagesSlice';

export const store = configureStore({
    reducer: {
        screen: screenReducer,
        pokemonType : pokemonTypeReducer,
        pokemonFetched: pokemonFetchedReducer,
        totalPages: totalPagesSlice
    }
});