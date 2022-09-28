import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { WikiEventResponse } from "types/wiki";
import { fetchWikiOnThisDay } from "./wikiAPI";

export enum ThunkStatus {
  Idle = "IDLE",
  Complete = "COMPLETE",
  Loading = "LOADING",
  Failed = "FAILED",
}

export interface WikiState {
  events: WikiEventResponse;
  status: ThunkStatus;
  error: string | undefined;
}

const initialState: WikiState = {
  events: {
    selected: [],
    births: [],
    deaths: [],
    events: [],
    holidays: [],
  },
  status: ThunkStatus.Idle,
  error: undefined,
};

export const getThisDayEvents = createAsyncThunk(
  "wiki/getThisDayEvents",
  async () => {
    return fetchWikiOnThisDay();
  }
);

export const wikiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getThisDayEvents.pending, (state) => {
      state.status = ThunkStatus.Loading;
    })
    .addCase(getThisDayEvents.fulfilled, (state, action) => {
      state.status = ThunkStatus.Complete;
      state.events = action.payload;
    })
    .addCase(getThisDayEvents.rejected, (state, { error }) => {
      state.status = ThunkStatus.Failed;
      state.error = error.message;
    });
});

export const selectWiki = (state: RootState) => state.wiki;

export default wikiReducer;
