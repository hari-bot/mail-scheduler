import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMailings, createMailing, deleteMailing } from "../api";
import type { AddMailingData, Mailing } from "../types";

export const fetchMailings = createAsyncThunk(
  "mailings/fetchMailings",
  async () => {
    const response = await getMailings();
    return response;
  }
);

export const addMailing = createAsyncThunk(
  "mailings/addMailing",
  async (data: AddMailingData) => {
    const response = await createMailing(data);
    return response;
  }
);

export const removeMailing = createAsyncThunk(
  "mailings/removeMailing",
  async (id: string) => {
    await deleteMailing(id);
    return id;
  }
);

const mailingsSlice = createSlice({
  name: "mailings",
  initialState: { items: [], status: "idle", error: null } as {
    items: Mailing[];
    status: string;
    error: string | null;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMailings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMailings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMailings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addMailing.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeMailing.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (mailing) => mailing.id !== action.payload
        );
      });
  },
});

export default mailingsSlice.reducer;
