/*****************************************************************
    1- Install with npm install @reduxjs/toolkit react-redux
    2- Create the slice
    3- Configure the store with slice
    4- Use the store as provider for the app in main.jsx
    5- Use the State and Actions from slice in a React Component 
******************************************************************/

import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
        name: 'counter',
        initialState: { 
            value: 1, 
        },
        reducers: {
            increment: state => {
                state.value += 1;
            },
            decrement: state => {
                state.value -= 1;
            },
            incrementByAmount: (state, action) => {
                state.value += action.payload;
            },
        },
    },
);

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;