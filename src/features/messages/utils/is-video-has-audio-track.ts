// @ts-nocheck
export const isVideoHasAudioTrack = (video: HTMLVideoElement) => {
  if (video?.audioTracks && video?.audioTracks.length > 0) {
    return true;
  }

  // Firefox specific
  if (typeof video?.mozHasAudio !== 'undefined') {
    return video?.mozHasAudio;
  }

  // WebKit fallback
  if (
    typeof video?.webkitAudioDecodedByteCount !== 'undefined' &&
    video?.webkitAudioDecodedByteCount > 0
  ) {
    return true;
  }
};
