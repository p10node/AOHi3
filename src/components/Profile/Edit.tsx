// Copyright 2024 pierreneter. All rights reserved.

import { Popup } from "@styled-icons/entypo";
import React from "react";
import { Button, Input } from "react-daisyui";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import FilesHandle from "../Common/FIleHandle";
import { usePopups } from "../Popup/context";
import ProfileAvatar from "./Avatar";
import Banner from "./Banner";

export type ProfileForm = {
  name: string;
  github: string;
  url: string;
  avatar: string;
  banner: string;
};

const EditProfile: React.FC = () => {
  const { addPopup, removePopup } = usePopups();
  const { address } = useParams();

  const {
    // control,
    // register,
    handleSubmit,
    // formState: { errors },
    watch,
    // reset,
  } = useForm<ProfileForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const values = watch();

  console.log(values);

  const onSubmit: SubmitHandler<ProfileForm> = async (values) => {
    console.log(values);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-[32px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 flex gap-3 flex-col">
            <div>
              <Banner height={150} />
            </div>
            <div>
              <ProfileAvatar address={address!} height={100} width={100} />
            </div>
          </div>
          <div className="flex gap-2 flex-col col-span-2">
            <div className="min-h-[200px]">
              <Button
                onClick={() => {
                  const key2 = addPopup({
                    Component: () => {
                      return (
                        <Popup className="main-bg-color">
                          <FilesHandle
                            chooseFile={(file) => {
                              console.log(file);

                              removePopup(key2);
                            }}
                          />
                        </Popup>
                      );
                    },
                  });
                }}
              >
                Choose Banner
              </Button>
            </div>
            <div className="min-h-[100px]">
              <Button>Choose Avatar</Button>
            </div>
            <div>
              <Input placeholder="Name" />
            </div>
            <div>
              <Input placeholder="Github URL" />
            </div>
            <div>
              <Input placeholder="Website URL" />
            </div>
            <div>
              <Button type="button" size="md" color="primary">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
