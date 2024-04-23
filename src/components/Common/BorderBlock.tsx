// Copyright 2024 pierreneter. All rights reserved.

import React, { PropsWithChildren } from "react";
import cn from "../../services/cn";

const BorderBlock: React.FC<
  PropsWithChildren<{
    noTop?: boolean; //
    noLeft?: boolean;
    noBottom?: boolean;
    noRight?: boolean;
    noX?: boolean;
    noY?: boolean;
  }>
> = ({ noX = false, noY = false, noTop = false, noBottom = false, noLeft = false, noRight = false, children }) => {
  const getClassName = () => {
    if (!noX && !noY && !noTop && !noBottom && !noLeft && !noRight) {
      return "border";
    }

    let border: string = "border-l border-t border-r border-b";

    if (noX) {
      border = border.replace("border-l", "");
      border = border.replace("border-r", "");
    }
    if (noY) {
      border = border.replace("border-t", "");
      border = border.replace("border-b", "");
    }
    if (noTop) {
      border = border.replace("border-t", "");
    }
    if (noBottom) {
      border = border.replace("border-b", "");
    }
    if (noLeft) {
      border = border.replace("border-l", "");
    }
    if (noRight) {
      border = border.replace("border-r", "");
    }
    border = border.replace(/  +/g, " ");

    return border;
  };

  return <div className={cn(getClassName(), "border-color-common")}>{children}</div>;
};

export default BorderBlock;
