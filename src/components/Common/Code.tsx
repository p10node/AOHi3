// Copyright 2024 pierreneter. All rights reserved.

import { Copy as CopyIcon } from "@styled-icons/fluentui-system-regular";
import React, { PropsWithChildren } from "react";
import cn from "../../services/cn";
import Copy from "./Copy";

const Code: React.FC<PropsWithChildren<{ copy?: string; noPadding?: boolean; className?: string }>> = ({ className, children, copy, noPadding }) => {
  return (
    <Copy content={copy || ""}>
      <div className={cn("rounded-lg cursor-pointer code inline-flex gap-3 items-center", { "px-2": !noPadding }, className)}>
        {children}
        <CopyIcon size={20} className="pt-[4px]" />
      </div>
    </Copy>
  );
};

export default Code;
