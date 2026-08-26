import React, { useState } from 'react';
import { ShieldCheck, HardDrive, Send, Download, Sliders, History, Heart, Globe, Star, HelpCircle, ChevronDown, Music, Image, Zap, Lock, Sparkles, BarChart2, Disc, Menu, X } from 'lucide-react';
import { useLanguage } from '../utils/languageStore';

export function Header({ activeTab, setActiveTab, openPermissionsModal, openDonateModal, openGuideModal }) {
  const { lang, setLang, t, LANGUAGES } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeLangObj = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  const handleMobileNav = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
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
                ADVANCED V1.0 (10TB)
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              {t('title')}
            </p>
          </div>
        </div>

        {/* PC Desktop Navigation Pills */}
        <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'home' ? 'bg-slate-800 text-cyan-300 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setActiveTab('send')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
              activeTab === 'send' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t('send')}</span>
          </button>

          <button
            onClick={() => setActiveTab('receive')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
              activeTab === 'receive' ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('receive')}</span>
          </button>

          <button
            onClick={() => setActiveTab('compressor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
              activeTab === 'compressor' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Compressor</span>
          </button>

          {/* Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white flex items-center space-x-1 transition-all"
            >
              <span>More Tools</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isToolsOpen && (
              <div className="absolute left-0 mt-2 w-56 glass-panel rounded-2xl p-2 border border-slate-700 shadow-2xl z-50 space-y-1 text-left">
                <button
                  onClick={() => { setActiveTab('visualizer'); setIsToolsOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center space-x-2"
                >
                  <Disc className="w-4 h-4 text-cyan-400" />
                  <span>Audio Spectrum Visualizer</span>
                </button>

                <button
                  onClick={() => { setActiveTab('phonk-generator'); setIsToolsOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span>AI Phonk Beat Generator</span>
                </button>

                <button
                  onClick={() => { setActiveTab('youtube-seo'); setIsToolsOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center space-x-2"
                >
                  <BarChart2 className="w-4 h-4 text-purple-400" />
                  <span>YouTube Video SEO Generator</span>
                </button>

                <button
                  onClick={() => { setActiveTab('audio-extractor'); setIsToolsOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center space-x-2"
                >
                  <Music className="w-4 h-4 text-purple-400" />
                  <span>Audio Extractor</span>
                </button>

                <button
                  onClick={() => { setActiveTab('image-optimizer'); setIsToolsOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center space-x-2"
                >
                  <Image className="w-4 h-4 text-emerald-400" />
                  <span>Image Optimizer</span>
                </button>

                <button
                  onClick={() => { setActiveTab('speed-test'); setIsToolsOpen(false); }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 flex items-center space-x-2"
                >
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Speed Test</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
              activeTab === 'history' ? 'bg-slate-800 text-purple-300 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>History</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
              activeTab === 'reviews' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Ratings</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Admin Login Button */}
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-2.5 py-2 rounded-xl border text-xs font-bold flex items-center space-x-1 transition-all ${
              activeTab === 'admin' ? 'bg-rose-950 border-rose-500 text-rose-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Secret Admin Portal"
          >
            <Lock className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline">Admin</span>
          </button>

          {/* How to Use Guide Button */}
          <button
            onClick={openGuideModal}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center space-x-1.5 transition-all"
            title="How to Use Guide"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Guide</span>
          </button>

          {/* Donate / Support Button */}
          <button
            onClick={openDonateModal}
            className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:opacity-90 text-white text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-purple-500/20 transition-all"
          >
            <Heart className="w-4 h-4 fill-white stroke-[2]" />
            <span className="hidden sm:inline">{t('donate')}</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 lg:hidden"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-2 text-left animate-fade-in">
          <button onClick={() => handleMobileNav('home')} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 text-xs font-bold text-cyan-300">
            🏠 Home
          </button>
          <button onClick={() => handleMobileNav('send')} className="w-full px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2">
            <Send className="w-4 h-4" /> Send File or Video
          </button>
          <button onClick={() => handleMobileNav('receive')} className="w-full px-4 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center gap-2">
            <Download className="w-4 h-4" /> Receive File or Video
          </button>
          <button onClick={() => handleMobileNav('compressor')} className="w-full px-4 py-2.5 rounded-xl bg-slate-900 text-xs font-bold text-emerald-400 flex items-center gap-2">
            <Sliders className="w-4 h-4" /> Video Compressor
          </button>

          <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs font-bold">
            <button onClick={() => handleMobileNav('visualizer')} className="p-2.5 rounded-xl bg-slate-900 text-cyan-300 flex items-center gap-1.5">
              <Disc className="w-4 h-4 text-cyan-400" /> Visualizer
            </button>
            <button onClick={() => handleMobileNav('phonk-generator')} className="p-2.5 rounded-xl bg-slate-900 text-pink-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pink-400" /> Phonk Studio
            </button>
            <button onClick={() => handleMobileNav('youtube-seo')} className="p-2.5 rounded-xl bg-slate-900 text-purple-300 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-purple-400" /> YouTube SEO
            </button>
            <button onClick={() => handleMobileNav('audio-extractor')} className="p-2.5 rounded-xl bg-slate-900 text-slate-300 flex items-center gap-1.5">
              <Music className="w-4 h-4 text-purple-400" /> Audio Extract
            </button>
            <button onClick={() => handleMobileNav('image-optimizer')} className="p-2.5 rounded-xl bg-slate-900 text-emerald-300 flex items-center gap-1.5">
              <Image className="w-4 h-4 text-emerald-400" /> Image Opt
            </button>
            <button onClick={() => handleMobileNav('speed-test')} className="p-2.5 rounded-xl bg-slate-900 text-cyan-300 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" /> Speed Test
            </button>
            <button onClick={() => handleMobileNav('admin')} className="p-2.5 rounded-xl bg-rose-950 text-rose-300 border border-rose-500/40 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-rose-400" /> Admin Portal
            </button>
            <button onClick={() => handleMobileNav('reviews')} className="p-2.5 rounded-xl bg-amber-950 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-current text-amber-400" /> Ratings
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
