// Copyright 2024 pierreneter. All rights reserved.

import { Heart } from "@styled-icons/boxicons-regular";
import React from "react";
import BlockContainer from "../components/Common/BlockContainer";

const libs = [
  { name: "Arweave Wallet Kit", url: "https://www.npmjs.com/package/arweave-wallet-kit" },
  { name: "Universal Data License", url: "https://mirror.xyz/0x64eA438bd2784F2C52a9095Ec0F6158f847182d9/AjNBmiD4A4Sw-ouV9YtCO6RCq0uXXcGwVJMB5cdfbhE" },
];
const helpful = [{ name: "Learn Lua in Y Minutes", url: "https://learnxinyminutes.com/docs/lua/" }];

const aboutUs: React.FC = () => {
  return (
    <BlockContainer>
      <div className="flex gap-2 flex-col">
        <div className="text-[42px] font-bold">AOHi3 - Arweave Social</div>
        <div>AO hello web3!</div>
        <div>
          This is a project made to participate in a hackathon organized by Weavers starting from Wed Apr 17, 2024.
          <a href="https://www.weaversofficial.com/" target="_blank" rel="noopener noreferrer">
            https://www.weaversofficial.com/
          </a>
        </div>
        <div>
          Use:
          <ul className="pl-6">
            {libs.map((item) => (
              <li className="underline">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          Helpful:
          <ul className="pl-6">
            {helpful.map((item) => (
              <li className="underline">
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          Made with <Heart size={16} /> by pierreneter.
        </div>
      </div>
    </BlockContainer>
  );
};

export default aboutUs;
