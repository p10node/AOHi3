// Copyright 2024 pierreneter. All rights reserved.

export const isValidAddress = (address: string) => {
  const re: RegExp = /^[a-zA-Z0-9_-]{43}$/;
  const isValid: boolean = re.test(address);
  return isValid;
};
