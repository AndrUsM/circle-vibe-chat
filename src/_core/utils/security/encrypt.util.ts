import {
  IV_LENGTH,
  SALT_LENGTH,
} from '@circle-vibe/shared';

import { composeKeyMaterial, concatBuffers, deriveKey } from "./_helpers";

export const encrypt = async (content: string, password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));

  const keyMaterial = await composeKeyMaterial(password);
  const key = await deriveKey(keyMaterial, salt);

  const encoder = new TextEncoder();
  const encoded = encoder.encode(content);

  const cipherBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encoded
  );

  const combined = concatBuffers([salt, iv, new Uint8Array(cipherBuffer)]);

  return btoa(String.fromCharCode(...combined));
}