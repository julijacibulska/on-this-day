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
};

export const getThisDayEvents = createAsyncThunk(
  "wiki/getThisDayEvents",
  async () => {
    return (await fetchWikiOnThisDay()) as WikiEventResponse;
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
    .addCase(getThisDayEvents.rejected, (state) => {
      state.status = ThunkStatus.Failed;
    });
});

export const selectWiki = (state: RootState) => state.wiki;

export default wikiReducer;
