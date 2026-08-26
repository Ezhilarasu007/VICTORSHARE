import React from 'react';
import { Send, Download, ShieldCheck, Zap, Smartphone, HardDrive, Lock, ArrowRight, Sparkles, Globe, Wifi, Film, Package, FileText, Image } from 'lucide-react';

export function HomePage({ setActiveTab, onSelectSend, onSelectReceive, openPermissionsModal }) {
  const handleSend = onSelectSend || (() => setActiveTab && setActiveTab('send'));
  const handleReceive = onSelectReceive || (() => setActiveTab && setActiveTab('receive'));

  return (
    <div className="space-y-10 max-w-6xl mx-auto px-4 py-8">
      
      {/* Hero Header & India's #1 Badge */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-950 via-slate-950 to-emerald-950 border border-orange-500/40 text-xs font-bold text-orange-300 shadow-lg shadow-orange-500/10">
          <span>🇮🇳</span>
          <span className="text-white">India's #1 P2P File & Video Transfer Platform</span>
          <span className="text-emerald-400 font-mono text-[10px]">100% Private</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Send & Receive Files or Videos up to <span className="text-gradient-cyan">10TB+</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          High-speed encrypted file sharing between friends or worldwide. Share Videos, Photos, Android APK Apps, PDFs, and Folders from 10MB up to 10TB+ instantly.
        </p>
      </div>

      {/* Primary Action Choice Cards: Send vs Receive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* SEND FILE CARD */}
        <div
          onClick={handleSend}
          className="group relative glass-panel p-8 rounded-3xl border-2 border-cyan-500/40 hover:border-cyan-400 cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-2xl hover:shadow-cyan-500/20 overflow-hidden flex flex-col justify-between min-h-[320px]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/30">
                <Send className="w-8 h-8 stroke-[2.5]" />
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800">
                10MB - 10TB+ Support
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                SEND A FILE OR VIDEO
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Pick Movies, Songs, Photos, Apps, PDFs, or Folders from your device. Generates an encrypted PIN code & QR code instantly.
              </p>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-cyan-500/20">
            <span className="text-xs font-bold text-cyan-400 flex items-center space-x-1.5">
              <span>Auto-Generates Encrypted PIN</span>
            </span>
            <div className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* RECEIVE FILE CARD */}
        <div
          onClick={handleReceive}
          className="group relative glass-panel p-8 rounded-3xl border-2 border-purple-500/40 hover:border-purple-400 cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-2xl hover:shadow-purple-500/20 overflow-hidden flex flex-col justify-between min-h-[320px]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30">
                <Download className="w-8 h-8 stroke-[2.5]" />
              </div>
              <span className="text-xs font-mono font-bold text-purple-300 bg-purple-950/80 px-3 py-1 rounded-full border border-purple-800">
                Direct Storage Download
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                RECEIVE A FILE OR VIDEO
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Enter the 6-digit Transfer PIN or scan QR code to stream and save the exact file directly into device storage.
              </p>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-purple-500/20">
            <span className="text-xs font-bold text-purple-300 flex items-center space-x-1.5">
              <span>Enter 6-Digit Code</span>
            </span>
            <div className="p-2.5 rounded-xl bg-purple-600 text-white group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>
        </div>

      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs">
            <Zap className="w-4 h-4" />
            <span>Avg 145 MB/s Speed</span>
          </div>
          <p className="text-xs text-slate-400">Direct device-to-device streaming via WebRTC P2P pipes.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
            <Lock className="w-4 h-4" />
            <span>AES-256 Encryption</span>
          </div>
          <p className="text-xs text-slate-400">100% end-to-end encrypted with zero server file copies stored.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-xs">
            <Smartphone className="w-4 h-4" />
            <span>All Devices Supported</span>
          </div>
          <p className="text-xs text-slate-400">iOS iPhone, Android, Windows, Mac, and Linux browser support.</p>
        </div>
      </div>

    </div>
  );
}
