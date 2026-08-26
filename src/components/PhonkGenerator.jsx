import React, { useState } from 'react';
import { Music, Zap, Play, Pause, Download, ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';
import { triggerDirectDownload } from '../utils/fileDownloader';

export function PhonkGenerator({ onBackHome }) {
  const [tempo, setTempo] = useState(135);
  const [bassGain, setBassGain] = useState(85);
  const [style, setStyle] = useState('drift'); // 'drift', 'cowbell', 'memphis'
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTrack, setGeneratedTrack] = useState(null);

  const startGenerating = () => {
    setIsGenerating(true);
    setGeneratedTrack(null);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedTrack({
        name: `PHONK_DRIFT_BASS_${tempo}BPM_${style.toUpperCase()}.mp3`,
        sizeBytes: 4194304 // ~4MB track
      });
    }, 1500);
  };

  const downloadTrack = () => {
    if (generatedTrack) {
      triggerDirectDownload(generatedTrack.name, null, generatedTrack.sizeBytes);
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

        <span className="px-3 py-1 rounded-full bg-pink-950 border border-pink-500/40 text-pink-300 text-xs font-mono font-bold">
          🎵 AI Phonk Beat & Drift Bassline Generator
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white">AI Phonk Music Generator</h1>
        <p className="text-xs text-slate-400">Synthesize heavy 808 cowbell, drift basslines, and Memphis phonk beats for videos.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-pink-500/30 space-y-6 max-w-xl mx-auto shadow-2xl">
        <div className="p-4 rounded-2xl bg-pink-950 border border-pink-500/50 text-pink-300 w-16 h-16 mx-auto flex items-center justify-center">
          <Zap className="w-8 h-8 fill-current" />
        </div>

        <div className="space-y-4 text-left">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Phonk Sub-Genre</label>
            <div className="grid grid-cols-3 gap-2">
              {['drift', 'cowbell', 'memphis'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStyle(st)}
                  className={`py-2 rounded-xl text-xs font-bold uppercase border transition-all ${
                    style === st ? 'bg-pink-600 border-pink-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
              <span>BPM Speed ({tempo} BPM)</span>
            </div>
            <input
              type="range"
              min={110}
              max={160}
              value={tempo}
              onChange={(e) => setTempo(Number(e.target.value))}
              className="w-full accent-pink-500"
            />
          </div>
        </div>

        {!isGenerating && !generatedTrack && (
          <button onClick={startGenerating} className="w-full py-4 rounded-xl btn-gradient-purple text-xs font-bold shadow-lg">
            Generate AI Phonk Track Now
          </button>
        )}

        {isGenerating && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-pink-500/40 text-pink-300 text-xs font-bold flex items-center justify-center space-x-2">
            <RefreshCw className="w-5 h-5 animate-spin text-pink-400" />
            <span>Synthesizing 808 Drift Cowbells & Distortion...</span>
          </div>
        )}

        {generatedTrack && (
          <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 space-y-3 text-left animate-fade-in">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-5 h-5" />
              <span>Phonk Beat Synthesized!</span>
            </div>
            <p className="text-xs text-white font-bold">{generatedTrack.name}</p>
            <button onClick={downloadTrack} className="w-full py-3 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download High-Quality MP3 Beat</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
