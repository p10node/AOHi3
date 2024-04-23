// Copyright 2024 pierreneter. All rights reserved.

import { useActiveAddress } from "arweave-wallet-kit";
import React, { useEffect, useState } from "react";
import { Button } from "react-daisyui";
import { Outlet, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getFollowersCount, getFollowingCount, getUserPosts } from "../../features/profiles/reducer";
import { isValidAddress } from "../../services/arweave/isValidAddress";
import BlockContainer from "../Common/BlockContainer";
import Code from "../Common/Code";
import ProfileAvatar from "../Profile/Avatar";
import Banner from "../Profile/Banner";
import Bio from "../Profile/Bio";
import Tabs from "../Profile/Tabs";

const ProfileLayout: React.FC = () => {
  const userAddress = useActiveAddress();
  const { address } = useParams();

  const [valid, setValid] = useState<boolean | null>(null);
  const dispatch = useAppDispatch();
  const [loading] = useState(false);

  const followingCount = useAppSelector(getFollowingCount);
  const followersCount = useAppSelector(getFollowersCount);

  useEffect(() => {
    setValid(isValidAddress(address!));
  }, [address]);

  useEffect(() => {
    dispatch(getUserPosts());
  }, [dispatch]);

  if (valid !== null && !valid) {
    return (
      <BlockContainer className="relative">
        <div>Not Found, Invalid Address</div>
      </BlockContainer>
    );
  }

  return (
    <div className="relative">
      <div></div>
      <Banner />
      <div className="relative mb-[100px]">
        <div className="absolute top-[-130px] left-[5%]">
          <ProfileAvatar address={address!} />
        </div>

        {userAddress === address && (
          <div className="float-right p-6">
            <Button>Edit Profile</Button>
          </div>
        )}
      </div>

      <BlockContainer>
        {/* TO-DO: ANS feature */}
        {/* <div>pierreneter.ar</div> */}
        <Code copy={address} noPadding={true} className="text-[22px] font-bold">
          {address}
        </Code>
      </BlockContainer>

      <div>{loading && <div>Loading...</div>}</div>

      <Bio />

      <BlockContainer className="flex gap-6" noPaddingTop={true}>
        <div>{followingCount} Following</div>
        <div>{followersCount} Followers</div>
      </BlockContainer>

      <div className="mt-6">
        <Tabs userPath={`/profile/${address}`} />
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
