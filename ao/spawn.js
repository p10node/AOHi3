// Copyright 2024 pierreneter. All rights reserved.

import { createDataItemSigner, spawn } from "@permaweb/aoconnect";

import fs from "fs";

const wallet = JSON.parse(fs.readFileSync("../wallets/arweave-keyfile-eNSUT_JT0yQgrC6TP4k2IlkO-krjIKzAUgxVPZ58fFI.json", "utf-8"));

const processId = await spawn({
  module: "-7pVC8aDhK1u2U77DbxBABadibvPNXdPSmnGpLsyCyE",
  scheduler: "eNSUT_JT0yQgrC6TP4k2IlkO-krjIKzAUgxVPZ58fFI",
  signer: createDataItemSigner(wallet),
  tags: [{ name: "SDK", value: "aoconnect" }],
  data: undefined,
});

console.log(processId);
