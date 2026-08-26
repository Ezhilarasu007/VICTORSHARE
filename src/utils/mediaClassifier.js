// Smart Media Classifier Utility for VictorShare

/**
 * Accurately classifies file into: 'video', 'audio', 'image', 'app', 'document'
 */
export function classifyFile(filename = '', mimeType = '') {
  const ext = filename.split('.').pop().toLowerCase();
  const mime = mimeType.toLowerCase();

  // Video
  if (
    mime.startsWith('video/') ||
    ['mp4', 'mkv', 'avi', 'mov', 'webm', 'flv', 'wmv', 'm4v', 'ts', '3gp', 'ogv'].includes(ext)
  ) {
    return {
      category: 'video',
      label: 'VIDEO FILE',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-500/50',
      iconName: 'Film'
    };
  }

  // Audio
  if (
    mime.startsWith('audio/') ||
    ['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a', 'wma', 'opus'].includes(ext)
  ) {
    return {
      category: 'audio',
      label: 'AUDIO FILE',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-500/50',
      iconName: 'Music'
    };
  }

  // Image
  if (
    mime.startsWith('image/') ||
    ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'heic', 'bmp', 'ico'].includes(ext)
  ) {
    return {
      category: 'image',
      label: 'IMAGE PHOTO',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-500/50',
      iconName: 'Image'
    };
  }

  // App
  if (
    ['apk', 'ipa', 'exe', 'dmg', 'msi', 'deb', 'rpm'].includes(ext)
  ) {
    return {
      category: 'app',
      label: 'APP PACKAGE',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-500/50',
      iconName: 'Package'
    };
  }

  // Document / Zip
  return {
    category: 'document',
    label: 'DOCUMENT / ZIP',
    badgeColor: 'bg-pink-950 text-pink-300 border-pink-500/50',
    iconName: 'FileText'
  };
}
