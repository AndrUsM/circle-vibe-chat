import React from 'react';

import { getUserFullName, User } from '@circle-vibe/shared';

import { CenteredVertialLayout, Show, StackLayout } from '@circle-vibe/components';

export interface UserInfoPopoverProps {
  user: User;
}

export const UserInfoPopover: React.FC<UserInfoPopoverProps> = ({ user }) => {
  return (
    <StackLayout className='min-w-full'>
      <StackLayout space='0.5rem'>
        <CenteredVertialLayout space='0.15rem'>
          <span>{getUserFullName(user)}</span>
          <span className='text-xs text-secondary text-lowercase text-bracket'>
            {user.chatStatus}
          </span>
        </CenteredVertialLayout>

        <Show.When isTrue={user.isHiddenContactInfo}>
          <span>Contact information is hidden.</span>
        </Show.When>

        <Show.When isTrue={!user.isHiddenContactInfo}>
          <span>{user.email}</span>

          <Show.When isTrue={Boolean(user.primaryPhone)}>
            <span>{user.primaryPhone}</span>
          </Show.When>

          <Show.When isTrue={Boolean(user.country && user.city)}>
            <span>
              {user.country}, {user.city}
            </span>
          </Show.When>
        </Show.When>
      </StackLayout>
    </StackLayout>
  );
};
