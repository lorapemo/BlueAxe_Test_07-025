import {createSlice} from '@reduxjs/toolkit';

const screenSlice = createSlice({
    name: 'screen',
    initialState: {
        isScreenSmall: false //Defined as less than 800px
    },
    reducers: {
        setIsScreenSmall: (state, action) => {
            state.isScreenSmall = action.payload
        }
    }
})

export const { setIsScreenSmall } = screenSlice.actions;
export default screenSlice.reducer;