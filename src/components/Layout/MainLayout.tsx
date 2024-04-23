// Copyright 2024 pierreneter. All rights reserved.

import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import BlockContainer from "../Common/BlockContainer";
import BorderLine from "../Common/BorderLine";
import Container from "../Common/Container";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <div className="w-full">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="col-span-1">
              <Sidebar />
            </div>

            <div className="col-span-3 h-[calc(100vh-112px)] overflow-y-scroll overflow-x-hidden border-x border-color-common">
              <div className="px-6 pb-2">
                <code className="code text-xs">cd {location.pathname}</code>
              </div>

              <Outlet />
            </div>

            <div className="col-span-1 lg:pl-6 mt-6 lg:mt-0">
              <BorderLine bottom>
                <BlockContainer>Trending</BlockContainer>
              </BorderLine>

              <div className="pb-6">
                <div className="mt-6">
                  <a href="https://www.arweave.org/" target="_blank" rel="noopener noreferrer">
                    <img src="/images/arweave-seal.svg" alt="Arweave Seal" />
                  </a>
                </div>
                <div className="mb-3">Powered by Arweave/AO/Permaweb.</div>
                <div className="mb-12">
                  <ul className="font-light">
                    <li>
                      <Link className="underline" to="/about-us">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <a className="underline" href="http://" target="_blank" rel="noopener noreferrer">
                        Permaweb
                      </a>
                    </li>
                    <li>
                      <a className="underline" href="https://www.npmjs.com/package/arweave-wallet-kit" target="_blank" rel="noopener noreferrer">
                        Arweave Wallet Kit
                      </a>
                    </li>
                    <li>
                      <a className="underline" href="http://" target="_blank" rel="noopener noreferrer">
                        Universal Data License
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <div>ArNS Domain by ar.io</div>
                  <div>Arweave gateway by p10node.</div>
                  &copy; Copyright 2024{" "}
                  <a className="underline" href="https://p10node.com" target="_blank" rel="noopener noreferrer">
                    pierreneter
                  </a>
                  . All rights reserved.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
