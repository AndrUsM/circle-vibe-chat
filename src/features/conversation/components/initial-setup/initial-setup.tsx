import { useTranslation } from 'react-i18next';

import { Button, StackLayout } from '@circle-vibe/components';

import { useCurrentUser } from '@core/hooks';
import { useFinishAccountSetup } from '@api/auth/hooks';

interface InitialSetupProps {
  onResetChats: VoidFunction;
}

export const InitialSetup: React.FC<InitialSetupProps> = ({ onResetChats }) => {
  const { t } = useTranslation();
  const finishAccountSetup = useFinishAccountSetup();
  const { user } = useCurrentUser();

  const onFinishSetup = () => {
    return finishAccountSetup(user?.id).then((successResponse) => {
      if (successResponse) {
        onResetChats();
      }
    });
  };

  return (
    <StackLayout alignItems='start' space='0.25rem'>
      <p className='text-secondary text-center text-md'>
        {t('conversations.initial-setup.description')}
      </p>

      <Button onClick={onFinishSetup}>{t('conversations.initial-setup.button.label')}</Button>
    </StackLayout>
  );
};
