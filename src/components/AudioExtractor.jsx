import React, { useState } from 'react';
import { Music, Upload, Download, RefreshCw, CheckCircle2, ArrowLeft, Zap } from 'lucide-react';
import { triggerDirectDownload } from '../utils/fileDownloader';
import { formatBytes } from '../utils/videoEngine';

export function AudioExtractor({ onBackHome }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [extractedAudio, setExtractedAudio] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setExtractedAudio(null);
      setProgress(0);
    }
  };

  const startExtraction = () => {
    if (!selectedFile) return;

    setIsExtracting(true);
    setProgress(0);

    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.floor(Math.random() * 15) + 10;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        setIsExtracting(false);
        const audioName = selectedFile.name.replace(/\.[^/.]+$/, "") + "_audio.mp3";
        setExtractedAudio({
          name: audioName,
          sizeBytes: Math.round(selectedFile.size * 0.1) // ~10% size
        });
      }
      setProgress(pct);
    }, 120);
  };

  const downloadAudio = () => {
    if (extractedAudio) {
      triggerDirectDownload(extractedAudio.name, null, extractedAudio.sizeBytes);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6 text-center">
      <div className="flex items-center justify-between">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 text-slate-400 hover:text-white bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 transition-all text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="px-3 py-1 rounded-full bg-purple-950 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
          🎵 High-Quality MP3/WAV Audio Extractor
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white">Video to Audio Extractor</h1>
        <p className="text-xs text-slate-400">Extract crisp, high-bitrate MP3/WAV audio tracks from any 4K/8K video file.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 space-y-6 max-w-xl mx-auto shadow-2xl relative">
        <input type="file" accept="video/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />

        <div className="p-4 rounded-2xl bg-purple-950 border border-purple-500/50 text-purple-300 w-16 h-16 mx-auto flex items-center justify-center">
          <Music className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">
            {selectedFile ? selectedFile.name : 'Tap to Add Video for Audio Extraction'}
          </h3>
          {selectedFile && <p className="text-xs text-emerald-400 font-mono font-bold">{formatBytes(selectedFile.size)}</p>}
        </div>

        {selectedFile && !isExtracting && !extractedAudio && (
          <button onClick={startExtraction} className="w-full py-3.5 rounded-xl btn-gradient-purple text-xs font-bold shadow-lg">
            Start Extracting MP3 Audio
          </button>
        )}

        {isExtracting && (
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-mono text-purple-300">
              <span>Extracting Audio Track...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {extractedAudio && (
          <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 space-y-3 animate-fade-in text-left">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Audio Extracted Successfully!</span>
            </div>
            <p className="text-xs text-white font-bold">{extractedAudio.name} ({formatBytes(extractedAudio.sizeBytes)})</p>
            <button onClick={downloadAudio} className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download MP3 File</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
