import React from 'react';
import { X, FileText, ShieldCheck, Info, Mail, Send, CheckCircle2 } from 'lucide-react';

export function InfoModal({ activeTab, onClose }) {
  if (!activeTab) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl overflow-y-auto max-h-[85vh] space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-900/80 rounded-full border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab 1: Terms & Conditions */}
        {activeTab === 'terms' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3 text-cyan-400">
              <FileText className="w-7 h-7" />
              <h2 className="text-2xl font-black text-white">Terms & Conditions</h2>
            </div>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed border-t border-slate-800 pt-4">
              <p>
                <strong>1. Acceptance of Terms:</strong> By using VictorShare, you agree to these Terms & Conditions. VictorShare provides direct peer-to-peer (P2P) file transfer technology for 10MB to 100GB files.
              </p>
              <p>
                <strong>2. Acceptable Use:</strong> Users are responsible for all files shared. Do not transfer illegal, harmful, or copyrighted content without authorization.
              </p>
              <p>
                <strong>3. Service Availability:</strong> Transfers rely on direct P2P connections and WebRTC pipes between devices. VictorShare does not guarantee network bandwidth on third-party ISPs.
              </p>
              <p>
                <strong>4. Limitation of Liability:</strong> VictorShare is provided "as is" without warranty. We do not store or inspect user files on our servers.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Privacy Policy */}
        {activeTab === 'privacy' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3 text-emerald-400">
              <ShieldCheck className="w-7 h-7" />
              <h2 className="text-2xl font-black text-white">Privacy Policy</h2>
            </div>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed border-t border-slate-800 pt-4">
              <p>
                <strong>1. 100% Zero File Data Logging:</strong> Your files never pass through or get saved on our cloud servers. All transfers occur directly device-to-device via client-side WebRTC & WebSockets.
              </p>
              <p>
                <strong>2. End-to-End Encryption (AES-256):</strong> All pairing codes and stream chunks are encrypted using AES-256 client-side keys. No third party or ISP can read your transfer contents.
              </p>
              <p>
                <strong>3. No Account Required:</strong> VictorShare does not collect personal names, passwords, or emails for file transfers.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: About Us */}
        {activeTab === 'about' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3 text-purple-400">
              <Info className="w-7 h-7" />
              <h2 className="text-2xl font-black text-white">About VictorShare</h2>
            </div>
            <div className="text-xs text-slate-300 space-y-3 leading-relaxed border-t border-slate-800 pt-4">
              <p>
                VictorShare is a state-of-the-art P2P file sharing platform engineered in 2026 to enable high-speed direct transfers for large 8K cinematic videos, photo albums, APKs, PDFs, and folders from 10MB up to 100GB across iOS, Android, Windows, Mac, and Linux.
              </p>
              <p>
                Built with zero-alert silent downloads, automatic PIN code generation, and direct device storage saving.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Contact Us */}
        {activeTab === 'contact' && (
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3 text-pink-400">
              <Mail className="w-7 h-7" />
              <h2 className="text-2xl font-black text-white">Contact Us</h2>
            </div>
            <div className="text-xs text-slate-300 space-y-4 border-t border-slate-800 pt-4">
              <p>Have questions, feature requests, or technical inquiries? Reach out directly:</p>
              
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase block">Official Contact Email</span>
                <a
                  href="mailto:arasu9629hf@gmail.com"
                  className="text-base font-black text-cyan-300 hover:underline flex items-center space-x-2"
                >
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <span>arasu9629hf@gmail.com</span>
                </a>
              </div>

              <a
                href="mailto:arasu9629hf@gmail.com"
                className="w-full py-3 rounded-xl btn-gradient-primary text-xs font-bold flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Direct Email Now</span>
              </a>
            </div>
          </div>
        )}

        {/* Footer Close Button */}
        <div className="pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-slate-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
