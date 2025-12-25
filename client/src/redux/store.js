import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
        order: orderReducer,
        userList: userReducer,
        userDelete: userReducer,
        userUpdate: userReducer,
        userDetails: userReducer,
    },
});

export default store;
