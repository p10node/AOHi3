// Copyright 2024 pierreneter. All rights reserved.

import { useActiveAddress, useConnection } from "arweave-wallet-kit";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Editor from "../components/Common/Editor";
import Post from "../components/Post/Post";
import { selectApp, setProcessId } from "../features/app/reducer";
import { createProcess, getPosts } from "../services/ao";

const Home: React.FC = () => {
  const { connected } = useConnection();
  const address = useActiveAddress();
  const dispatch = useAppDispatch();
  const app = useAppSelector(selectApp);

  useEffect(() => {
    if (connected) {
      createProcess().then((processId: string) => {
        dispatch(setProcessId(processId));
      });
    }
  }, [connected, address, dispatch]);

  useEffect(() => {
    if (!connected || !app.processId) {
      return;
    }

    getPosts(app.processId).then((data) => {
      console.log(data);
    });
  }, [app.processId, connected, dispatch]);

  return (
    <>
      <Editor />
      <Post />
    </>
  );
};

export default Home;
