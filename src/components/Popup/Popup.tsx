// Copyright 2024 pierreneter. All rights reserved.

import React, { PropsWithChildren } from "react";
import cn from "../../services/cn";

const Popup: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return (
    <div
      className={cn("inline-block overflow-hidden", "transform transition-all align-top", "w-[1200px] max-w-[75%] mt-[10vh]", "px-6 py-4", "text-left", "z-50")}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div className={cn("shadow-xl p-6 rounded-2xl", className)}>{children}</div>
    </div>
  );
};

export default Popup;
