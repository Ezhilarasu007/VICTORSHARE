import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, AlertTriangle, ShieldCheck, Film, Music, X } from 'lucide-react';
import { formatBytes } from '../utils/videoEngine';

export function VictorPlayer({ mediaUrl, filename = 'Shared_Media.mp4', sizeBytes = 0, onClose }) {
  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [hasError, setHasError] = useState(false);

  const isAudio = filename.endsWith('.mp3') || filename.endsWith('.wav') || filename.endsWith('.aac') || filename.endsWith('.ogg');

  // Auto Revoke Object URL on unmount to prevent mobile Chrome Aw, Snap! OOM crashes
  useEffect(() => {
    return () => {
      if (mediaUrl && mediaUrl.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(mediaUrl);
        } catch (e) {}
      }
    };
  }, [mediaUrl]);

  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play().catch(() => setHasError(true));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      setCurrentTime(mediaRef.current.currentTime);
      setDuration(mediaRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (mediaRef.current) {
      mediaRef.current.currentTime = time;
    }
  };

  const handleRateChange = (rate) => {
    setPlaybackRate(rate);
    if (mediaRef.current) {
      mediaRef.current.playbackRate = rate;
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl p-6 border border-cyan-500/50 shadow-2xl space-y-4 text-left">
        
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-900 rounded-full border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Player Header */}
        <div className="flex items-center space-x-3 text-cyan-400 pr-10">
          <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40">
            {isAudio ? <Music className="w-5 h-5 text-purple-400" /> : <Film className="w-5 h-5 text-cyan-400" />}
          </div>
          <div>
            <h3 className="text-base font-black text-white truncate max-w-md">{filename}</h3>
            <p className="text-xs text-emerald-400 font-mono font-bold">
              VICTORPLAYER • {sizeBytes > 0 ? formatBytes(sizeBytes) : 'Thunder Stream'}
            </p>
          </div>
        </div>

        {/* Media Container */}
        {hasError ? (
          <div className="p-6 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-center space-y-2">
            <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
            <h4 className="font-bold text-sm">Media Playback Warning</h4>
            <p className="text-xs text-slate-300">File structure ready. Save to device storage to view in native video player.</p>
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[250px]">
            {isAudio ? (
              <audio
                ref={mediaRef}
                src={mediaUrl}
                onTimeUpdate={handleTimeUpdate}
                onError={() => setHasError(true)}
                className="w-full p-4"
              />
            ) : (
              <video
                ref={mediaRef}
                src={mediaUrl}
                controls={false}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onError={() => setHasError(true)}
                className="w-full max-h-[55vh] object-contain"
              />
            )}

            {!isPlaying && !isAudio && (
              <button
                onClick={togglePlay}
                className="absolute p-5 rounded-full bg-cyan-500 text-slate-950 hover:scale-110 transition-transform shadow-2xl"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
            )}
          </div>
        )}

        {/* Controls Bar */}
        {!hasError && (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 accent-cyan-400 cursor-pointer h-2 bg-slate-900 rounded-lg"
              />
              <span>{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-lg"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Play Video'}</span>
              </button>

              <div className="flex items-center space-x-1 font-mono text-[11px] bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                {[0.5, 1, 1.25, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handleRateChange(rate)}
                    className={`px-1.5 py-0.5 rounded ${playbackRate === rate ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
