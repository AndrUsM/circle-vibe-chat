import { IV_LENGTH, SALT_LENGTH } from "@circle-vibe/shared";

import { deriveKey, composeKeyMaterial } from "./_helpers";

export const decrypt = async (
  encryptedBase64: string,
  password: string
): Promise<string> => {
  const data = Uint8Array.from(atob(encryptedBase64), (c) => c.charCodeAt(0));

  const salt = data.slice(0, SALT_LENGTH);
  const iv = data.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const cipherText = data.slice(SALT_LENGTH + IV_LENGTH);

  const keyMaterial = await composeKeyMaterial(password);
  const key = await deriveKey(keyMaterial, salt);

  const decryptedBuffer = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    cipherText
  );

  const decoder = new TextDecoder();
  return decoder.decode(decryptedBuffer);
};
