// Copyright 2024 pierreneter. All rights reserved.

import { funEmoji } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export const genAvatar = (address: string) => {
  const avatar = createAvatar(funEmoji, {
    seed: address,
  });

  const dataUri = avatar.toDataUriSync();

  return dataUri;
};
