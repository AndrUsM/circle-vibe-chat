import { useState } from "react";

import { ExtendedReactFunctionalComponent, Show } from "@circle-vibe/shared";

import "./user-avatar.scss";

interface UserAvatarProps {
  url?: string;
  fallback: string;
}

export const UserAvatar: ExtendedReactFunctionalComponent<UserAvatarProps> = ({
  url,
  fallback,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  return (
    <Show>
      <Show.When isTrue={Boolean(url) && isImageLoaded}>
        <img
          className="user-avatar"
          src={url}
          onError={() => setIsImageLoaded(false)}
        />
      </Show.When>

      <Show.Else>
        <div className="user-avatar text-xs">{fallback}</div>
      </Show.Else>
    </Show>
  );
};
