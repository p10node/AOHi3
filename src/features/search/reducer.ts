// Copyright 2024 pierreneter. All rights reserved.

import { createReducer } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { emptyPost } from "./types";

const postReducer = createReducer(emptyPost, (builder) => {
  return builder;
});

export const selectPost = (state: RootState) => state.post;

export default postReducer;
