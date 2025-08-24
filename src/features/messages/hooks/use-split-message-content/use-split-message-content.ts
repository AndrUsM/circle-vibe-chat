import React, { useCallback, useMemo } from 'react';

import { useIcons } from '@circle-vibe/components';

import { MESSAGE_CONTENT_LIMIT } from '@features/messages/constants';

export const useSplitMessageContent = (content: string) => {
  const icons = useIcons();
  const [contentSplitNumber, setContentSplitNumber] = React.useState(MESSAGE_CONTENT_LIMIT);

  const isContentTooLong = useMemo(
    () => content.length > MESSAGE_CONTENT_LIMIT,
    [content, contentSplitNumber],
  );

  const messageContent = useMemo(() => {
    return content.length < contentSplitNumber
      ? content
      : `${content.slice(0, contentSplitNumber)}...`;
  }, [content, contentSplitNumber]);

  const toggleIconIcon = useMemo(
    () => (contentSplitNumber === MESSAGE_CONTENT_LIMIT ? icons.cilExpandDown : icons.cilExpandUp),
    [contentSplitNumber, icons.cilExpandDown, icons.cilExpandUp],
  );

  const toggleOfTooLongMessage = useCallback(() => {
    const updatedLimit =
      contentSplitNumber === MESSAGE_CONTENT_LIMIT ? content.length : MESSAGE_CONTENT_LIMIT;
    setContentSplitNumber(updatedLimit);
  }, [contentSplitNumber, MESSAGE_CONTENT_LIMIT, content.length]);

  return {
    isContentTooLong,
    messageContent,
    toggleIconIcon,
    toggleOfTooLongMessage,
  };
};
