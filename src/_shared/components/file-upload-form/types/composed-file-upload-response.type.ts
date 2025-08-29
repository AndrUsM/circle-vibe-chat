import {
  UploadFileOutputDto,
  UploadImageOutputDto,
  UploadVideoOutputDto,
} from '@circle-vibe/shared';

export type ComposedFileUploadResponse =
  | UploadFileOutputDto
  | UploadImageOutputDto
  | UploadVideoOutputDto;
