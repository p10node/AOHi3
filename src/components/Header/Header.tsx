// Copyright 2024 pierreneter. All rights reserved.

import { BellOutline } from "@styled-icons/evaicons-outline";
import { Bell } from "@styled-icons/evaicons-solid";
import { ConnectButton } from "arweave-wallet-kit";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cn from "../../services/cn";
import Container from "../Common/Container";
import Logo from "../Common/Logo";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("");

  const isSearchPage = location.pathname.startsWith("/search");

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) setValue("");
  }, [location.pathname]);

  return (
    <header className="py-6">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Logo />
            <div className={cn("ml-[36px]", { hidden: isSearchPage })}>
              <label
                className="input input-bordered rounded-3xl flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  navigate("/search/-");
                }}
              >
                <div className="hidden sm:block grow w-[60px] disabled cursor-pointer pl-2 text-gray-600 select-none">Search</div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 cursor-pointer">
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
          </div>
          <div className={cn("hidden sm:block flex-1 ml-[36px] mr-[36px]", { "sm:hidden": !isSearchPage })}>
            <label className="input input-bordered rounded-3xl flex items-center gap-2 cursor-pointer w-full">
              <input className="grow w-full disabled cursor-pointer pl-2 select-none" placeholder="Search" value={value} onChange={(e) => setValue(e.target.value)} />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 cursor-pointer">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <div className="flex gap-6 items-center">
            <div
              className="cursor-pointer"
              onClick={() => {
                navigate("/notifications");
              }}
            >
              {location.pathname === "/notifications" ? <Bell size={32} /> : <BellOutline size={32} />}
            </div>
            <ConnectButton profileModal={true} showBalance={false} useAns={true} showProfilePicture={false} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
