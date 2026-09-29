import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import modalReducer from './modalSlice';
import cepReducer from './cepSlice';
import designnotesReducer from './designnotesSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: { 
    counter: counterReducer, // Add the counter reducer to the store
    modal: modalReducer,
    cep: cepReducer,
    designnotes: designnotesReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
