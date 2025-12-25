import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, ORDERS_URL } from '../constants';
import { clearCart } from './cartSlice';

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (order, { getState, rejectWithValue, dispatch }) => {
        try {
            const {
                auth: { userInfo },
            } = getState();

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post(`${BASE_URL}${ORDERS_URL}`, order, config);

            dispatch(clearCart());
            localStorage.removeItem('cartItems');

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const getOrderDetails = createAsyncThunk(
    'order/getOrderDetails',
    async (id, { getState, rejectWithValue }) => {
        try {
            const {
                auth: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(`${BASE_URL}${ORDERS_URL}/${id}`, config);

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const listMyOrders = createAsyncThunk(
    'order/listMyOrders',
    async (_, { getState, rejectWithValue }) => {
        try {
            const {
                auth: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(`${BASE_URL}${ORDERS_URL}/myorders`, config);

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const listOrders = createAsyncThunk(
    'order/listOrders',
    async (_, { getState, rejectWithValue }) => {
        try {
            const {
                auth: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.get(`${BASE_URL}${ORDERS_URL}`, config);

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const deliverOrder = createAsyncThunk(
    'order/deliverOrder',
    async (order, { getState, rejectWithValue }) => {
        try {
            const {
                auth: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                `${BASE_URL}${ORDERS_URL}/${order._id}/deliver`,
                {},
                config
            );

            return data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const payOrder = createAsyncThunk(
    'order/payOrder',
    async (orderId, { getState, rejectWithValue }) => {
        try {
            const {
                auth: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post(
                `${BASE_URL}${ORDERS_URL}/${orderId}/pay`,
                {},
                config
            );

            return data; // returns { url: GatewayPageURL }
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        loading: false,
        loadingPay: false,
        success: false,
        order: null,
        orders: [],
        error: null,
    },
    reducers: {
        resetOrder: (state) => {
            state.loading = false;
            state.success = false;
            state.order = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(listMyOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(listMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(listMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(listOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(listOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(listOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deliverOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(deliverOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload; // Update the specific order in state
            })
            .addCase(deliverOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(payOrder.pending, (state) => {
                state.loadingPay = true;
            })
            .addCase(payOrder.fulfilled, (state, action) => {
                state.loadingPay = false;
                window.location.href = action.payload.url;
            })
            .addCase(payOrder.rejected, (state, action) => {
                state.loadingPay = false;
                state.error = action.payload;
            });
    },
});

export const { resetOrder } = orderSlice.actions;
// export { createOrder, getOrderDetails }; // Already exported individually

export default orderSlice.reducer;
