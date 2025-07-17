export const concatBuffers = (buffers: Uint8Array[]): Uint8Array => {
  const totalLength = buffers.reduce((sum, b) => sum + b.length, 0);
  const result = new Uint8Array(totalLength);

  buffers.reduce((offset, b) => {
    result.set(b, offset);
    return offset + b.length;
  }, 0);
  return result;
};
