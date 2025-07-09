import { createSlice } from "@reduxjs/toolkit";
import { fetchInvoices } from "./invoiceThunks";

const initialState = {
    items: [],
    total: 0,
    status: 'idle',
    error: null,
};

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchInvoices.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchInvoices.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.content;
                state.total = action.payload.totalElements;
            })
            .addCase(fetchInvoices.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export default invoiceSlice.reducer;