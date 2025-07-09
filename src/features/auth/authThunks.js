import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest } from "../../api/auth";

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await loginRequest({ email, password });
            //API return {}
            return response.data.user;
        } catch (err) {
            const message =
                err.response?.data?.message || 'Login failed. Please try again.';
            return rejectWithValue(message);
        }
    }
);