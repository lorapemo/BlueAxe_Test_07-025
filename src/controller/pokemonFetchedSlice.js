import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: null
}

const pokemonFetchedSlice = createSlice({
    name: 'pokemonFetched',
    initialState,
    reducers: {
        fetchStart: (state) => { state.loading = true},
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { fetchStart, fetchSuccess, fetchError } = pokemonFetchedSlice.actions;

export default pokemonFetchedSlice.reducer;