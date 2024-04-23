// Copyright 2024 pierreneter. All rights reserved.

import { createReducer } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { emptyNotifications } from "./types";

const notificationsReducer = createReducer(emptyNotifications, (builder) => {
  return builder;
});

export const selectNotifications = (state: RootState) => state.notifications;

export default notificationsReducer;
