// Copyright 2024 pierreneter. All rights reserved.

import React, { PropsWithChildren } from "react";

const Span: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return <span className={`text-[#BE513F] ${className}`}>{children}</span>;
};

export default Span;
