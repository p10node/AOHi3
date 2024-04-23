// Copyright 2024 pierreneter. All rights reserved.

import { Image, VideoCamera } from "@styled-icons/entypo";
import MDEditor from "@uiw/react-md-editor";
import { useActiveAddress, useConnection } from "arweave-wallet-kit";
import React, { useState } from "react";
import Button from "../Button/Button";
import Popup from "../Popup/Popup";
import { usePopups } from "../Popup/context";
import Avatar from "./Avatar";
import FilesHandle from "./FIleHandle";

const Editor: React.FC = () => {
  const [markdown, setMarkdown] = useState("");
  const { connect, connected } = useConnection();
  const address = useActiveAddress();
  const { addPopup, removePopup } = usePopups();
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="border-b border-color-common p-6">
      <div className="flex gap-6 w-full">
        <div>
          <Avatar address={address!} />
        </div>

        <div className="flex-1" data-color-mode="dark">
          <MDEditor
            value={markdown}
            hideToolbar
            height={120}
            preview="edit"
            textareaProps={{
              disabled: !connected,
              placeholder: connected ? "How was your day?" : "Connect to post yours",
            }}
            onChange={(value) => {
              setMarkdown(value!);
            }}
          />

          <div className="mt-1 flex justify-between">
            <div className="flex gap-5">
              <div
                className="flex gap-2"
                onClick={(e) => {
                  if (!connected) {
                    e.preventDefault();
                    connect();
                    return;
                  }

                  const key = addPopup({
                    Component: () => {
                      return (
                        <Popup className="main-bg-color">
                          <FilesHandle
                            chooseFile={(file) => {
                              setFiles([...files, file]);

                              removePopup(key);
                            }}
                          />
                        </Popup>
                      );
                    },
                  });
                }}
              >
                <div className="cursor-pointer">
                  <Image size={32} />
                </div>
                <div className="cursor-pointer">
                  <VideoCamera size={32} />
                </div>
              </div>
              <span className="text-sm text-gray-400 font-light">Mardown supported</span>
            </div>
            <Button
              className="mt-1"
              onClick={(e) => {
                if (!connected) {
                  e.preventDefault();
                  connect();
                  return;
                }
              }}
            >
              Post
            </Button>
          </div>
          <div className="grid grid-cols-6 gap-3 mt-6">
            {files.map((file, i) => (
              <img
                key={i}
                src={`https://arweave.net/${file}`}
                alt=""
                width={150}
                onClick={() => {
                  const f = [...files];
                  delete f[i];
                  setFiles(f.filter((i) => !!i));
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
