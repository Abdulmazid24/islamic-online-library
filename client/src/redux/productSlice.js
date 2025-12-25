import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, PRODUCTS_URL } from '../constants';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ keyword = '', pageNumber = '' } = {}, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `${BASE_URL}${PRODUCTS_URL}?keyword=${keyword}&pageNumber=${pageNumber}`
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

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${BASE_URL}${PRODUCTS_URL}/${id}`);
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


export const deleteProduct = createAsyncThunk(
    'products/delete',
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

            await axios.delete(`${BASE_URL}${PRODUCTS_URL}/${id}`, config);
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const createProduct = createAsyncThunk(
    'products/create',
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

            const { data } = await axios.post(`${BASE_URL}${PRODUCTS_URL}`, {}, config);
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

export const updateProduct = createAsyncThunk(
    'products/update',
    async (product, { getState, rejectWithValue }) => {
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

            const { data } = await axios.put(
                `${BASE_URL}${PRODUCTS_URL}/${product._id}`,
                product,
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

export const createProductReview = createAsyncThunk(
    'products/createReview',
    async ({ productId, review }, { getState, rejectWithValue }) => {
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

            await axios.post(
                `${BASE_URL}${PRODUCTS_URL}/${productId}/reviews`,
                review,
                config
            );
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const deleteProductReview = createAsyncThunk(
    'products/deleteReview',
    async ({ productId, reviewId }, { getState, rejectWithValue }) => {
        try {
            const {
                auth: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.delete(
                `${BASE_URL}${PRODUCTS_URL}/${productId}/reviews/${reviewId}`,
                config
            );
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const fetchTopProducts = createAsyncThunk(
    'products/fetchTop',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${BASE_URL}${PRODUCTS_URL}/top`);
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

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        topProducts: [],
        product: {},
        loading: false,
        error: null,
        loadingDelete: false,
        successDelete: false,
        loadingCreate: false,
        successCreate: false,
        productCreate: null,
        loadingUpdate: false,
        successUpdate: false,
        loadingReview: false,
        successReview: false,
        errorReview: null,
        loadingReviewDelete: false,
        successReviewDelete: false,
        page: 1,
        pages: 1,
    },
    reducers: {
        resetProductState: (state) => {
            state.loadingDelete = false;
            state.successDelete = false;
            state.loadingCreate = false;
            state.successCreate = false;
            state.productCreate = null;
            state.loadingUpdate = false;
            state.successUpdate = false;
            state.successReview = false;
            state.errorReview = null;
            state.successReviewDelete = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.pages = action.payload.pages;
                state.page = action.payload.page;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loadingDelete = true;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.loadingDelete = false;
                state.successDelete = true;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loadingDelete = false;
                state.error = action.payload;
            })
            .addCase(createProduct.pending, (state) => {
                state.loadingCreate = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loadingCreate = false;
                state.successCreate = true;
                state.productCreate = action.payload;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loadingCreate = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loadingUpdate = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loadingUpdate = false;
                state.successUpdate = true;
                state.product = action.payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loadingUpdate = false;
                state.error = action.payload;
            })
            .addCase(createProductReview.pending, (state) => {
                state.loadingReview = true;
            })
            .addCase(createProductReview.fulfilled, (state) => {
                state.loadingReview = false;
                state.successReview = true;
            })
            .addCase(createProductReview.rejected, (state, action) => {
                state.loadingReview = false;
                state.errorReview = action.payload;
            })
            .addCase(deleteProductReview.pending, (state) => {
                state.loadingReviewDelete = true;
            })
            .addCase(deleteProductReview.fulfilled, (state) => {
                state.loadingReviewDelete = false;
                state.successReviewDelete = true;
            })
            .addCase(deleteProductReview.rejected, (state, action) => {
                state.loadingReviewDelete = false;
                state.error = action.payload;
            })
            .addCase(fetchTopProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTopProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.topProducts = action.payload;
            })
            .addCase(fetchTopProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
