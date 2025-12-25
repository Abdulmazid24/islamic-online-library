import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, USERS_URL } from '../constants';

// Async thunk for login
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                `${BASE_URL}${USERS_URL}/login`,
                { email, password },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
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

// Async thunk for register
export const register = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                `${BASE_URL}${USERS_URL}`,
                { name, email, password },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
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

// Async thunk for update profile
export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (user, { getState, rejectWithValue }) => {
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
                `${BASE_URL}${USERS_URL}/profile`,
                user,
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
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

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: userInfoFromStorage,
        loading: false,
        error: null,
        successProfileUpdate: false,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userInfo');
            state.userInfo = null;
        },
        resetUpdateProfile: (state) => {
            state.successProfileUpdate = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.successProfileUpdate = true;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, resetUpdateProfile } = authSlice.actions;

export default authSlice.reducer;
