// Copyright 2024 pierreneter. All rights reserved.

import React from "react";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <>
      <Link to="/" className="leading-8">
        <div className="text-center">
          <div className="text-[42px] font-bold">AOHi3</div>
          <div>Arweave Social</div>
        </div>
      </Link>
    </>
  );
};

export default Logo;
