// Copyright 2024 pierreneter. All rights reserved.

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ArweaveWalletKit } from "arweave-wallet-kit";
import React from "react";
import { searchQraphQL } from "../../config";
import PopupProvider from "../Popup/PopupProvider";
import Router from "../Router/Router";
import Toast from "../Toast/Toast";

const client = new ApolloClient({ uri: searchQraphQL, cache: new InMemoryCache() });

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ArweaveWalletKit
        config={{
          permissions: ["ACCESS_ADDRESS", "SIGN_TRANSACTION", "SIGNATURE", "ACCESS_ALL_ADDRESSES"],
          ensurePermissions: true,
        }}
      >
        <PopupProvider>
          <Router />
          <Toast />
        </PopupProvider>
      </ArweaveWalletKit>
    </ApolloProvider>
  );
};

export default App;
