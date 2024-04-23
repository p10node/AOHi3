// Copyright 2024 pierreneter. All rights reserved.

// https://github.com/ardriveapp/turbo-sdk

import { ArweaveSigner, TurboFactory, WinstonToTokenAmount } from "@ardrive/turbo-sdk";
import fs from "fs";

const jwk = JSON.parse(fs.readFileSync("../wallets/arweave-keyfile-eNSUT_JT0yQgrC6TP4k2IlkO-krjIKzAUgxVPZ58fFI.json", "utf-8"));
const signer = new ArweaveSigner(jwk);

const turbo = TurboFactory.authenticated({ signer, token: "arweave" });

const { winc, status, id } = await turbo.topUpWithTokens({
  tokenAmount: WinstonToTokenAmount(100_000_000_000), // 0.1 AR
  feeMultiplier: 1.1, // 10% increase in reward for improved mining chances
});

console.log(winc, status, id);
