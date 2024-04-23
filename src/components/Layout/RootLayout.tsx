// Copyright 2024 pierreneter. All rights reserved.

import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "../Common/ScrollToTop";

const RootLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <>
      <Outlet />
      <ScrollToTop />
    </>
  );
};

export default RootLayout;
