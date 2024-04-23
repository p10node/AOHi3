// Copyright 2024 pierreneter. All rights reserved.

import { createAction, createReducer } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { emptyApp } from "./types";

export const setProcessId = createAction<string>("app/setProcessId");

const appReducer = createReducer(emptyApp, (builder) => {
  return builder.addCase(setProcessId, (state, action) => {
    state.processId = action.payload;
  });
});

export const selectApp = (state: RootState) => state.app;

export default appReducer;
