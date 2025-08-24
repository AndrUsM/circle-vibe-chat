import React, { useState } from 'react';

import { ExtendedReactFunctionalComponent, Show } from '@circle-vibe/components';

import classNames from 'classnames';

import './user-avatar.scss';

interface UserAvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  url?: string;
  fallback: string;
}

export const UserAvatar: ExtendedReactFunctionalComponent<UserAvatarProps> = ({
  url,
  fallback,
  className,
  ...rest
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  return (
    <Show>
      <Show.When isTrue={Boolean(url) && isImageLoaded}>
        <img
          className={classNames('user-avatar', className)}
          src={url}
          onError={() => setIsImageLoaded(false)}
          {...rest}
        />
      </Show.When>

      <Show.Else>
        <div className={classNames('user-avatar text-xs', className)} {...rest}>
          {fallback}
        </div>
      </Show.Else>
    </Show>
  );
};
