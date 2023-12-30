import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
};

export const fetchCounter = createAsyncThunk(
  "counter/fetchCounter",
  async () => {
    const response = await fetch(
      "http://terlan125-001-site1.ftempurl.com/api/information"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCounter.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCounter.fulfilled, (state, action) => {
      state.contents = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCounter.rejected, (state, action) => {
      state.error = action.error.message; // Also corrected here
      state.isLoading = false;
    });
  },
});

export default counterSlice.reducer;
