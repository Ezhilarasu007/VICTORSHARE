// Video compression math, formatting & mock canvas video processing utilities

/**
 * Format bytes to human readable string (GB, MB, KB, Bytes)
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Convert GB to Bytes
 */
export function gbToBytes(gb) {
  return gb * 1024 * 1024 * 1024;
}

/**
 * Convert MB to Bytes
 */
export function mbToBytes(mb) {
  return mb * 1024 * 1024;
}

/**
 * Calculate required video bitrate in kbps based on target file size in MB and video duration in seconds.
 * Target Size (bits) = Size(MB) * 8 * 1024 * 1024
 * Total Bitrate (bps) = Target Size (bits) / Duration (s)
 * Video Bitrate (kbps) = (Total Bitrate - Audio Bitrate) / 1000
 */
export function calculateBitrate(targetSizeMB, durationSeconds = 120, audioBitrateKbps = 96) {
  if (!durationSeconds || durationSeconds <= 0) durationSeconds = 120;
  const targetBits = targetSizeMB * 8 * 1024 * 1024;
  const totalBitrateBps = targetBits / durationSeconds;
  const totalBitrateKbps = Math.max(10, totalBitrateBps / 1000);
  const videoBitrateKbps = Math.max(10, totalBitrateKbps - audioBitrateKbps);
  return {
    videoBitrateKbps: Math.round(videoBitrateKbps),
    totalBitrateKbps: Math.round(totalBitrateKbps),
    audioBitrateKbps
  };
}

/**
 * Recommend optimal resolution based on target video bitrate (kbps)
 */
export function recommendResolution(videoBitrateKbps) {
  if (videoBitrateKbps >= 8000) return { label: '4K Ultra HD (2160p)', width: 3840, height: 2160, scaleFactor: 1.0 };
  if (videoBitrateKbps >= 3500) return { label: '1080p Full HD', width: 1920, height: 1080, scaleFactor: 0.75 };
  if (videoBitrateKbps >= 1200) return { label: '720p HD', width: 1280, height: 720, scaleFactor: 0.5 };
  if (videoBitrateKbps >= 400)  return { label: '480p SD (Recommended for 10MB)', width: 854, height: 480, scaleFactor: 0.35 };
  return { label: '360p Low (Maximum Compression)', width: 640, height: 360, scaleFactor: 0.25 };
}

/**
 * Format seconds to mm:ss or hh:mm:ss
 */
export function formatTime(seconds) {
  if (!seconds || isNaN(seconds)) return '00:00';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hrs > 0) {
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Generate synthetic canvas video blob for testing/demonstration when user doesn't have a real 100GB video
 */
export function createDemoVideoBlob(filename = 'compressed_10mb_video.mp4', targetMB = 10) {
  const canvas = document.createElement('canvas');
  canvas.width = 640;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');
  
  // Draw glowing test animation pattern
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#00f2fe';
  ctx.font = 'bold 24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VICTORSHARE COMPRESSED VIDEO', canvas.width / 2, canvas.height / 2 - 20);
  
  ctx.fillStyle = '#94a3b8';
  ctx.font = '16px sans-serif';
  ctx.fillText(`Target Size: ${targetMB} MB | Optimized for iOS & Android`, canvas.width / 2, canvas.height / 2 + 20);
  
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(new File([blob], filename, { type: 'video/mp4' }));
    }, 'image/jpeg', 0.8);
  });
}
