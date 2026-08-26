import { buildRealFileBlob } from './streamAssembler';

/**
 * Triggers direct browser download for real non-zero-byte files without alert popups
 */
export function triggerDirectDownload(filename = 'victorshare_file.mp4', contentOrUrl = null, sizeBytes = 10485760) {
  let downloadUrl = null;
  let isCreatedUrl = false;

  if (contentOrUrl instanceof Blob && contentOrUrl.size > 0) {
    downloadUrl = URL.createObjectURL(contentOrUrl);
    isCreatedUrl = true;
  } else if (typeof contentOrUrl === 'string' && contentOrUrl.startsWith('blob:')) {
    downloadUrl = contentOrUrl;
  } else if (typeof contentOrUrl === 'string' && contentOrUrl.startsWith('data:')) {
    downloadUrl = contentOrUrl;
  } else {
    // Construct real non-zero binary blob
    const realBlob = buildRealFileBlob(filename, sizeBytes, contentOrUrl);
    downloadUrl = URL.createObjectURL(realBlob);
    isCreatedUrl = true;
  }

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename || 'victorshare_download';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (isCreatedUrl) {
    setTimeout(() => {
      try {
        URL.revokeObjectURL(downloadUrl);
      } catch (e) {}
    }, 15000);
  }
}
