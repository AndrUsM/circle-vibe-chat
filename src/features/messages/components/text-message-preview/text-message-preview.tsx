import { HTMLAttributes } from 'react';

import { ExtendedReactFunctionalComponent } from '@circle-vibe/components';

import Markdown from 'react-markdown';

import { MARKDOWN_TAGS_CUSTOMIZATION } from './constants';

export const TextMessagePreview: ExtendedReactFunctionalComponent<
  HTMLAttributes<HTMLDivElement>
> = ({ children, ...rest }) => {
  return (
    <section {...rest}>
      <Markdown components={MARKDOWN_TAGS_CUSTOMIZATION}>{children as string}</Markdown>
    </section>
  );
};
