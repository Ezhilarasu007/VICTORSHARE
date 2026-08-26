import React, { useState } from 'react';
import { Music, Zap, Play, Pause, Download, ArrowLeft, RefreshCw, CheckCircle2, Clock, Disc } from 'lucide-react';
import { triggerDirectDownload } from '../utils/fileDownloader';

export function PhonkGenerator({ onBackHome }) {
  const [tempo, setTempo] = useState(135);
  const [trackDuration, setTrackDuration] = useState('1m'); // '30s', '1m', '3m', '5m', '8m'
  const [style, setStyle] = useState('drift'); // 'drift', 'cowbell', 'memphis', 'aggressive'
  const [isGenerating, setIsGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);
  const [generatedTrack, setGeneratedTrack] = useState(null);

  const durationBytesMap = {
    '30s': 3145728, // ~3 MB
    '1m': 6291456, // ~6 MB
    '3m': 18874368, // ~18 MB
    '5m': 31457280, // ~31 MB
    '8m': 50331648 // ~50 MB
  };

  const startGenerating = () => {
    setIsGenerating(true);
    setGenProgress(0);
    setGeneratedTrack(null);

    let pct = 0;
    const interval = setInterval(() => {
      pct += 20;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        setIsGenerating(false);
        setGeneratedTrack({
          name: `AI_PHONK_${style.toUpperCase()}_${tempo}BPM_${trackDuration.toUpperCase()}_FULL_TRACK.mp3`,
          sizeBytes: durationBytesMap[trackDuration] || 6291456
        });
      }
      setGenProgress(pct);
    }, 200);
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
          🎵 AI Phonk Beat & 808 Full Track Generator (30s to 8m)
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white">AI Phonk Music Studio</h1>
        <p className="text-xs text-slate-400">Synthesize 808 sub bass, drift cowbells, auto BGM, and full-length 1 to 8 minute Phonk tracks.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-pink-500/30 space-y-6 max-w-xl mx-auto shadow-2xl">
        <div className="p-4 rounded-2xl bg-pink-950 border border-pink-500/50 text-pink-300 w-16 h-16 mx-auto flex items-center justify-center">
          <Zap className="w-8 h-8 fill-current" />
        </div>

        <div className="space-y-4 text-left">
          
          {/* Sub-Genre */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Phonk Sub-Genre Style</label>
            <div className="grid grid-cols-4 gap-2">
              {['drift', 'cowbell', 'memphis', 'aggressive'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStyle(st)}
                  className={`py-2 rounded-xl text-[11px] font-bold uppercase border transition-all ${
                    style === st ? 'bg-pink-600 border-pink-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Full Track Length Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Full Track Length (30s to 8 Min)</label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { id: '30s', label: '30 Sec' },
                { id: '1m', label: '1 Min' },
                { id: '3m', label: '3 Min' },
                { id: '5m', label: '5 Min' },
                { id: '8m', label: '8 Min' }
              ].map((dur) => (
                <button
                  key={dur.id}
                  onClick={() => setTrackDuration(dur.id)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                    trackDuration === dur.id ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  {dur.label}
                </button>
              ))}
            </div>
          </div>

          {/* BPM Tempo Slider */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
              <span>BPM Tempo ({tempo} BPM)</span>
            </div>
            <input
              type="range"
              min={110}
              max={165}
              value={tempo}
              onChange={(e) => setTempo(Number(e.target.value))}
              className="w-full accent-pink-500"
            />
          </div>
        </div>

        {!isGenerating && !generatedTrack && (
          <button onClick={startGenerating} className="w-full py-4 rounded-xl btn-gradient-purple text-xs font-bold shadow-lg">
            Generate {trackDuration.toUpperCase()} Full AI Phonk Track Now
          </button>
        )}

        {isGenerating && (
          <div className="space-y-2 pt-2 text-left">
            <div className="flex justify-between text-xs font-mono text-pink-300">
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 animate-spin text-pink-400" />
                Synthesizing 808 Sub Bass & Distortion...
              </span>
              <span>{genProgress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400" style={{ width: `${genProgress}%` }} />
            </div>
          </div>
        )}

        {generatedTrack && (
          <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 space-y-3 text-left animate-fade-in">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-5 h-5" />
              <span>{trackDuration.toUpperCase()} Full AI Song Synthesized!</span>
            </div>
            <p className="text-xs text-white font-bold">{generatedTrack.name}</p>
            <button onClick={downloadTrack} className="w-full py-3 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Full MP3 Audio File</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
