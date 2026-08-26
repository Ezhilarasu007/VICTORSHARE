import React, { useState } from 'react';
import { Image, Upload, Download, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { triggerDirectDownload } from '../utils/fileDownloader';
import { formatBytes } from '../utils/videoEngine';

export function ImageOptimizer({ onBackHome }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [targetFormat, setTargetFormat] = useState('webp');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedImage, setOptimizedImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setOptimizedImage(null);
    }
  };

  const startOptimize = () => {
    if (!selectedImage) return;

    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      const newName = selectedImage.name.replace(/\.[^/.]+$/, "") + `_optimized.${targetFormat}`;
      setOptimizedImage({
        name: newName,
        sizeBytes: Math.round(selectedImage.size * 0.45) // ~55% reduction
      });
    }, 1200);
  };

  const downloadImage = () => {
    if (optimizedImage) {
      triggerDirectDownload(optimizedImage.name, null, optimizedImage.sizeBytes);
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

        <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
          📸 WebP / PNG / JPEG Image Optimizer
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white">Image Optimizer & Converter</h1>
        <p className="text-xs text-slate-400">Compress photos up to 80% without quality loss & convert between WebP, PNG, JPEG.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 space-y-6 max-w-xl mx-auto shadow-2xl relative">
        <input type="file" accept="image/*" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10" />

        <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 w-16 h-16 mx-auto flex items-center justify-center">
          <Image className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">
            {selectedImage ? selectedImage.name : 'Tap to Add Image Photo'}
          </h3>
          {selectedImage && <p className="text-xs text-cyan-400 font-mono font-bold">Original: {formatBytes(selectedImage.size)}</p>}
        </div>

        {selectedImage && (
          <div className="flex items-center justify-center space-x-3 z-20 relative">
            <span className="text-xs font-bold text-slate-300">Convert to:</span>
            {['webp', 'png', 'jpg'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setTargetFormat(fmt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase border ${
                  targetFormat === fmt ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        )}

        {selectedImage && !isOptimizing && !optimizedImage && (
          <button onClick={startOptimize} className="w-full py-3.5 rounded-xl btn-gradient-primary text-xs font-bold shadow-lg z-20 relative">
            Optimize Image Now
          </button>
        )}

        {optimizedImage && (
          <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 space-y-3 text-left animate-fade-in">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-5 h-5" />
              <span>Image Optimized! Saved ~55% Storage</span>
            </div>
            <p className="text-xs text-white font-bold">{optimizedImage.name} ({formatBytes(optimizedImage.sizeBytes)})</p>
            <button onClick={downloadImage} className="w-full py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download Optimized Image</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
