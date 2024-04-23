// Copyright 2024 pierreneter. All rights reserved.

export const resolverError = (key: string, type: string, message: string) => {
  return {
    [key]: { type, message },
  };
};
