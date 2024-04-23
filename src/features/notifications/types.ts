// Copyright 2024 pierreneter. All rights reserved.

export type NotificationsType = {
  notifications: { code: string; value: string }[];
};

export const emptyNotifications: NotificationsType = {
  notifications: [],
};
