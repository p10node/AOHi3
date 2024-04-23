// Copyright 2024 pierreneter. All rights reserved.

import { gql, useQuery } from "@apollo/client";
import { useActiveAddress } from "arweave-wallet-kit";
import React from "react";
import BlockContainer from "./BlockContainer";

const FilesHandle: React.FC<{ chooseFile: (file: string) => void }> = ({ chooseFile }) => {
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
      <div className="mb-2">Choose file to use</div>

      <div className="grid grid-cols-6 gap-2">
        {data.transactions.edges.map((edge: { node: { id: string } }) => {
          return (
            <div
              key={edge.node.id}
              className="col-span-1"
              onClick={() => {
                chooseFile(edge.node.id);
              }}
            >
              <img src={`https://arweave.net/${edge.node.id}`} alt="" />
            </div>
          );
        })}
      </div>
    </BlockContainer>
  );
};

export default FilesHandle;
