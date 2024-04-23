// Copyright 2024 pierreneter. All rights reserved.

import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { PostsType } from "../posts/types";
import { emptyProfile } from "./types";

export const getUserPosts = createAsyncThunk("user/getPosts", async (): Promise<PostsType> => {
  try {
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
});

export const getUserProfile = createAsyncThunk("user/getProfile", async (): Promise<{ name: string; github: string; url: string }> => {
  try {
    return { name: "", github: "", url: "" };
  } catch (error) {
    console.error(error);
    return { name: "", github: "", url: "" };
  }
});

const profileReducer = createReducer(emptyProfile, (builder) => {
  return builder.addCase(getUserPosts.fulfilled, (state, payload) => {
    state.posts = payload.payload;
  });
});

export const selectProfile = (state: RootState) => state.profile;
export const getFollowingCount = (state: RootState) => state.profile.following.length;
export const getFollowersCount = (state: RootState) => state.profile.followers.length;

export default profileReducer;
