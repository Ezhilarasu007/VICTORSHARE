import React from 'react';
import { Zap, ShieldCheck, Wifi, Smartphone, Monitor, HardDrive, ArrowUpRight } from 'lucide-react';

export function Header({ activeTab, setActiveTab, permissionCount, openPermissionsModal }) {
  const allGranted = permissionCount === 4;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('compressor')}>
            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
              <Zap className="w-7 h-7 text-slate-950 stroke-[2.5]" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-extrabold tracking-tight text-white">VICTOR<span className="text-gradient-cyan">SHARE</span></span>
                <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 rounded-md">
                  PRO 4K
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">100GB to 10MB Video Compressor & Cross-Platform P2P Share</p>
            </div>
          </div>

          {/* OS Badges & Status Indicators */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Permission Badge */}
            <button
              onClick={openPermissionsModal}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all ${
                allGranted
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/50'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-300 hover:bg-amber-900/50 animate-pulse'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{allGranted ? 'All Permissions Accepted' : `Permissions (${permissionCount}/4)`}</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </button>

            {/* Network Ready Indicator */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <Wifi className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-mono text-cyan-300">P2P Network Active</span>
            </div>

            {/* Target Devices */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
              <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
              <span>iOS / Android / PC</span>
            </div>

          </div>

          {/* Tab Navigation Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('compressor')}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'compressor'
                  ? 'btn-gradient-primary shadow-lg shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <HardDrive className="w-4 h-4" />
                <span>100GB $\to$ 10MB</span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('p2p')}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all ${
                activeTab === 'p2p'
                  ? 'btn-gradient-purple shadow-lg shadow-purple-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center space-x-1.5">
                <Wifi className="w-4 h-4" />
                <span>Send & Receive</span>
              </span>
            </button>

            <button
              onClick={openPermissionsModal}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/60 rounded-xl transition-all sm:hidden"
              title="Permissions"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
