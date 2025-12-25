import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL, USERS_URL } from '../constants';

export const listUsers = createAsyncThunk(
    'userList/listUsers',
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

            const { data } = await axios.get(`${BASE_URL}${USERS_URL}`, config);

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

export const deleteUser = createAsyncThunk(
    'userDelete/deleteUser',
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

            await axios.delete(`${BASE_URL}${USERS_URL}/${id}`, config);
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

export const updateUser = createAsyncThunk(
    'userUpdate/updateUser',
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

            const { data } = await axios.put(`${BASE_URL}${USERS_URL}/${user._id}`, user, config);

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

export const getUserDetails = createAsyncThunk(
    'userDetails/getUserDetails',
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

            const { data } = await axios.get(`${BASE_URL}${USERS_URL}/${id}`, config);

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


const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        user: {},
        loading: false,
        error: null,
        successDelete: false,
        successUpdate: false,
    },
    reducers: {
        resetUserState: (state) => {
            state.successDelete = false;
            state.successUpdate = false;
            state.user = {};
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(listUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(listUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(listUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
                state.successDelete = true;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.successUpdate = true;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
