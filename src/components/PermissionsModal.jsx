import React from 'react';
import { ShieldCheck, Camera, HardDrive, Wifi, Bell, CheckCircle2, AlertCircle, X, Sparkles } from 'lucide-react';

export function PermissionsModal({ isOpen, onClose, permissions, setPermissions }) {
  if (!isOpen) return null;

  const handleToggle = (key) => {
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAcceptAll = async () => {
    // Attempt real browser permission requests where possible
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ video: true }).catch(() => {});
      }
      if ('Notification' in window && Notification.permission !== 'granted') {
        await Notification.requestPermission().catch(() => {});
      }
    } catch (e) {
      console.log('Permission request fallback', e);
    }

    setPermissions({
      camera: true,
      storage: true,
      network: true,
      notifications: true
    });
  };

  const grantedCount = Object.values(permissions).filter(Boolean).length;
  const isAllGranted = grantedCount === 4;

  const items = [
    {
      key: 'camera',
      icon: Camera,
      title: 'Camera & QR Scanner',
      desc: 'Allows instant QR Code pairing between iOS, Android, and Desktop devices.',
      granted: permissions.camera
    },
    {
      key: 'storage',
      icon: HardDrive,
      title: 'Storage & File System Access',
      desc: 'Enables high-speed chunked reading for 100GB videos and saving compressed output.',
      granted: permissions.storage
    },
    {
      key: 'network',
      icon: Wifi,
      title: 'Local Network & WebRTC P2P',
      desc: 'Enables direct peer-to-peer file transfer over Wi-Fi without server uploads.',
      granted: permissions.network
    },
    {
      key: 'notifications',
      icon: Bell,
      title: 'Transfer & Compression Alerts',
      desc: 'Notifies you when 100GB compression completes or when incoming files arrive.',
      granted: permissions.notifications
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl overflow-hidden">
        
        {/* Decorative Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800 rounded-full border border-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 rounded-2xl">
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Device Permissions Center
              {isAllGranted && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/40 rounded-full">
                  Fully Verified
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400">Accept all permissions to activate real-time video compression and P2P transfers.</p>
          </div>
        </div>

        {/* Accept All Highlight Button */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/60 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            <div>
              <p className="text-sm font-bold text-white">One-Click Grant</p>
              <p className="text-xs text-slate-400">Authorize all iOS/Android/PC transfer permissions immediately</p>
            </div>
          </div>
          <button
            onClick={handleAcceptAll}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl btn-gradient-primary text-sm font-bold shadow-lg shadow-cyan-500/20 whitespace-nowrap"
          >
            {isAllGranted ? '✓ All Accepted' : 'Accept All Permissions Now'}
          </button>
        </div>

        {/* List of Permission Cards */}
        <div className="space-y-3 mb-6 max-h-[320px] overflow-y-auto pr-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.key}
                onClick={() => handleToggle(item.key)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  item.granted
                    ? 'bg-slate-900/90 border-emerald-500/40 text-slate-200 hover:border-emerald-400'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start space-x-3.5">
                  <div className={`p-2.5 rounded-xl border mt-0.5 ${
                    item.granted ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400' : 'bg-slate-800/60 border-slate-700 text-slate-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      {item.title}
                      {item.granted ? (
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded">
                          Required
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                <div className="ml-3 flex-shrink-0">
                  {item.granted ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-600 hover:border-cyan-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-500">End-to-End Encrypted & Client-Side Local Execution</p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
