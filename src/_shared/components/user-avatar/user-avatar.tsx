import React, { useState } from 'react';

import { User } from '@circle-vibe/shared';

import {
  ExtendedReactFunctionalComponent,
  Popover,
  Show,
  usePopover,
} from '@circle-vibe/components';

import classNames from 'classnames';

import './user-avatar.scss';
import { UserInfoPopover } from '@shared/components';

interface UserAvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  url?: string;
  user?: User;
  fallback: string;
}

export const UserAvatar: ExtendedReactFunctionalComponent<UserAvatarProps> = ({
  url,
  fallback,
  className,
  user,
  ...rest
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const { open, referenceProps, contentProps, transitionStyles } = usePopover();

  const isPopoverAvailable = Boolean(user?.id);
  const popoverReferenceProps = isPopoverAvailable ? referenceProps : {};

  return (
    <>
      <Show>
        <Show.When isTrue={Boolean(url) && isImageLoaded}>
          <img
            className={classNames('user-avatar', className)}
            src={url}
            onError={() => setIsImageLoaded(false)}
            {...rest}
            {...popoverReferenceProps}
          />
        </Show.When>

        <Show.Else>
          <div
            className={classNames('user-avatar text-xs', className)}
            {...rest}
            {...popoverReferenceProps}
          >
            {fallback}
          </div>
        </Show.Else>
      </Show>

      <Show.When isTrue={isPopoverAvailable}>
        <Popover open={open} transitionStyles={transitionStyles} tooltipProps={contentProps}>
          <UserInfoPopover user={user as User} />
        </Popover>
      </Show.When>
    </>
  );
};
