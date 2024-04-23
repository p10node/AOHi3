// Copyright 2024 pierreneter. All rights reserved.

import { createDataItemSigner, dryrun, message, spawn } from "@permaweb/aoconnect";
import config from "../config";

export const createProcess = async () => {
  const processId = await spawn({
    module: config.aoModule,
    scheduler: "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA",
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [],
    data: undefined,
  });

  return processId;
};

export const getPosts = async (processId: string) => {
  const data = await dryrun({
    process: processId,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [{ name: "Action", value: "GetPosts" }],
  });

  return data;
};

export const post = async (processId: string) => {
  const data = await dryrun({
    process: processId,
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [{ name: "Action", value: "Post" }],
  });

  return data;
};

export const like = async (processId: string, postId: string) => {
  const data = await message({
    process: processId,
    data: JSON.stringify({ postId }),
    signer: createDataItemSigner(window.arweaveWallet),
    tags: [{ name: "Action", value: "Like" }],
  });

  return data;
};
