// Copyright 2024 pierreneter. All rights reserved.

export type PostType = {
  id: string;

  content: string;
  github: string;
  url: string;
};

export type PostsType = PostType[];

export type PostReducer = {
  posts: PostsType;
  recommended: PostsType;
};

export const emptyPost: PostReducer = {
  posts: [],
  recommended: [],
};
