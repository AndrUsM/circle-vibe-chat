import React, { ChangeEvent, useRef } from 'react';

import {
  CenteredVertialLayout,
  FormControl,
  FormControlError,
  Icon,
  Input,
  Label,
  Show,
  StackLayout,
  Tooltip,
  useIcons,
} from '@circle-vibe/components';

import classNames from 'classnames';

import { FileUploadImagePreview } from '@shared/components';
import { useAfterUploadingAction } from '@shared/components/file-upload-form/hooks/use-after-uploading-action';

import { composeFileUrl } from '@core/utils';

import { FileUploadFormFileType } from './enums';
import { ComposedFileUploadResponse } from './types';

interface FileUploadFormProps {
  label: string;
  url: string | null;
  type?: FileUploadFormFileType;
  bucket: string;
  disabled?: boolean;
  isRequired?: boolean;
  afterUpload: (fileUrls: ComposedFileUploadResponse) => void;
}

export const FileUploadForm: React.FC<FileUploadFormProps> = ({
  bucket,
  label,
  type = FileUploadFormFileType.FILE,
  url,
  disabled = false,
  isRequired = false,
  afterUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { cilCloudUpload } = useIcons();
  const afterUploadAction = useAfterUploadingAction(afterUpload, bucket);
  const openFileSelectionDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <StackLayout>
      <Label isRequired={isRequired}>{label}</Label>

      <FormControl
        className={classNames('w-full rounded-2 border-dark border-dashed border-1 py-5 ', {
          'element_state-disabled': disabled,
        })}
      >
        <Input
          ref={fileInputRef}
          type='file'
          hidden={true}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const file = event?.currentTarget?.files?.length
              ? event?.currentTarget?.files[0]
              : null;

            if (file) {
              afterUploadAction(file);
            }
          }}
        />

        <Show.When isTrue={!url}>
          <CenteredVertialLayout
            justifyContent='center'
            className='element_effect-hover cursor-pointer'
            onClick={openFileSelectionDialog}
          >
            <Tooltip title='Choose File'>
              <Icon name={cilCloudUpload} size={50} color='var(--cv-dark)' />
            </Tooltip>
          </CenteredVertialLayout>
        </Show.When>

        <Show.When isTrue={Boolean(url) && type === FileUploadFormFileType.IMAGE}>
          <Tooltip title='Change file' className='cursor-pointer mx-auto'>
            <FileUploadImagePreview
              onClick={openFileSelectionDialog}
              url={composeFileUrl(String(url), bucket)}
            />
          </Tooltip>
        </Show.When>

        <Show.When isTrue={Boolean(url) && type !== FileUploadFormFileType.IMAGE}>
          <a target='_blank' rel='noreferrer' href={composeFileUrl(String(url), bucket)}>
            <StackLayout>
              <span>Link to uploaded file</span>
              <span>{url}</span>
            </StackLayout>
          </a>
        </Show.When>

        <Show.When isTrue={isRequired}>
          <FormControlError />
        </Show.When>
      </FormControl>
    </StackLayout>
  );
};
