import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchInvoices } from "../../api/invoice";

export const fetchInvoices = createAsyncThunk(
    'invoice/fetchAll',
    //filter should include companyId, documentType, startDate, endDate, page, size etc.
    async ({ filter }, { getState, rejectWithValue }) => {
        const token = getState().auth.user?.jwt;
        if (!token) {
            return rejectWithValue('No authentication token found.');
        }
        try {
            const response = await searchInvoices(filter, token);
            return response.data; // assume { content: [...], totalElements, ... }
        } catch (err) {
            const msg = err.response?.data?.message || "Invoices list wasn't able to fetch";
            return rejectWithValue(msg);
        }
    }
);