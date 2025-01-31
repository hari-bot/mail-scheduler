import { configureStore } from "@reduxjs/toolkit";
import mailingsReducer from "./slices/mailingsSlice";
import mailersReducer from "./slices/mailersSlice";
import listsReducer from "./slices/listsSlice";

export const store = configureStore({
  reducer: {
    mailings: mailingsReducer,
    mailers: mailersReducer,
    lists: listsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
