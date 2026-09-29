import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 1. Define the async thunk for fetching data
export const getNotes = createAsyncThunk(
  'designnotes/getNotes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/dn/getNotes');
      if (!response.ok) {
        throw new Error('Server error occurred');
      }
      const data = await response.json();
      return data; // This becomes the `action.payload` on fulfillment
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const designnotesSlice = createSlice({
    name: 'designnotes',
    initialState: {
        items: [],
        loading: false,
        error: null, 
        value: 1,
    },
    reducers: {},
    extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default designnotesSlice.reducer;