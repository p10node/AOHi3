// Copyright 2024 pierreneter. All rights reserved.

import { useContext } from "react";
import { PopupContext } from "./PopupProvider";

export const usePopups = () => {
  const { addPopup, removePopup, removeAll } = useContext(PopupContext);
  return { addPopup, removePopup, removeAll };
};
