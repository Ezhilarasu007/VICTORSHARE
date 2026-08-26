import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, AlertTriangle, Settings, Film, Music } from 'lucide-react';
import { formatBytes } from '../utils/videoEngine';

export function MediaPlayer({ streamUrl, filename = 'Media_File.mp4', mediaType = 'video', sizeBytes = 0 }) {
  const mediaRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isAudio = mediaType === 'audio' || filename.endsWith('.mp3') || filename.endsWith('.wav');

  useEffect(() => {
    setHasError(false);
    setErrorMessage('');
  }, [streamUrl]);

  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play().catch((err) => {
          setHasError(true);
          setErrorMessage('Playback Error: Unsupported codec or corrupt media file.');
        });
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

  const handleVolumeChange = (e) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
    if (mediaRef.current) {
      mediaRef.current.volume = vol;
    }
  };

  const toggleMute = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleRateChange = (rate) => {
    setPlaybackRate(rate);
    if (mediaRef.current) {
      mediaRef.current.playbackRate = rate;
    }
  };

  const toggleFullscreen = () => {
    if (mediaRef.current) {
      if (mediaRef.current.requestFullscreen) {
        mediaRef.current.requestFullscreen();
      }
    }
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full glass-panel rounded-3xl p-6 border border-cyan-500/40 space-y-4 shadow-2xl text-left relative overflow-hidden">
      
      {/* Player Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2 text-cyan-300 font-bold text-sm">
          {isAudio ? <Music className="w-5 h-5 text-purple-400" /> : <Film className="w-5 h-5 text-cyan-400" />}
          <span className="truncate max-w-md">{filename}</span>
        </div>
        {sizeBytes > 0 && (
          <span className="text-xs font-mono text-emerald-400 font-bold">
            {formatBytes(sizeBytes)}
          </span>
        )}
      </div>

      {/* Media Element / Error Display */}
      {hasError ? (
        <div className="p-8 rounded-2xl bg-rose-950/80 border border-rose-500/60 text-rose-300 text-center space-y-3 shadow-2xl">
          <AlertTriangle className="w-10 h-10 text-rose-400 mx-auto" />
          <h4 className="font-black text-base">Can't Play Media Stream</h4>
          <p className="text-xs text-slate-300">{errorMessage}</p>
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[240px]">
          {isAudio ? (
            <audio
              ref={mediaRef}
              src={streamUrl}
              onTimeUpdate={handleTimeUpdate}
              onError={() => {
                setHasError(true);
                setErrorMessage('Audio codec error: Failed to decode stream.');
              }}
              className="w-full p-4"
            />
          ) : (
            <video
              ref={mediaRef}
              src={streamUrl}
              onTimeUpdate={handleTimeUpdate}
              onError={() => {
                setHasError(true);
                setErrorMessage('Video codec error 0xc00d36c4: Browser video decoder failed.');
              }}
              className="w-full max-h-[50vh] object-contain"
            />
          )}

          {!isPlaying && !isAudio && (
            <button
              onClick={togglePlay}
              className="absolute p-5 rounded-full bg-cyan-500/90 text-slate-950 hover:scale-110 transition-transform shadow-2xl"
            >
              <Play className="w-8 h-8 fill-current ml-1" />
            </button>
          )}
        </div>
      )}

      {/* Custom Media Controls Bar */}
      {!hasError && (
        <div className="space-y-3 pt-1">
          {/* Progress Seek Bar */}
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

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-slate-300 text-xs font-bold">
            
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-md"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <div className="flex items-center space-x-2">
                <button onClick={toggleMute} className="text-slate-400 hover:text-white">
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.1}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 accent-cyan-400 h-1.5 bg-slate-900 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Playback Speed & Fullscreen */}
            <div className="flex items-center space-x-3">
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

              {!isAudio && (
                <button onClick={toggleFullscreen} className="text-slate-400 hover:text-white p-1">
                  <Maximize className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
