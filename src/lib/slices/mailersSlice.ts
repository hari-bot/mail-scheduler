import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMailers } from "../api";
import type { Mailer } from "../types";

export const fetchMailers = createAsyncThunk(
  "mailers/fetchMailers",
  async () => {
    const response = await getMailers();
    return response;
  }
);

const mailersSlice = createSlice({
  name: "mailers",
  initialState: { items: [], status: "idle", error: null } as {
    items: Mailer[];
    status: string;
    error: string | null;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMailers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMailers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMailers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default mailersSlice.reducer;
