import {
  DIGEST,
  PBKDF2_ITERATIONS,
  KEY_LENGTH
} from '@circle-vibe/shared';

export const deriveKey = async (keyMaterial: CryptoKey, salt: Uint8Array):Promise<CryptoKey> =>  {
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: DIGEST,
    },
    keyMaterial,
    { name: 'AES-GCM', length: KEY_LENGTH },
    false,
    ['decrypt']
  );
}
