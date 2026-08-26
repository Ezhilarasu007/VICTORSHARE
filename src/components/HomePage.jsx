import React from 'react';
import { Send, Download, ShieldCheck, Zap, Lock, Globe, HardDrive, Sparkles, Sliders, Film, Music, FileText } from 'lucide-react';
import { useLanguage } from '../utils/languageStore';
import { AdMobBanner } from './AdMobBanner';

export function HomePage({ setActiveTab, openPermissionsModal }) {
  const { t } = useLanguage();

  return (
    <div className="space-y-12 max-w-6xl mx-auto px-4 py-8 text-center">
      
      {/* Hero Badge */}
      <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/40 shadow-lg shadow-cyan-500/10">
        <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
        <span className="text-xs font-mono font-bold text-gradient-cyan">
          VICTORSHARE PRO 2026 • AES-256 ENCRYPTED P2P PIPE
        </span>
      </div>

      {/* Main Headline */}
      <div className="space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Universal P2P File & Video Transfer <span className="text-gradient-cyan">(10MB to 10TB+)</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Transfer videos, 4K movies, audio, photos, and apps directly between iOS, Android, Windows & Mac devices with zero server logs.
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('send')}
          className="w-full sm:w-1/2 py-4 px-6 rounded-2xl btn-gradient-primary text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all"
        >
          <Send className="w-5 h-5 stroke-[2.5]" />
          <span>{t('send')}</span>
        </button>

        <button
          onClick={() => setActiveTab('receive')}
          className="w-full sm:w-1/2 py-4 px-6 rounded-2xl btn-gradient-purple text-white font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-purple-500/25 hover:scale-105 transition-all"
        >
          <Download className="w-5 h-5 stroke-[2.5]" />
          <span>{t('receive')}</span>
        </button>
      </div>

      {/* AdMob Rewarded Video Ad Component */}
      <AdMobBanner adType="rewarded" slotId="7773986107" />

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
        
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-all">
          <div className="p-3 rounded-2xl bg-cyan-950 text-cyan-400 w-fit">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Thunder Fast P2P Engine</h3>
          <p className="text-xs text-slate-400">Direct WebRTC browser-to-browser pipe delivering 145 MB/s to 500 MB/s speed.</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-purple-500/40 transition-all">
          <div className="p-3 rounded-2xl bg-purple-950 text-purple-400 w-fit">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">AES-256 E2EE Security</h3>
          <p className="text-xs text-slate-400">End-to-end encrypted transfer with automatic 6-digit PIN verification codes.</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-all">
          <div className="p-3 rounded-2xl bg-emerald-950 text-emerald-400 w-fit">
            <HardDrive className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">10MB to 10TB+ Storage Capacity</h3>
          <p className="text-xs text-slate-400">Share any large ISO, 8K video, FL Studio track, APK, or PDF without size restrictions.</p>
        </div>

      </div>

      {/* AdMob Adaptive Banner Ad Component */}
      <AdMobBanner adType="banner" slotId="2966231183" />

    </div>
  );
}
