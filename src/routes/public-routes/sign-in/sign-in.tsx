import React from 'react';

import { StackLayout } from '@circle-vibe/components';

import { AuthorizationForm } from '@features/users';

export const SignInForm: React.FC = () => {
  return (
    <div className='form-centered h-full bg-tertiary'>
      <div className='p-3 min-w-80'>
        <StackLayout space='0.5rem'>
          <p className='text-secondary text-center text-3xl font-semibold'>Sign-in</p>

          <AuthorizationForm />
        </StackLayout>
      </div>
    </div>
  );
};
