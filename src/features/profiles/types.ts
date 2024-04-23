// Copyright 2024 pierreneter. All rights reserved.

import { PostsType } from "../posts/types";

export type ProfileType = {
  address: string;

  name: string;
  github: string;
  url: string;

  posts: PostsType;

  following: string[];
  followers: string[];
};

export const emptyProfile: ProfileType = {
  address: "",

  name: "",
  github: "",
  url: "",

  posts: [],

  following: [],
  followers: [],
};
