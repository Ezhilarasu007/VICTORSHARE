import React, { useState } from 'react';
import { Header } from './components/Header';
import { PermissionsModal } from './components/PermissionsModal';
import { VideoCompressor } from './components/VideoCompressor';
import { P2PTransfer } from './components/P2PTransfer';
import { TransferHistory } from './components/TransferHistory';
import { ShieldAlert, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState('compressor'); // 'compressor' | 'p2p' | 'history'
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);

  // User permissions state
  const [permissions, setPermissions] = useState({
    camera: true,
    storage: true,
    network: true,
    notifications: true
  });

  // Transfer file pipeline state
  const [latestCompressedFile, setLatestCompressedFile] = useState(null);
  const [historyLogs, setHistoryLogs] = useState([]);

  const permissionCount = Object.values(permissions).filter(Boolean).length;
  const isAllGranted = permissionCount === 4;

  const handleCompressionComplete = (result) => {
    setLatestCompressedFile(result);
    setHistoryLogs(prev => [
      {
        id: Date.now(),
        filename: result.filename,
        originalSizeBytes: result.originalSizeBytes,
        compressedSizeBytes: result.compressedSizeBytes,
        reductionPercent: `${result.reductionPercent}%`,
        targetSizeMB: result.targetSizeMB,
        timestamp: 'Just now',
        status: 'Compressed to 10MB - Ready for Share'
      },
      ...prev
    ]);
  };

  const handleAcceptAllFromBanner = () => {
    setPermissions({
      camera: true,
      storage: true,
      network: true,
      notifications: true
    });
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        permissionCount={permissionCount}
        openPermissionsModal={() => setIsPermissionsOpen(true)}
      />

      {/* Permission Notification Banner if any pending */}
      {!isAllGranted && (
        <div className="bg-gradient-to-r from-amber-950/90 via-slate-900 to-amber-950/90 border-b border-amber-500/40 py-2.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center space-x-2 text-amber-300">
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              <span>Some transfer permissions are pending ({permissionCount}/4 granted). Accept all for full P2P speed.</span>
            </div>
            <button
              onClick={handleAcceptAllFromBanner}
              className="px-3 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-all text-[11px]"
            >
              Accept All Permissions Now
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 pb-16">
        
        {/* Navigation Bar under header */}
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-2 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('compressor')}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                activeTab === 'compressor'
                  ? 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              100GB $\to$ 10MB Compressor
            </button>

            <button
              onClick={() => setActiveTab('p2p')}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                activeTab === 'p2p'
                  ? 'bg-purple-950/80 border-purple-500/50 text-purple-300'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Send & Receive (P2P)
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                activeTab === 'history'
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Activity Log ({historyLogs.length})
            </button>
          </div>

          <div className="hidden sm:flex items-center space-x-2 text-[11px] text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Client-Side Transcoding • End-to-End Encrypted</span>
          </div>
        </div>

        {/* Tab Views */}
        {activeTab === 'compressor' && (
          <VideoCompressor
            onCompressionComplete={(res) => {
              handleCompressionComplete(res);
              // Option to immediately jump to transfer mode
            }}
            permissions={permissions}
            openPermissionsModal={() => setIsPermissionsOpen(true)}
          />
        )}

        {activeTab === 'p2p' && (
          <P2PTransfer
            initialFile={latestCompressedFile}
            permissions={permissions}
            openPermissionsModal={() => setIsPermissionsOpen(true)}
          />
        )}

        {activeTab === 'history' && (
          <TransferHistory
            history={historyLogs}
            onClear={() => setHistoryLogs([])}
          />
        )}

      </main>

      {/* Permissions Authorization Modal */}
      <PermissionsModal
        isOpen={isPermissionsOpen}
        onClose={() => setIsPermissionsOpen(false)}
        permissions={permissions}
        setPermissions={setPermissions}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 glass-panel mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-300">VICTORSHARE PRO</span> — High Ratio Video Compressor & Cross-Device P2P Share
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 cursor-pointer" onClick={() => setIsPermissionsOpen(true)}>Permissions</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">iOS / Android Ready</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">WebRTC P2P</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
