export const composeKeyMaterial = async (password: string): Promise<CryptoKey> {
  const enc = new TextEncoder();

  return crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
}