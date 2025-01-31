import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLists } from "../api";
import type { List } from "../types";

export const fetchLists = createAsyncThunk("lists/fetchLists", async () => {
  const response = await getLists();
  return response;
});

const listsSlice = createSlice({
  name: "lists",
  initialState: { items: [], status: "idle", error: null } as {
    items: List[];
    status: string;
    error: string | null;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default listsSlice.reducer;
