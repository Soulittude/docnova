import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest } from "../../api/auth";

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await loginRequest({ email, password });
            // data = { user: {...}, jwt: '…', … }
            return {
                // embed the entire user object…
                ...response.data.user,
                // …and also bring in the token
                jwt: response.data.jwt,
            };
        } catch (err) {
            const msg = err.response?.data?.message || t("login.failed");
            return rejectWithValue(msg);
        }
    }
);
