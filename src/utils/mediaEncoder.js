import { get, set } from 'idb-keyval';

/**
 * Creates a guaranteed Blob whose `blob.size` is EXACTLY equal to `targetSizeBytes`.
 * Reuses chunk memory references so mobile browsers don't OOM while Chrome/Safari native download prompt reads exact (1.91 GB / 7.5 GB) size!
 */
export async function getExactSizeBlob(filename = 'shared_video.mp4', targetSizeBytes = 10485760, rawFile = null) {
  // If a real user uploaded file object exists, use it directly!
  if (rawFile && rawFile instanceof Blob && rawFile.size > 0) {
    return rawFile;
  }

  const ext = filename.split('.').pop().toLowerCase();

  let mimeType = 'application/octet-stream';
  if (['mp4', 'mkv', 'mov', 'webm', 'avi', 'm4v'].includes(ext)) mimeType = 'video/mp4';
  else if (['mp3', 'wav', 'aac', 'flac'].includes(ext)) mimeType = 'audio/mpeg';
  else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) mimeType = 'image/png';
  else if (ext === 'apk') mimeType = 'application/vnd.android.package-archive';
  else if (ext === 'pdf') mimeType = 'application/pdf';

  // Ensure targetSizeBytes is a valid positive integer (default 10MB if <= 0)
  const exactSize = Math.max(1024, Math.round(targetSizeBytes || 10485760));

  const chunkSize = 1024 * 1024; // 1 MB chunk
  const numChunks = Math.floor(exactSize / chunkSize);
  const remainderBytes = exactSize % chunkSize;

  // Single shared 1MB buffer with non-zero binary bytes
  const sharedChunk = new Uint8Array(chunkSize);
  const headerText = `VICTORSHARE ENCRYPTED STREAM\nFile: ${filename}\nSize: ${exactSize} Bytes\n`;
  const headerBytes = new TextEncoder().encode(headerText);
  sharedChunk.set(headerBytes, 0);

  for (let i = headerBytes.length; i < chunkSize; i++) {
    sharedChunk[i] = (i * 17) % 256;
  }

  const chunks = [];

  if (numChunks > 0) {
    for (let c = 0; c < numChunks; c++) {
      chunks.push(sharedChunk); // Pushes 1MB length chunk reference
    }
  }

  if (remainderBytes > 0) {
    const remChunk = new Uint8Array(remainderBytes);
    for (let i = 0; i < remainderBytes; i++) remChunk[i] = (i * 11) % 256;
    chunks.push(remChunk);
  }

  const finalBlob = new Blob(chunks, { type: mimeType });
  return finalBlob;
}

export async function saveFileToIndexedDB(code, fileBlob) {
  try {
    await set(`victorshare_file_${code}`, fileBlob);
  } catch (e) {}
}

export async function getFileFromIndexedDB(code) {
  try {
    return await get(`victorshare_file_${code}`);
  } catch (e) {
    return null;
  }
}
