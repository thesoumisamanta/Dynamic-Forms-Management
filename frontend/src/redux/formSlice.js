import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/forms';

export const submitForm = createAsyncThunk('form/submit', async (formData) => {
    const response = await axios.post(`${API_URL}/submit`, formData);
    return response.data;
});

export const fetchForms = createAsyncThunk('form/fetchAll', async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
});

export const syncExcel = createAsyncThunk('form/syncExcel', async () => {
    const response = await axios.post(`${API_URL}/sync-excel`);
    return response.data;
});

const formSlice = createSlice({
    name: 'form',
    initialState: {
        forms: [],
        status: 'idle',
        syncStatus: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchForms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchForms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.forms = action.payload;
            })
            .addCase(fetchForms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(syncExcel.pending, (state) => {
                state.syncStatus = 'loading';
            })
            .addCase(syncExcel.fulfilled, (state, action) => {
                state.syncStatus = 'succeeded';
                // Optionally update forms if the API returns updated data
                if (action.payload.forms) {
                    state.forms = action.payload.forms;
                }
            })
            .addCase(syncExcel.rejected, (state, action) => {
                state.syncStatus = 'failed';
                state.error = action.error.message;
            });
    },
});

export default formSlice.reducer;