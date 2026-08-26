import React from 'react';
import { Send, Download, ShieldCheck, Zap, Smartphone, HardDrive, Lock, ArrowRight, Sparkles, Globe, Wifi } from 'lucide-react';

export function HomePage({ onSelectSend, onSelectReceive, onSelectCompressor, openPermissionsModal }) {
  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 py-8">
      
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/10">
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span>100% Private • End-to-End Encrypted P2P Share</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Send & Receive Files up to <span className="text-gradient-cyan">100GB</span> Anywhere
        </h1>

        <p className="text-base text-slate-300 leading-relaxed">
          Ultra-fast, private file sharing between iOS, Android, and Desktop. Tap to Upload, share your 6-digit PIN code, and transfer instantly with zero cloud storage.
        </p>
      </div>

      {/* Primary Action Choice Cards: Send vs Receive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* SEND FILE CARD */}
        <div
          onClick={onSelectSend}
          className="group relative glass-panel p-8 rounded-3xl border-2 border-cyan-500/30 hover:border-cyan-400 cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-2xl hover:shadow-cyan-500/20 overflow-hidden flex flex-col justify-between min-h-[320px]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/30">
                <Send className="w-8 h-8 stroke-[2.5]" />
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
                10MB - 100GB
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                SEND A FILE
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Tap to upload any file (from 10MB to 100GB). Get an instant 6-digit PIN code or QR code to share securely.
              </p>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-slate-800">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
              Tap to Upload File <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Encrypted Stream</span>
          </div>
        </div>

        {/* RECEIVE FILE CARD */}
        <div
          onClick={onSelectReceive}
          className="group relative glass-panel p-8 rounded-3xl border-2 border-purple-500/30 hover:border-purple-400 cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-2xl hover:shadow-purple-500/20 overflow-hidden flex flex-col justify-between min-h-[320px]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30">
                <Download className="w-8 h-8 stroke-[2.5]" />
              </div>
              <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800">
                Instant Download
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                RECEIVE A FILE
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Tap to enter the sender's 6-digit PIN code or scan QR code. Connect instantly and download at maximum Wi-Fi speed.
              </p>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-slate-800">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1">
              Tap to Enter PIN <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-[10px] text-slate-500 font-mono">No Login Required</span>
          </div>
        </div>

      </div>

      {/* Secondary Banner: Video Compressor Shortcut */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3.5 bg-cyan-950/80 border border-cyan-500/40 rounded-2xl text-cyan-400">
            <HardDrive className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              100GB to 10MB Video Compressor Engine
              <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-400 text-slate-950 rounded">Ultra Ratio</span>
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Need to share large 100GB videos over WhatsApp or AirDrop? Downscale and transcode directly in your browser.
            </p>
          </div>
        </div>

        <button
          onClick={onSelectCompressor}
          className="w-full md:w-auto px-6 py-3 rounded-xl btn-gradient-primary text-xs font-bold whitespace-nowrap shadow-lg shadow-cyan-500/20"
        >
          Open Video Compressor
        </button>
      </div>

      {/* Security & Feature Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
        
        <div className="glass-card p-5 rounded-2xl space-y-2 border border-slate-800">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
            <Lock className="w-4 h-4" />
            <span>100% Private & Secure</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Files stream directly between peer devices over WebRTC. Nothing is ever saved on external servers.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2 border border-slate-800">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
            <Smartphone className="w-4 h-4" />
            <span>iOS, Android & PC</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Works smoothly on iPhone Safari, Android Chrome, Mac, Windows, and Linux browsers without installing apps.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2 border border-slate-800">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <Zap className="w-4 h-4" />
            <span>50+ MB/s Fast Transfer</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Direct local network throughput with chunked verification ensures zero file corruption.
          </p>
        </div>

      </div>

    </div>
  );
}
