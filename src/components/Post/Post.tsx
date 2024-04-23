// Copyright 2024 pierreneter. All rights reserved.

import { SuitHeart } from "@styled-icons/bootstrap";
import { Comment } from "@styled-icons/boxicons-regular";
import React from "react";
import Avatar from "../Common/Avatar";
import PostContainer from "./PostContainer";

const Post: React.FC<{ like?: number; comment?: number; content?: string; author?: string }> = ({ like = 0, comment = 0, content = "", author = "" }) => {
  return (
    <PostContainer>
      <div className="flex gap-6">
        <div>
          <Avatar address={author} />
        </div>
        <div className="flex-1 flex gap-3 flex-col">
          <div className="font-bold">{author || "@abc"}</div>
          <div>
            <div className="flex flex-col gap-4 w-[100%] max-w-[520px]">
              <div className="skeleton h-32 w-full"></div>
            </div>
            {content}
          </div>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <SuitHeart size={20} /> {like}
            </div>
            <div className="flex items-center gap-2">
              <Comment size={20} /> {comment}
            </div>
          </div>
        </div>
      </div>
    </PostContainer>
  );
};

export default Post;
