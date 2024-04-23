// Copyright 2024 pierreneter. All rights reserved.

import React from "react";

const Banner: React.FC<{ height?: number }> = ({ height = 256 }) => {
  return (
    <div>
      <div className={`min-h-[256px] bg-[#76ABAE] w-full banner-bg`} style={{ minHeight: height }}></div>
    </div>
  );
};

export default Banner;
