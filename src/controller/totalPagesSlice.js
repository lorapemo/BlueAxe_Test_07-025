import { createSlice } from "@reduxjs/toolkit";

const totalPagesSlice = createSlice({
    name: 'totalPages',
    initialState: {
        amount: null
    },
    reducers:{
        setAmount:(state, action) =>{
            state.amount = action.payload
        }
    }
})

export const { setAmount } = totalPagesSlice.actions;

export default totalPagesSlice.reducer;