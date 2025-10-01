import { useFinishAccountSetup } from '@api/auth/hooks';
import { Button, StackLayout } from '@circle-vibe/components';
import { useCurrentUser } from '@core/hooks';

export const InitialSetup: React.FC = () => {
  const finishAccountSetup = useFinishAccountSetup();
  const { user } = useCurrentUser();

  const onFinishSetup = () => finishAccountSetup(user?.id);
  return (
    <StackLayout alignItems="start" space="0.25rem">
      <p className='text-secondary text-center text-md'>
        Before start use application, please finish setup
      </p>

      <Button onClick={onFinishSetup}>Finish Setup</Button>
    </StackLayout>
  );
};
