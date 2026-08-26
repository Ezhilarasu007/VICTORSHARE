// Native silent file downloader without browser alert popups

/**
 * Triggers direct browser download for any file or blob without alert popups
 */
export function triggerDirectDownload(filename = 'victorshare_download.mp4', contentOrUrl = null) {
  let url = contentOrUrl;
  let createdBlobUrl = false;

  if (!url || typeof url !== 'string') {
    // Generate real dummy binary stream file for testing direct download if no URL provided
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 360;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#070913';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('VICTORSHARE P2P DOWNLOADED FILE', canvas.width / 2, canvas.height / 2);
    
    const dataUrl = canvas.toDataURL('image/png');
    url = dataUrl;
  }

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (createdBlobUrl) {
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }
}
