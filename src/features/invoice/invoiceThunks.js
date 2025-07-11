import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchInvoices } from "../../api/invoice";
export const fetchInvoices = createAsyncThunk(
    'invoice/fetchAll',
    async ({ filter }, { getState, rejectWithValue }) => {
        const token = getState().auth.user?.jwt;
        if (!token) {
            return rejectWithValue(t("auth.error"));
        }
        try {
            const response = await searchInvoices(filter, token);
            // API returns { invoices: { content: [...], totalElements, ... }, netTotal, total, totalCount }
            const page = response.data.invoices;
            return {
                items: page.content,
                total: page.totalElements,
            };
        } catch (err) {
            const msg = err.response?.data?.message || t("invoice.fetchfailed");
            return rejectWithValue(msg);
        }
    }
);