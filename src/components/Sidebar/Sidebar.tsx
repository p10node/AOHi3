// Copyright 2024 pierreneter. All rights reserved.

import { HomeAlt, Rocket, User } from "@styled-icons/boxicons-regular";
import { useActiveAddress, useConnection, useStrategy } from "arweave-wallet-kit";
import React, { useEffect } from "react";
import { Button as DaisyButton } from "react-daisyui";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import cn from "../../services/cn";
import Button from "../Button/Button";
import Editor from "../Common/Editor";
import Popup from "../Popup/Popup";
import { usePopups } from "../Popup/context";

const Sidebar: React.FC = () => {
  const { connect, connected } = useConnection();
  const address = useActiveAddress();
  const navigate = useNavigate();
  const location = useLocation();
  const { addPopup, removePopup } = usePopups();

  const strategy = useStrategy();

  const profilePath = `/profile/${address || "_"}`;

  useEffect(() => {
    if (connected) {
      console.log(strategy);
      // getPrice();
    }
  }, [connected, strategy]);

  return (
    <div className="flex flex-col gap-2 lg:pr-6 pb-2 lg:pb-0">
      <ul className="w-full mb-6 text-[24px]">
        <li className="py-2">
          <NavLink to="/" className={({ isActive }) => cn("flex items-center gap-2", { "font-bold": isActive, "font-light": !isActive })}>
            {" "}
            <HomeAlt size="32" /> Home
          </NavLink>
        </li>
        <li className="py-2">
          <NavLink to="/recommended" className={({ isActive }) => cn("flex items-center gap-2", { "font-bold": isActive, "font-light": !isActive })}>
            {" "}
            <Rocket size="32" />
            Recommended
          </NavLink>
        </li>
        <li className="py-2">
          <div
            className={cn("flex items-center gap-2 cursor-pointer", {
              "font-bold": location.pathname.startsWith(profilePath),
              "font-light": !location.pathname.startsWith(profilePath),
            })}
            onClick={(e) => {
              if (!connected) {
                e.preventDefault();

                connect();
                return;
              }

              navigate(profilePath);
            }}
          >
            <User size="32" />
            My Profile
          </div>
        </li>
      </ul>

      <Button
        onClick={() => {
          if (!connected) {
            connect();
            return;
          }

          const key = addPopup({
            Component: () => {
              return (
                <Popup className="main-bg-color">
                  <Editor />

                  <div className="mt-3">
                    <DaisyButton
                      onClick={() => {
                        removePopup(key);
                      }}
                    >
                      Close
                    </DaisyButton>
                  </div>
                </Popup>
              );
            },
          });
        }}
      >
        Post
      </Button>
    </div>
  );
};

export default Sidebar;
