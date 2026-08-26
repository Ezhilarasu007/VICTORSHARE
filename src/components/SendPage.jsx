import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Upload, HardDrive, Lock, ShieldCheck, Copy, Check, Radio, Send, CheckCircle2, RefreshCw, Smartphone, ArrowLeft, Sparkles, Folder, Image, Film, FileText, Clock } from 'lucide-react';
import { formatBytes, gbToBytes } from '../utils/videoEngine';

export function SendPage({ onBackHome, permissions, openPermissionsModal }) {
  // File state (Supports video, image, folder, document up to 100GB)
  const [selectedFile, setSelectedFile] = useState({
    name: 'RAW_8K_CINEMATIC_MASTER_100GB.mov',
    type: 'video', // 'video' | 'image' | 'folder' | 'document'
    sizeBytes: gbToBytes(100),
    itemCount: 1,
    isDemo: true
  });

  // 2-Minute Auto-Generating Dynamic PIN Code System
  const [pairingPin, setPairingPin] = useState('325-600');
  const [timeLeft, setTimeLeft] = useState(120); // 120 seconds (2 mins)
  const [isCopied, setIsCopied] = useState(false);

  // Transfer State
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);
  const [transferSpeed, setTransferSpeed] = useState(0);
  const [connectedPeer, setConnectedPeer] = useState(null);

  // Function to generate fresh 6-digit PIN
  const generateFreshPin = () => {
    const p1 = Math.floor(100 + Math.random() * 900);
    const p2 = Math.floor(100 + Math.random() * 900);
    const newPin = `${p1}-${p2}`;
    setPairingPin(newPin);
    setTimeLeft(120); // Reset to 2 minutes
  };

  // Countdown timer effect for 2 minutes auto-refresh
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          generateFreshPin();
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (files.length > 1) {
        // Folder / Multiple Files
        let totalBytes = 0;
        for (let i = 0; i < files.length; i++) totalBytes += files[i].size;
        setSelectedFile({
          name: `📁 Shared_Folder_Bundle (${files.length} items)`,
          type: 'folder',
          sizeBytes: totalBytes,
          itemCount: files.length,
          isDemo: false
        });
      } else {
        const file = files[0];
        const type = file.type.startsWith('video')
          ? 'video'
          : file.type.startsWith('image')
          ? 'image'
          : 'document';
        setSelectedFile({
          name: file.name,
          type,
          sizeBytes: file.size,
          itemCount: 1,
          isDemo: false,
          rawFile: file
        });
      }
      setIsTransferring(false);
      setTransferProgress(0);
      generateFreshPin(); // Generate new 2-min PIN on new upload
    }
  };

  const loadPresetFile = (type) => {
    if (type === '100gb') {
      setSelectedFile({
        name: '🎬 RAW_8K_CINEMATIC_MASTER_100GB.mov',
        type: 'video',
        sizeBytes: gbToBytes(100),
        itemCount: 1,
        isDemo: true
      });
    } else if (type === 'folder') {
      setSelectedFile({
        name: '📁 PROJECT_ASSETS_FOLDER (48 files)',
        type: 'folder',
        sizeBytes: gbToBytes(4.5),
        itemCount: 48,
        isDemo: true
      });
    } else if (type === 'image') {
      setSelectedFile({
        name: '📸 ULTRA_HD_GALLERY_ALBUM.zip',
        type: 'image',
        sizeBytes: gbToBytes(0.8),
        itemCount: 150,
        isDemo: true
      });
    }
    setIsTransferring(false);
    setTransferProgress(0);
    generateFreshPin();
  };

  const handleCopyPin = () => {
    navigator.clipboard.writeText(pairingPin);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const simulateRecipientConnect = (peerName = 'iPhone 15 Pro (iOS Safari)') => {
    if (!permissions.network || !permissions.storage) {
      openPermissionsModal();
      return;
    }

    setConnectedPeer(peerName);
    setIsTransferring(true);
    setTransferProgress(0);

    let progressVal = 0;
    const interval = setInterval(() => {
      progressVal += Math.floor(Math.random() * 8) + 4;
      if (progressVal >= 100) {
        progressVal = 100;
        clearInterval(interval);
        setIsTransferring(false);
      }
      setTransferProgress(progressVal);
      setTransferSpeed((Math.random() * 20 + 38).toFixed(1));
    }, 150);
  };

  const formatMinSec = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getFileIcon = (type) => {
    if (type === 'folder') return Folder;
    if (type === 'image') return Image;
    if (type === 'video') return Film;
    return FileText;
  };

  const FileIconComp = getFileIcon(selectedFile.type);

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-6">
      
      {/* Back Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 text-slate-400 hover:text-white bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800 transition-all text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to ShareIt Home</span>
        </button>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>ShareIt / QuickShare Direct P2P</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white">ShareIt Fast Send (10MB to 100GB)</h1>
        <p className="text-xs text-slate-400">Tap to upload files or folders. A new PIN automatically generates every 2 minutes.</p>
      </div>

      {/* Step 1: Big Tap to Upload Dropzone */}
      <div className="glass-panel p-8 rounded-3xl border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 text-center space-y-6 transition-all relative">
        
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
        />

        <div className="p-5 rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-slate-950 shadow-xl shadow-cyan-500/30 w-20 h-20 mx-auto flex items-center justify-center">
          <Upload className="w-10 h-10 stroke-[2.5] animate-bounce" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white">Tap to Upload File or Folder</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Select Videos, Photos, Folders, or Documents up to 100GB to share instantly.
          </p>
        </div>

        {/* Selected File Card Badge */}
        {selectedFile && (
          <div className="inline-flex items-center space-x-3 px-5 py-3 rounded-2xl bg-slate-950 border border-cyan-500/50 text-xs font-bold text-white shadow-xl z-20 relative">
            <FileIconComp className="w-5 h-5 text-cyan-400 flex-shrink-0" />
            <div className="text-left">
              <div className="font-extrabold text-cyan-300 truncate max-w-xs">{selectedFile.name}</div>
              <div className="text-[10px] text-slate-400 font-mono">
                Size: {formatBytes(selectedFile.sizeBytes)} • {selectedFile.itemCount} item(s)
              </div>
            </div>
          </div>
        )}

        {/* Preset Sample Selector */}
        <div className="pt-2 z-20 relative flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => loadPresetFile('100gb')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
          >
            🎬 Load 100GB Movie File
          </button>

          <button
            type="button"
            onClick={() => loadPresetFile('folder')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
          >
            📁 Load Project Folder (4.5GB)
          </button>

          <button
            type="button"
            onClick={() => loadPresetFile('image')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
          >
            📸 Load Photo Album
          </button>
        </div>

      </div>

      {/* Step 2: 2-Minute Dynamic Auto-Refreshing PIN & QR Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Dynamic 2-Minute PIN Display */}
        <div className="glass-card p-6 rounded-3xl space-y-6 text-center border border-cyan-500/40 relative">
          
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/50 text-[10px] font-mono font-bold text-cyan-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Auto-Refreshes Every 2 Mins ({formatMinSec(timeLeft)})</span>
            </div>

            <h3 className="text-xl font-black text-white mt-3">Dynamic 6-Digit Share PIN</h3>
            <p className="text-xs text-slate-400">Share this code with recipient to view file details and download.</p>
          </div>

          {/* Huge PIN Display */}
          <div className="p-6 rounded-2xl bg-slate-950 border-2 border-cyan-500/60 space-y-3 shadow-inner">
            <div className="font-mono text-5xl font-black text-gradient-cyan tracking-widest">
              {pairingPin}
            </div>

            <div className="flex items-center justify-center space-x-2 pt-1">
              <button
                onClick={handleCopyPin}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 flex items-center space-x-1.5 transition-all"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                <span>{isCopied ? 'PIN Copied!' : 'Copy PIN'}</span>
              </button>

              <button
                onClick={generateFreshPin}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-cyan-300 flex items-center space-x-1"
                title="Generate New PIN Now"
              >
                <RefreshCw className="w-4 h-4" />
                <span>New PIN</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-500">
            Secure PIN auto-expires in {timeLeft} seconds for maximum privacy.
          </div>

        </div>

        {/* Right: ShareIt Radar & QR Code */}
        <div className="glass-card p-6 rounded-3xl space-y-6 text-center border border-slate-800">
          <div>
            <h3 className="text-xl font-black text-white">ShareIt Quick QR Scan</h3>
            <p className="text-xs text-slate-400">Scan with mobile camera or test fast connection</p>
          </div>

          <div className="inline-block p-4 rounded-2xl bg-white shadow-2xl border-4 border-cyan-400">
            <QRCodeSVG
              value={`https://victorshare.vercel.app/receive?pin=${pairingPin.replace('-', '')}`}
              size={150}
              level="H"
              includeMargin={true}
            />
          </div>

          <button
            onClick={() => simulateRecipientConnect('Galaxy S24 Ultra (Android Chrome)')}
            disabled={isTransferring}
            className="w-full py-3.5 rounded-xl btn-gradient-primary text-xs font-bold shadow-lg shadow-cyan-500/20"
          >
            {isTransferring ? 'Fast P2P Stream Active...' : 'Simulate Recipient Connect (Galaxy S24 Ultra)'}
          </button>
        </div>

      </div>

      {/* Active P2P Stream Monitor */}
      {isTransferring && (
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/50 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-300 font-bold">Fast Transfer to {connectedPeer}</span>
            <span className="text-emerald-400 font-bold">{transferSpeed} MB/s</span>
          </div>

          <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-150"
              style={{ width: `${transferProgress}%` }}
            />
          </div>

          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>{transferProgress}% Transferred</span>
            <span>{selectedFile.name} ({formatBytes(selectedFile.sizeBytes)})</span>
          </div>
        </div>
      )}

      {/* Transfer Finish Notification */}
      {transferProgress === 100 && !isTransferring && (
        <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm font-bold flex items-center space-x-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div>
            <h4>Fast Share Complete!</h4>
            <p className="text-xs text-slate-300 font-mono font-normal">
              {selectedFile.name} was successfully received by peer device.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
