// Copyright 2024 pierreneter. All rights reserved.

import React, { lazy, Suspense } from "react";

const create =
  (Inner: React.LazyExoticComponent<React.FC>, Loading?: React.ReactNode): React.FC =>
  () => {
    if (Loading) return <Suspense fallback={Loading}>{<Inner />}</Suspense>;
    return <Suspense fallback={<div></div>}>{<Inner />}</Suspense>;
  };

export const LazyHomePage = create(lazy(() => import("../../pages/home")));
export const LazyRecommendedPage = create(lazy(() => import("../../pages/recommended")));
export const LazyProfilePage = create(lazy(() => import("../../pages/profile")));
export const LazyProfileFollowers = create(lazy(() => import("../../components/Profile/Followers")));
export const LazyProfileFollowing = create(lazy(() => import("../../components/Profile/Following")));
export const LazyProfileFiles = create(lazy(() => import("../../components/Profile/Files")));
export const LazyProfileExport = create(lazy(() => import("../../components/Profile/Export")));
export const LazyPostPage = create(lazy(() => import("../../pages/post")));
export const LazySearchPage = create(lazy(() => import("../../pages/search")));
export const LazySearchUser = create(lazy(() => import("../../components/Search/User")));
export const LazySearchPost = create(lazy(() => import("../../components/Search/Post")));
export const LazyNotificationsPage = create(lazy(() => import("../../pages/notifications")));
export const LazyAboutUsPage = create(lazy(() => import("../../pages/about-us")));
export const LazyNotFoundPage = create(lazy(() => import("../../pages/not-found")));
