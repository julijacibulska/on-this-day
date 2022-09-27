import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { wikiReducer } from "features/wiki/wikiSlice";

export const store = configureStore({
  reducer: {
    wiki: wikiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
