// Copyright 2024 pierreneter. All rights reserved.

import React from "react";
import { Outlet, useParams } from "react-router-dom";
import SearchTabs from "../Search/Tabs";

const SearchLayout: React.FC = () => {
  const { keyword } = useParams();

  return (
    <>
      <SearchTabs searchPath={`/search/${keyword || "-"}`} />
      <Outlet />
    </>
  );
};

export default SearchLayout;
