import { useCallback, useEffect, useState } from 'react';

import { Button, ExtendedReactFunctionalComponent, Icon, useIcons } from '@circle-vibe/components';

interface PaginationScrollButtonProps {
  messagesRef: React.RefObject<HTMLDivElement | null>;
}

export const PaginationScrollButton: ExtendedReactFunctionalComponent<
  PaginationScrollButtonProps
> = ({ messagesRef }) => {
  const icons = useIcons();
  const [dropdownPosition, setDropdownPosition] = useState<'top' | 'bottom' | null>(null);

  useEffect(() => {
    if (!messagesRef?.current) {
      return;
    }

    const onScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      const scrollLimit = target.scrollHeight - target.clientHeight;

      if (scrollLimit <= 200) {
        setDropdownPosition(null);
        return;
      }

      if (target.scrollTop < scrollLimit / 2) {
        setDropdownPosition('top');

        return;
      }

      setDropdownPosition('bottom');
    };

    messagesRef.current.addEventListener('scroll', onScroll);
  }, []);

  const onScroll = useCallback(() => {
    if (!messagesRef?.current || !dropdownPosition) {
      return;
    }

    if (dropdownPosition === 'bottom') {
      messagesRef.current.firstElementChild?.scrollIntoView({
        behavior: 'smooth',
      });

      return;
    }

    messagesRef.current.lastElementChild?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [dropdownPosition]);

  if (!dropdownPosition) {
    return null;
  }

  return (
    <Button size='small' color='secondary' className='pagination-scroll-button' onClick={onScroll}>
      <Icon
        name={dropdownPosition === 'bottom' ? icons.cilArrowTop : icons.cilArrowBottom}
        size={12}
        color='var(--fui-light)'
      />
    </Button>
  );
};
