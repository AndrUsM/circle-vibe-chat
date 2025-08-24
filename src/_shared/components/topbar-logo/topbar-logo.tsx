import { ExtendedReactFunctionalComponent } from '@circle-vibe/components';

import { Link } from 'react-router-dom';

import { useCurrentUser } from '@core/hooks';
import { PrivatePagesEnum, PublicPagesEnum } from '@core/navigation';

import logoSrc from '../../../../public/logo.svg';

export const TopBarLogo: ExtendedReactFunctionalComponent = () => {
  const { user } = useCurrentUser();

  return (
    <Link
      to={user ? `/app/${PrivatePagesEnum.CONVERSATIONS}` : `/auth/${PublicPagesEnum.SIGN_IN}`}
      className='cursor-pointer'
    >
      <img src={logoSrc} alt='Circle Vibe Chat logo' height='28px' />
    </Link>
  );
};
