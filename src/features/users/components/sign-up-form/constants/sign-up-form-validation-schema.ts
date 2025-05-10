import {UserType} from '@circle-vibe/shared';

import { array, boolean, mixed, object, ref, string } from "yup";

const PHONE_NUMBER_REGEX = /^\+?[1-9]\d{1,14}$/;
const FILE_SIZE_LIMIT = 10 * 1024 * 1024; // 10 MB

const fileUploadingValidationSchma = mixed<File>()
.required('A file is required')
.test('fileSize', 'File too large', value => {
  return value && value.size <= FILE_SIZE_LIMIT;
})
.test('fileType', 'Unsupported File Format', value => {
  return value && ['image/jpeg', 'image/png'].includes(value.type);
})

export const SIGN_UP_FORM_VALIDATION_SCHEMA = object({
  username: string().required(),
  surname: string().required(),
  birthDate: string().required(),
  password: string().required(),
  passwordConfirmation: string().oneOf([ref('password')], 'Passwords must match').required(),
  avatar: fileUploadingValidationSchma,
  isHiddenContactInfo: boolean(),
  address: string(),
  city: string(),
  country: string(),
  zipCode: string(),
  phones: array().of(string().matches(PHONE_NUMBER_REGEX)),
  email: string().email().required(),
  primaryPhone: string().matches(PHONE_NUMBER_REGEX),
  type: mixed().oneOf(Object.values(UserType)),
  secret: boolean(),
})