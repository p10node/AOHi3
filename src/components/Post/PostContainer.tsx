// Copyright 2024 pierreneter. All rights reserved.

import React, { PropsWithChildren } from "react";
import BorderLine from "../Common/BorderLine";

const PostContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <BorderLine bottom>
      <div className="p-6">{children}</div>
    </BorderLine>
  );
};

export default PostContainer;
