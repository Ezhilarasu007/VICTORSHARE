import React from 'react';
import { X, ShieldCheck, Lock, FileText, Mail, Heart, AlertTriangle } from 'lucide-react';

export function InfoModal({ activeTab, onClose }) {
  if (!activeTab) return null;

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

        {/* 18+ Age Restriction Banner */}
        <div className="p-3 rounded-2xl bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>Notice: Users must be 18+ years of age (or have parental supervision) to send encrypted files on VictorShare.</span>
        </div>

        {/* Content Views */}
        {activeTab === 'terms' && (
          <div className="space-y-4 text-left">
            <h2 className="text-2xl font-black text-white flex items-center space-x-2">
              <FileText className="w-6 h-6 text-cyan-400" />
              <span>Terms & Conditions (2026)</span>
            </h2>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
              <p>Welcome to VictorShare. By accessing or using our P2P transfer platform, you agree to comply with the following terms:</p>
              <h3 className="font-bold text-white text-sm">1. Acceptable Use</h3>
              <p>VictorShare provides client-side WebRTC P2P pipes for transferring files between consenting users. Users are strictly prohibited from transmitting illegal content, malware, or copyright-infringing materials.</p>
              
              <h3 className="font-bold text-white text-sm">2. Age Limit (18+)</h3>
              <p>You must be at least 18 years old or possess legal parental consent to initiate transfers. Content shared is end-to-end encrypted between devices.</p>

              <h3 className="font-bold text-white text-sm">3. Zero Storage Guarantee</h3>
              <p>VictorShare servers store zero file content. Data flows directly from sender device memory to receiver device memory via WebRTC data channels.</p>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4 text-left">
            <h2 className="text-2xl font-black text-white flex items-center space-x-2">
              <Lock className="w-6 h-6 text-emerald-400" />
              <span>Privacy Policy (100% Zero Leak)</span>
            </h2>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
              <p>Your privacy is absolute. VictorShare employs military-grade AES-256 client-side encryption.</p>
              <h3 className="font-bold text-white text-sm">1. Data Encryption</h3>
              <p>Files are encrypted in your local browser window prior to transmission. No unencrypted file data ever reaches any server or third party.</p>
              
              <h3 className="font-bold text-white text-sm">2. Automatic Record Cleanup</h3>
              <p>Session records and PIN codes are temporary and auto-deleted from database memory immediately upon stream completion or expiration.</p>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-4 text-left">
            <h2 className="text-2xl font-black text-white flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
              <span>About VictorShare Advanced V1.0</span>
            </h2>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
              <p>VictorShare is India's leading P2P file & video transfer platform designed for high-volume data transfers (10MB to 10TB+).</p>
              <p>Built with WebRTC, IndexedDB, HTML5 MediaRecorder, and Vercel Edge Serverless functions.</p>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4 text-left">
            <h2 className="text-2xl font-black text-white flex items-center space-x-2">
              <Mail className="w-6 h-6 text-pink-400" />
              <span>Contact Us & Support</span>
            </h2>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-white">Official Support Email:</div>
              <div className="text-cyan-400 font-mono font-bold text-sm">arasu9629hf@gmail.com</div>
              <p className="text-slate-400 pt-1">For DMCA inquiries, technical support, partnership requests, or advertising inquiries.</p>
            </div>
          </div>
        )}

        {/* Footer Close */}
        <div className="pt-2 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl btn-gradient-primary text-xs font-bold shadow-lg"
          >
            Close Page
          </button>
        </div>

      </div>
    </div>
  );
}
