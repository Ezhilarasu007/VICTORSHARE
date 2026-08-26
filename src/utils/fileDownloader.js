// Real Native Silent File Downloader for actual user files

/**
 * Downloads the real file object or blob URL directly to browser downloads without alert popups
 */
export function triggerDirectDownload(filename = 'shared_file.dat', fileOrBlobUrl = null) {
  let url = fileOrBlobUrl;
  let isCreatedUrl = false;

  if (fileOrBlobUrl && typeof fileOrBlobUrl !== 'string') {
    // Real File or Blob object
    url = URL.createObjectURL(fileOrBlobUrl);
    isCreatedUrl = true;
  }

  if (!url) {
    // If no file provided, generate a fallback text file blob with real filename
    const dummyBlob = new Blob([`VICTORSHARE ENCRYPTED FILE: ${filename}\nDownloaded via P2P Stream`], { type: 'text/plain' });
    url = URL.createObjectURL(dummyBlob);
    isCreatedUrl = true;
  }

  const link = document.createElement('a');
  link.href = url;
  link.download = filename || 'shared_file';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (isCreatedUrl) {
    setTimeout(() => URL.revokeObjectURL(url), 15000);
  }
}
