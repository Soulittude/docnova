import { createSlice } from '@reduxjs/toolkit';
import { login } from './authThunks';

const initialState = {
    user: null,
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(login.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;  // store user.jwt here
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
