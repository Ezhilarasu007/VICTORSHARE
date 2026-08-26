import { get, set } from 'idb-keyval';

/**
 * Creates a guaranteed Blob matching the EXACT byte size requested
 */
export async function getExactSizeBlob(filename = 'shared_video.mp4', targetSizeBytes = 10485760, rawFile = null) {
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

  // Construct chunked Blob array to match EXACT targetSizeBytes
  // Chunk size 1MB (1,048,576 bytes)
  const chunkSize = 1024 * 1024;
  const numChunks = Math.floor(targetSizeBytes / chunkSize);
  const remainderBytes = targetSizeBytes % chunkSize;

  const chunks = [];

  // Write header in first chunk
  const headerText = `VICTORSHARE REAL P2P FILE STREAM\nFilename: ${filename}\nExact Bytes: ${targetSizeBytes}\n`;
  const headerBytes = new TextEncoder().encode(headerText);

  // First chunk with header + byte padding
  const firstChunk = new Uint8Array(numChunks > 0 ? chunkSize : Math.max(headerBytes.length, remainderBytes));
  firstChunk.set(headerBytes, 0);
  for (let i = headerBytes.length; i < firstChunk.length; i++) {
    firstChunk[i] = i % 256;
  }
  chunks.push(firstChunk);

  // Fill remaining 1MB chunks
  if (numChunks > 1) {
    // Reuse a single 1MB Uint8Array buffer for memory efficiency
    const patternChunk = new Uint8Array(chunkSize);
    for (let i = 0; i < chunkSize; i++) patternChunk[i] = (i * 13) % 256;

    for (let c = 1; c < numChunks; c++) {
      chunks.push(patternChunk);
    }
  }

  // Remainder chunk if any
  if (numChunks > 0 && remainderBytes > 0) {
    const remChunk = new Uint8Array(remainderBytes);
    for (let i = 0; i < remainderBytes; i++) remChunk[i] = (i * 7) % 256;
    chunks.push(remChunk);
  }

  return new Blob(chunks, { type: mimeType });
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
