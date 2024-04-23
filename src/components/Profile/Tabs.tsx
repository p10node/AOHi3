// Copyright 2024 pierreneter. All rights reserved.

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cn from "../../services/cn";
import BorderLine from "../Common/BorderLine";

const tabs = [
  { url: "", name: "Posts" }, //
  { url: "/following", name: "Following" },
  { url: "/followers", name: "Followers" },
  { url: "/files", name: "Files" },
  { url: "/export", name: "Export" },
];

const Tabs: React.FC<{ userPath: string }> = ({ userPath }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <BorderLine bottom>
      <div className="flex flex-col flex-wrap md:flex-row w-full">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => {
              navigate(`${userPath}${tab.url}`);
            }}
            className={cn(
              "flex items-center px-5 py-2 text-lg font-light", //
              {
                "font-bold bg-[#76ABAE] text-[#222831]": location.pathname === `${userPath}${tab.url}`,
              },
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </BorderLine>
  );
};

export default Tabs;
