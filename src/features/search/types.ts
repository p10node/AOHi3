// Copyright 2024 pierreneter. All rights reserved.

import { PostsType } from "../posts/types";

export type SearchType = {
  keyword: string;
  posts: PostsType;
};

export const emptyPost: SearchType = {
  keyword: "",

  posts: [],
};
