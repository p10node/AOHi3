// Copyright 2024 pierreneter. All rights reserved.

import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PostsType, emptyPost } from "./types";

export const getPosts = createAsyncThunk("post/getPosts", async (): Promise<PostsType> => {
  try {
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
});

const postReducer = createReducer(emptyPost, (builder) => {
  return builder;
});

export const selectPost = (state: RootState) => state.post;

export default postReducer;
