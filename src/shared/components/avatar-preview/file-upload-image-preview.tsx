import React from 'react';

import { ExtendedReactFunctionalComponent } from '@circle-vibe/components';

import classNames from 'classnames';

import './file-upload-image-preview.scss';

interface AvatarPreviewProps extends React.HTMLAttributes<HTMLImageElement> {
  url?: string;
}

export const FileUploadImagePreview: ExtendedReactFunctionalComponent<AvatarPreviewProps> = ({
  url,
  className,
  ...rest
}) => {
  return (
    <img
      src={url}
      alt='file-upload-image-preview'
      className={classNames(
        'file-upload-image-preview border-1 border-solid border-dark shadow-md',
        className,
      )}
      {...rest}
    />
  );
};
