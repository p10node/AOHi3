// Copyright 2024 pierreneter. All rights reserved.

import React, { PropsWithChildren } from "react";
import cn from "../../services/cn";

const BorderLine: React.FC<
  PropsWithChildren<{
    top?: boolean; //
    left?: boolean;
    bottom?: boolean;
    right?: boolean;
    x?: boolean;
    y?: boolean;
  }>
> = ({ top, left, right, bottom, children }) => {
  const getClassName = () => {
    let border: string = "";

    if (top) {
      border = border += " border-t ";
    }
    if (left) {
      border = border += " border-l ";
    }
    if (right) {
      border = border += " border-r ";
    }
    if (bottom) {
      border = border += " border-b ";
    }
    border = border.replace(/  +/g, " ");

    return border;
  };

  return <div className={cn(getClassName(), "border-color-common")}>{children}</div>;
};

export default BorderLine;
