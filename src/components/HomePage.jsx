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
          Send & Receive Files or Videos up to <span className="text-gradient-cyan">100GB</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          High-speed encrypted file sharing between friends or worldwide. Share Videos, Photos, Android APK Apps, PDFs, and Folders from 10MB up to 100GB.
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
                10MB - 100GB Support
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white group-hover:text-cyan-300 transition-colors">
                SEND A FILE OR VIDEO
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Tap to upload any Video, Photo, APK App, PDF, or Folder. Automatically shows your secure transfer code — no personal code entry needed!
              </p>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-slate-800">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1">
              Tap to Open Send Panel <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-[10px] text-slate-500 font-mono">AES-256 Encrypted</span>
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
                Instant P2P Stream
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                RECEIVE A FILE OR VIDEO
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Tap to enter the 6-digit Transfer Code. Inspect file details and download directly at maximum Wi-Fi / P2P speed.
              </p>
            </div>
          </div>

          <div className="pt-6 flex items-center justify-between border-t border-slate-800">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1">
              Tap to Open Receive Panel <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="text-[10px] text-slate-500 font-mono">No Server Account Required</span>
          </div>
        </div>

      </div>

      {/* Supported File Types Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-around gap-4 text-center">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
          <Film className="w-5 h-5 text-cyan-400" />
          <span>4K/8K Videos (10MB - 100GB)</span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
          <Image className="w-5 h-5 text-purple-400" />
          <span>Photos & RAW Galleries</span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
          <Package className="w-5 h-5 text-emerald-400" />
          <span>Android APK Apps</span>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-200">
          <FileText className="w-5 h-5 text-pink-400" />
          <span>PDFs & Documents</span>
        </div>
      </div>

      {/* Security & Feature Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
        
        <div className="glass-card p-5 rounded-2xl space-y-2 border border-slate-800">
          <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
            <Lock className="w-4 h-4" />
            <span>100% Private & Zero Cloud Leak</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Direct WebRTC P2P stream. Files pass securely between devices without storing personal data on cloud servers.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2 border border-slate-800">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm">
            <Smartphone className="w-4 h-4" />
            <span>iOS, Android & Desktop</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Compatible with iPhone Safari, Android Chrome, Mac, Windows, and Linux browsers worldwide.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl space-y-2 border border-slate-800">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <Zap className="w-4 h-4" />
            <span>Fast P2P Direct Transfer</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            High-speed chunked stream pipeline with exact byte verification guarantees 100% accurate file downloads.
          </p>
        </div>

      </div>

    </div>
  );
}
