// Copyright 2024 pierreneter. All rights reserved.

import React, { PropsWithChildren } from "react";
import cn from "../../services/cn";

const BlockContainer: React.FC<PropsWithChildren<{ className?: string; noPaddingTop?: boolean }>> = ({ children, className, noPaddingTop = false }) => {
  return <div className={cn(className, "px-5 pb-3", { "pt-3": !noPaddingTop })}>{children}</div>;
};

export default BlockContainer;
