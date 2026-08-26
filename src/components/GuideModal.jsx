import React from 'react';
import { X, HelpCircle, Send, Download, Lock, ShieldCheck, Smartphone, Zap, CheckCircle2, QrCode, HardDrive } from 'lucide-react';

export function GuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const steps = [
    {
      step: '01',
      icon: Send,
      color: 'from-cyan-500 to-blue-600 text-cyan-300 border-cyan-500/40',
      title: 'Select Any File or Folder (10MB - 10TB)',
      desc: 'Tap "Send File" and pick any 4K/8K Video, Photo album, Android APK app, PDF, or folder bundle from your device.'
    },
    {
      step: '02',
      icon: QrCode,
      color: 'from-purple-500 to-pink-600 text-purple-300 border-purple-500/40',
      title: 'Auto-Generated PIN & Mobile QR Code',
      desc: 'The app encrypts your file client-side (AES-256) and automatically displays a unique 6-digit Transfer PIN (e.g. 325-600) and QR Code.'
    },
    {
      step: '03',
      icon: Download,
      color: 'from-emerald-500 to-teal-600 text-emerald-300 border-emerald-500/40',
      title: 'Enter PIN Code on Recipient Device',
      desc: 'Your friend opens VictorShare on her phone or PC, enters the 6-digit PIN code (or scans QR code), and inspects file details.'
    },
    {
      step: '04',
      icon: HardDrive,
      color: 'from-amber-500 to-orange-600 text-amber-300 border-amber-500/40',
      title: 'Direct Storage Download & Auto-Cleanup',
      desc: 'Click "Start P2P Download". The file streams directly into her device storage. Once complete, server records auto-delete with 0 cloud leaks!'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/50 shadow-2xl overflow-y-auto max-h-[85vh] space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-900/80 rounded-full border border-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 text-cyan-400">
          <div className="p-3 rounded-2xl bg-cyan-950 border border-cyan-500/40">
            <HelpCircle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">How to Use VictorShare V1.0</h2>
            <p className="text-xs text-slate-400">Step-by-step guide for ultra-fast encrypted P2P file transfers (10MB to 10TB+)</p>
          </div>
        </div>

        {/* 4 Step Cards Grid */}
        <div className="space-y-4 pt-2">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start space-x-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center font-black text-sm border flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="space-y-1 text-left">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-cyan-400">STEP {s.step}</span>
                    <h3 className="text-sm font-bold text-white">{s.title}</h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security Feature Highlights */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-500/30 flex items-center justify-between text-xs font-bold text-slate-300">
          <div className="flex items-center space-x-2 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            <span>AES-256 E2EE Pipe</span>
          </div>
          <div className="flex items-center space-x-2 text-cyan-300">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>Avg 145 MB/s P2P Stream</span>
          </div>
          <div className="flex items-center space-x-2 text-purple-300">
            <Smartphone className="w-5 h-5 text-purple-400" />
            <span>iOS & Android Ready</span>
          </div>
        </div>

        {/* Footer Close */}
        <div className="pt-2 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl btn-gradient-primary text-xs font-bold shadow-lg"
          >
            Got It! Start Transfer Now
          </button>
        </div>

      </div>
    </div>
  );
}
