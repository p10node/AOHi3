// Copyright 2024 pierreneter. All rights reserved.

import { gql, useQuery } from "@apollo/client";
import { useActiveAddress } from "arweave-wallet-kit";
import React from "react";
import BlockContainer from "../Common/BlockContainer";
import Code from "../Common/Code";

const Files: React.FC = () => {
  const address = useActiveAddress()!;

  const SEARCH_QUERY = gql`
    query Search {
      transactions(owners: "${address}", tags: [{ name: "Content-Type", values: "image/*", match: WILDCARD }], first: 10) {
        edges {
          node {
            id
            data {
              type
            }
            tags {
              name
              value
            }
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(SEARCH_QUERY);

  if (loading) {
    return (
      <BlockContainer>
        <div className="mb-2">Loading...</div>
      </BlockContainer>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <BlockContainer>
      <div className="mb-2">
        <Code>images/*</Code>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {data.transactions.edges.map((edge: { node: { id: string } }) => {
          return (
            <div key={edge.node.id} className="col-span-1">
              <a href={`https://arweave.net/${edge.node.id}`} target="_blank" rel="noopener noreferrer">
                <img src={`https://arweave.net/${edge.node.id}`} alt="" />
              </a>
              <div className="text-center">
                <a href={`https://viewblock.io/arweave/tx/${edge.node.id}`} target="_blank" rel="noopener noreferrer" className="underline">
                  Explorer
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </BlockContainer>
  );
};

export default Files;

/*
query Search {
  transactions(
    owners: "eNSUT_JT0yQgrC6TP4k2IlkO-krjIKzAUgxVPZ58fFI"
   tags: [
        { name: "Content-Type", values: "image/*", match: WILDCARD}
      ]
      first: 10
  ) {
    edges {
      node {
        id
        data {
          type
        }
        tags {
          name
          value
        }
      }
    }
    pageInfo {
      hasNextPage
    }
  }
}
*/
