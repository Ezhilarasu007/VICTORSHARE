import React from 'react';
import { Zap, ShieldCheck, Wifi, Smartphone, Send, Download, HardDrive, Home, ArrowUpRight } from 'lucide-react';

export function Header({ activePage, setActivePage, permissionCount, openPermissionsModal }) {
  const allGranted = permissionCount === 4;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePage('home')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/25">
              <Zap className="w-6 h-6 text-slate-950 stroke-[2.5]" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-white">VICTOR<span className="text-gradient-cyan">SHARE</span></span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 rounded-md">
                  100GB P2P
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Private & Fast File Sharing for iOS, Android & PC</p>
            </div>
          </div>

          {/* Page Nav Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            <button
              onClick={() => setActivePage('home')}
              className={`px-3 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center space-x-1.5 ${
                activePage === 'home'
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </button>

            <button
              onClick={() => setActivePage('send')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center space-x-1.5 ${
                activePage === 'send'
                  ? 'btn-gradient-primary shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>

            <button
              onClick={() => setActivePage('receive')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center space-x-1.5 ${
                activePage === 'receive'
                  ? 'btn-gradient-purple shadow-lg shadow-purple-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Receive</span>
            </button>

            <button
              onClick={() => setActivePage('compressor')}
              className={`px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center space-x-1.5 ${
                activePage === 'compressor'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <HardDrive className="w-4 h-4" />
              <span className="hidden md:inline">100GB $\to$ 10MB</span>
            </button>

            {/* Permission Badge */}
            <button
              onClick={openPermissionsModal}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold border transition-all flex items-center space-x-1 ${
                allGranted
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-300 animate-pulse'
              }`}
              title="Permissions"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline">{allGranted ? 'Permissions OK' : `${permissionCount}/4`}</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
