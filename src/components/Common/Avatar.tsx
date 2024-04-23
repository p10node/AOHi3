// Copyright 2024 pierreneter. All rights reserved.

import React from "react";
import { genAvatar } from "../../services/avatar";

const Avatar: React.FC<{ address: string }> = ({ address }) => {
  return (
    <div className="avatar">
      <div className="w-12 rounded-full">
        <img src={genAvatar(address)} alt="avatar" />
      </div>
    </div>
  );
};

export default Avatar;
