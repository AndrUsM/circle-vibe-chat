import { Link } from 'react-router-dom';

import { ExtendedReactFunctionalComponent } from '@circle-vibe/components';

import { useCurrentUser } from '@core/hooks';
import { GLOBAL_PAGES_ENUM, PrivatePagesEnum, PublicPagesEnum } from '@core/navigation';

import logoSrc from '../../../../public/logo.svg';

export const TopBarLogo: ExtendedReactFunctionalComponent = () => {
  const { user } = useCurrentUser();

  return (
    <Link
      to={
        user
          ? `/${GLOBAL_PAGES_ENUM.APP}/${PrivatePagesEnum.CONVERSATIONS}`
          : `/${GLOBAL_PAGES_ENUM.AUTH}/${PublicPagesEnum.SIGN_IN}`
      }
      className='cursor-pointer'
    >
      <img src={logoSrc} alt='Circle Vibe Chat logo' height='28px' />
    </Link>
  );
};
