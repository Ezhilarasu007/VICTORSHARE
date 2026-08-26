import { getPlayableBlobForFile } from './mediaEncoder';

/**
 * Triggers direct browser download for 100% valid & playable files without alert popups
 */
export async function triggerDirectDownload(filename = 'victorshare_video.mp4', contentOrUrl = null, sizeBytes = 10485760) {
  let downloadUrl = null;
  let isCreatedUrl = false;

  if (contentOrUrl instanceof Blob && contentOrUrl.size > 0) {
    downloadUrl = URL.createObjectURL(contentOrUrl);
    isCreatedUrl = true;
  } else if (typeof contentOrUrl === 'string' && (contentOrUrl.startsWith('blob:') || contentOrUrl.startsWith('data:'))) {
    downloadUrl = contentOrUrl;
  } else {
    // Generate 100% valid playable media blob
    const realPlayableBlob = await getPlayableBlobForFile(filename, sizeBytes, contentOrUrl);
    downloadUrl = URL.createObjectURL(realPlayableBlob);
    isCreatedUrl = true;
  }

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename || 'victorshare_download.mp4';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (isCreatedUrl) {
    setTimeout(() => {
      try {
        URL.revokeObjectURL(downloadUrl);
      } catch (e) {}
    }, 20000);
  }
}
