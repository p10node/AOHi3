// Copyright 2024 pierreneter. All rights reserved.

import React from "react";
import { genAvatar } from "../../services/avatar";

const ProfileAvatar: React.FC<{ address: string; height?: number; width?: number }> = ({ address, height = 220, width = 220 }) => {
  return (
    <div className="avatar">
      <div className="w-[220px] rounded-full border-[5px] border-[#222831]" style={{ minHeight: height, width }}>
        <img src={genAvatar(address)} alt="avatar" />
      </div>
    </div>
  );
};

export default ProfileAvatar;
