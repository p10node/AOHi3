// Copyright 2024 pierreneter. All rights reserved.

import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import toastReducer from "../components/Toast/toastReducer";
import appReducer from "../features/app/reducer";
import notificationsReducer from "../features/notifications/reducer";
import postReducer from "../features/posts/reducer";
import profileReducer from "../features/profiles/reducer";

const createStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      toast: toastReducer,
      profile: profileReducer,
      post: postReducer,
      notifications: notificationsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export let store = createStore();

export const refreshStore = () => {
  store = createStore();
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type StoreType = typeof store;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
