import React, { useState } from 'react';
import { ShieldCheck, HardDrive, Send, Download, Sliders, History, Heart, Globe, Star, ChevronDown } from 'lucide-react';
import { useLanguage } from '../utils/languageStore';

export function Header({ activeTab, setActiveTab, openPermissionsModal, openDonateModal }) {
  const { lang, setLang, t, LANGUAGES } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const activeLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        
        {/* Logo */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 text-slate-950 shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-all">
            <Send className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-black tracking-tight text-white">VICTOR</span>
              <span className="text-xl font-black tracking-tight text-gradient-cyan">SHARE</span>
              <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                PRO 2026
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              {t('title')}
            </p>
          </div>
        </div>

        {/* Navigation Pills */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'home' ? 'bg-slate-800 text-cyan-300 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveTab('send')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              activeTab === 'send' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t('send')}</span>
          </button>

          <button
            onClick={() => setActiveTab('receive')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              activeTab === 'receive' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('receive')}</span>
          </button>

          <button
            onClick={() => setActiveTab('compressor')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              activeTab === 'compressor' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{t('compress')}</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              activeTab === 'history' ? 'bg-slate-800 text-purple-300 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>{t('history')}</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
              activeTab === 'reviews' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Ratings</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Donate / Support Button */}
          <button
            onClick={openDonateModal}
            className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:opacity-90 text-white text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-purple-500/20 transition-all"
          >
            <Heart className="w-4 h-4 fill-white stroke-[2]" />
            <span className="hidden sm:inline">{t('donate')}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 flex items-center space-x-1.5 transition-all"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>{activeLangObj.flag}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 glass-panel rounded-2xl p-2 border border-slate-700 shadow-2xl z-50 space-y-1">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                      lang === l.code ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Permissions Status */}
          <button
            onClick={openPermissionsModal}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all"
            title="Manage Permissions"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </button>

        </div>

      </div>
    </header>
  );
}
