export const useScrollToBlockPosition = () => {
  return (
    ref: React.RefObject<HTMLDivElement | null>,
    position: 'start' | 'end',
    block: 'start' | 'end',
  ): void => {
    if (!ref.current || !ref?.current?.scrollHeight) {
      return;
    }

    const container = ref.current;

    const targetDomElement =
      position === 'end' ? container?.lastElementChild : container.firstElementChild;

    if (!targetDomElement) {
      return;
    }

    targetDomElement.scrollIntoView({ behavior: 'smooth', block });
  };
};
