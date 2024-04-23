// Copyright 2024 pierreneter. All rights reserved.

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ProfileLayout from "../Layout/ProfileLayout";
import RootLayout from "../Layout/RootLayout";
import SearchLayout from "../Layout/SearchLayout";
import {
  LazyAboutUsPage,
  LazyHomePage,
  LazyNotFoundPage,
  LazyNotificationsPage,
  LazyPostPage,
  LazyProfileExport,
  LazyProfileFiles,
  LazyProfileFollowers,
  LazyProfileFollowing,
  LazyProfilePage,
  LazyRecommendedPage,
  LazySearchPost,
  LazySearchUser,
} from "./elements";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<LazyHomePage />} />
            <Route path="/recommended" element={<LazyRecommendedPage />} />
            <Route path="/profile/:address" element={<ProfileLayout />}>
              <Route path="/profile/:address" element={<LazyProfilePage />} />
              <Route path="/profile/:address/following" element={<LazyProfileFollowing />} />
              <Route path="/profile/:address/followers" element={<LazyProfileFollowers />} />
              <Route path="/profile/:address/files" element={<LazyProfileFiles />} />
              <Route path="/profile/:address/export" element={<LazyProfileExport />} />
            </Route>
            <Route path="/post/:id" element={<LazyPostPage />} />
            <Route path="/search" element={<SearchLayout />}>
              <Route path="/search/:keyword" element={<LazySearchPost />} />
              <Route path="/search/:keyword/users" element={<LazySearchUser />} />
            </Route>
            <Route path="/notifications" element={<LazyNotificationsPage />} />
            <Route path="/about-us" element={<LazyAboutUsPage />} />
            <Route path="*" element={<LazyNotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
