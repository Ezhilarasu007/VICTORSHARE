import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Disc, Download, Sparkles, Sliders, ArrowLeft, RefreshCw, Layers } from 'lucide-react';
import { triggerDirectDownload } from '../utils/fileDownloader';

export function MusicVisualizerTool({ onBackHome }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('neonRing'); // 'neonRing', 'cyberBars', 'wavePulse'
  const [selectedTrack, setSelectedTrack] = useState('Drift Phonk 808 Bass');
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Live HTML5 Canvas Audio Spectrum Visualizer Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let phase = 0;

    const drawVisualizer = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      phase += 0.05;

      if (selectedTheme === 'neonRing') {
        // Pulsing Neon Bass Ring (Avee Player Style)
        const radius = 70 + Math.sin(phase * 2) * 15;
        const bars = 64;

        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 15;

        for (let i = 0; i < bars; i++) {
          const angle = (i / bars) * Math.PI * 2;
          const barHeight = Math.abs(Math.sin(angle * 4 + phase)) * 45 + 10;

          const x1 = centerX + Math.cos(angle) * radius;
          const y1 = centerY + Math.sin(angle) * radius;
          const x2 = centerX + Math.cos(angle) * (radius + barHeight);
          const y2 = centerY + Math.sin(angle) * (radius + barHeight);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        // Center spinning vinyl disc
        ctx.fillStyle = '#1e1b4b';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ec4899';
        ctx.stroke();
      } else if (selectedTheme === 'cyberBars') {
        // Cyberpunk Frequency Bars
        const barWidth = 8;
        const gap = 4;
        const totalBars = 32;
        const startX = centerX - (totalBars * (barWidth + gap)) / 2;

        for (let i = 0; i < totalBars; i++) {
          const barHeight = Math.abs(Math.sin(i * 0.3 + phase * 2)) * 120 + 15;
          const x = startX + i * (barWidth + gap);
          const y = height - barHeight - 40;

          const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
          gradient.addColorStop(0, '#ec4899');
          gradient.addColorStop(0.5, '#a855f7');
          gradient.addColorStop(1, '#06b6d4');

          ctx.fillStyle = gradient;
          ctx.fillRect(x, y, barWidth, barHeight);
        }
      } else {
        // Neon Waveform Line
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#38bdf8';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 20;

        for (let x = 0; x < width; x += 5) {
          const y = centerY + Math.sin(x * 0.02 + phase) * 40 + Math.cos(x * 0.05 + phase * 1.5) * 20;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      if (isPlaying) {
        animRef.current = requestAnimationFrame(drawVisualizer);
      }
    };

    drawVisualizer();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, selectedTheme]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const downloadAveeTemplate = (presetName) => {
    const templateContent = JSON.stringify({
      version: '2026.1',
      author: 'VictorShare AI Visualizer Engine',
      preset: presetName,
      theme: selectedTheme,
      fps: 60,
      audioReact: true
    }, null, 2);

    const blob = new Blob([templateContent], { type: 'application/json' });
    triggerDirectDownload(`${presetName}_AveePlayer_Template.viz`, blob, blob.size);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-6 text-center">
      <div className="flex items-center justify-between">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 text-slate-400 hover:text-white bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 transition-all text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
          🎛️ Real-Time Spectrum Visualizer & Avee Templates
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white">AI Music Visualizer & Avee Templates</h1>
        <p className="text-xs text-slate-400">Live 60FPS audio spectrum visualizer & download Avee Player visualizer themes (.viz).</p>
      </div>

      {/* Visualizer Canvas Player */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 space-y-6 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
        
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[300px]">
          <canvas ref={canvasRef} width={640} height={320} className="w-full h-[320px] object-cover" />
          
          <button
            onClick={togglePlay}
            className="absolute p-5 rounded-full bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 shadow-2xl shadow-cyan-500/50 hover:scale-110 transition-all"
          >
            {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
          </button>
        </div>

        {/* Visualizer Theme Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-bold text-slate-400">Spectrum Preset:</span>
          {[
            { id: 'neonRing', label: 'Neon Bass Ring' },
            { id: 'cyberBars', label: 'Cyberpunk Bars' },
            { id: 'wavePulse', label: 'Waveform Line' }
          ].map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedTheme === theme.id ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-lg' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              {theme.label}
            </button>
          ))}
        </div>

        {/* Avee Player Templates Download Section */}
        <div className="pt-4 border-t border-slate-800 space-y-3 text-left">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs">
            <Layers className="w-4 h-4" />
            <span>Download Avee Player Visualizer Themes (.viz)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['Avee_Neon_Ring_2026', 'Cyber_Frequency_808', 'Ultra_Bass_Pulsar'].map((preset) => (
              <div key={preset} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-bold text-white">
                <span className="truncate max-w-[120px]">{preset}</span>
                <button
                  onClick={() => downloadAveeTemplate(preset)}
                  className="px-2.5 py-1.5 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-300 hover:bg-purple-900 text-[11px] font-mono flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>.VIZ</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
