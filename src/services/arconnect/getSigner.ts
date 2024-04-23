// Copyright 2024 pierreneter. All rights reserved.

import { createDataItemSigner } from "@permaweb/aoconnect";

export const getSigner = () => {
  const signer = createDataItemSigner(window.arweaveWallet);

  return signer;
};
