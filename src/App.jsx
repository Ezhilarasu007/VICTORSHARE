import React, { useState } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { SendPage } from './components/SendPage';
import { ReceivePage } from './components/ReceivePage';
import { VideoCompressor } from './components/VideoCompressor';
import { PermissionsModal } from './components/PermissionsModal';
import { ShieldAlert, Lock, Zap } from 'lucide-react';

export function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'send' | 'receive' | 'compressor'
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);

  // User permissions state
  const [permissions, setPermissions] = useState({
    camera: true,
    storage: true,
    network: true,
    notifications: true
  });

  const permissionCount = Object.values(permissions).filter(Boolean).length;
  const isAllGranted = permissionCount === 4;

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
      
      {/* Header */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        permissionCount={permissionCount}
        openPermissionsModal={() => setIsPermissionsOpen(true)}
      />

      {/* Permission Warning Banner if any pending */}
      {!isAllGranted && (
        <div className="bg-gradient-to-r from-amber-950/90 via-slate-900 to-amber-950/90 border-b border-amber-500/40 py-2 px-4 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center space-x-2 text-amber-300">
              <ShieldAlert className="w-4 h-4 animate-bounce" />
              <span>Permissions status ({permissionCount}/4 granted). Accept all for maximum P2P transfer speed.</span>
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
        
        {activePage === 'home' && (
          <HomePage
            onSelectSend={() => setActivePage('send')}
            onSelectReceive={() => setActivePage('receive')}
            openPermissionsModal={() => setIsPermissionsOpen(true)}
          />
        )}

        {activePage === 'send' && (
          <SendPage
            onBackHome={() => setActivePage('home')}
            permissions={permissions}
            openPermissionsModal={() => setIsPermissionsOpen(true)}
          />
        )}

        {activePage === 'receive' && (
          <ReceivePage
            onBackHome={() => setActivePage('home')}
            permissions={permissions}
            openPermissionsModal={() => setIsPermissionsOpen(true)}
          />
        )}

        {activePage === 'compressor' && (
          <VideoCompressor
            permissions={permissions}
            openPermissionsModal={() => setIsPermissionsOpen(true)}
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
          <div className="flex items-center space-x-2">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold text-slate-300">VICTORSHARE PRO</span>
            <span>— Universal P2P File & Video Transfer (10MB to 100GB)</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => setActivePage('send')}>Send File</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => setActivePage('receive')}>Receive File</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer" onClick={() => setIsPermissionsOpen(true)}>AES-256 Security</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
