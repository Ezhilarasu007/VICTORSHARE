import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Upload, HardDrive, Lock, ShieldCheck, Copy, Check, Radio, Send, CheckCircle2, RefreshCw, Smartphone, ArrowLeft, Sparkles, Folder, Image, Film, FileText, Package, Globe, Clock } from 'lucide-react';
import { formatBytes, gbToBytes } from '../utils/videoEngine';

export function SendPage({ onBackHome, permissions, openPermissionsModal }) {
  // File state (Supports Videos 10MB - 100GB, Photos, APK Apps, PDFs, Folders)
  const [selectedFile, setSelectedFile] = useState({
    name: '🎬 RAW_8K_CINEMATIC_MASTER_100GB.mov',
    category: 'video', // 'video' | 'image' | 'app' | 'pdf' | 'folder'
    sizeBytes: gbToBytes(100),
    itemCount: 1,
    isDemo: true
  });

  // Auto-Generated Transfer Code (Sender NEVER types a code — code is auto-shown upon upload!)
  const [transferCode, setTransferCode] = useState('325-600');
  const [timeLeft, setTimeLeft] = useState(120);
  const [isCopied, setIsCopied] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  // Active P2P Stream State
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);
  const [transferSpeed, setTransferSpeed] = useState(0);
  const [connectedPeer, setConnectedPeer] = useState(null);

  // Generate new 6-digit code
  const generateNewTransferCode = () => {
    const c1 = Math.floor(100 + Math.random() * 900);
    const c2 = Math.floor(100 + Math.random() * 900);
    const newCode = `${c1}-${c2}`;
    setTransferCode(newCode);
    setTimeLeft(120);
  };

  // Auto-countdown timer for code security
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          generateNewTransferCode();
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
        let total = 0;
        for (let i = 0; i < files.length; i++) total += files[i].size;
        setSelectedFile({
          name: `📁 Shared_Folder_Bundle (${files.length} items)`,
          category: 'folder',
          sizeBytes: total,
          itemCount: files.length,
          isDemo: false
        });
      } else {
        const file = files[0];
        let category = 'document';
        if (file.type.startsWith('video')) category = 'video';
        else if (file.type.startsWith('image')) category = 'image';
        else if (file.name.endsWith('.apk')) category = 'app';
        else if (file.name.endsWith('.pdf')) category = 'pdf';

        setSelectedFile({
          name: file.name,
          category,
          sizeBytes: file.size,
          itemCount: 1,
          isDemo: false,
          rawFile: file
        });
      }

      setIsTransferring(false);
      setTransferProgress(0);
      generateNewTransferCode(); // Automatically show fresh code upon upload!
    }
  };

  const loadSamplePreset = (type) => {
    if (type === '100gb-video') {
      setSelectedFile({
        name: '🎬 RAW_8K_CINEMATIC_MASTER_100GB.mov',
        category: 'video',
        sizeBytes: gbToBytes(100),
        itemCount: 1,
        isDemo: true
      });
    } else if (type === 'apk-app') {
      setSelectedFile({
        name: '📦 VICTORSHARE_PRO_V3.2.1.apk (Android App)',
        category: 'app',
        sizeBytes: 154 * 1024 * 1024,
        itemCount: 1,
        isDemo: true
      });
    } else if (type === 'pdf-doc') {
      setSelectedFile({
        name: '📄 COMPLETE_PROJECT_SPECIFICATIONS_2026.pdf',
        category: 'pdf',
        sizeBytes: 45 * 1024 * 1024,
        itemCount: 1,
        isDemo: true
      });
    } else if (type === 'photos') {
      setSelectedFile({
        name: '📸 ULTRA_HD_PHOTO_GALLERY (250 Photos)',
        category: 'image',
        sizeBytes: gbToBytes(1.2),
        itemCount: 250,
        isDemo: true
      });
    }

    setIsTransferring(false);
    setTransferProgress(0);
    generateNewTransferCode();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(transferCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCopyLink = () => {
    const link = `https://victorshare.vercel.app/receive?code=${transferCode.replace('-', '')}`;
    navigator.clipboard.writeText(link);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const simulateRecipientConnect = (peerName = 'Friend Device (iOS / Android / PC)') => {
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
      setTransferSpeed((Math.random() * 25 + 95).toFixed(1));
    }, 150);
  };

  const getCategoryIcon = (cat) => {
    if (cat === 'video') return Film;
    if (cat === 'image') return Image;
    if (cat === 'app') return Package;
    if (cat === 'pdf') return FileText;
    if (cat === 'folder') return Folder;
    return HardDrive;
  };

  const CategoryIcon = getCategoryIcon(selectedFile.category);

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 text-slate-400 hover:text-white bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800 transition-all text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
          <Lock className="w-4 h-4 text-cyan-400" />
          <span>AES-256 Encrypted Worldwide Direct Stream</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Upload Any File or Video <span className="text-gradient-cyan">(10MB to 100GB)</span>
        </h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Upload Videos, Photos, Apps, PDFs, or Folders. Your secure transfer code automatically generates instantly.
        </p>
      </div>

      {/* STEP 1: Big Tap to Upload Dropzone */}
      <div className="glass-panel p-8 rounded-3xl border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 text-center space-y-6 transition-all relative shadow-2xl">
        
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
          <h2 className="text-2xl font-black text-white">Tap to Upload File, Video, Photo, App or PDF</h2>
          <p className="text-xs text-slate-300">
            Supports 10MB up to 100GB files. 100% Private, Client-Side End-to-End Encryption.
          </p>
        </div>

        {/* Selected File Card Badge */}
        {selectedFile && (
          <div className="inline-flex items-center space-x-3.5 px-6 py-3.5 rounded-2xl bg-slate-950 border-2 border-cyan-500/50 text-xs font-bold text-white shadow-2xl z-20 relative">
            <CategoryIcon className="w-6 h-6 text-cyan-400 flex-shrink-0" />
            <div className="text-left">
              <div className="font-black text-cyan-300 truncate max-w-sm text-sm">{selectedFile.name}</div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Category: {selectedFile.category.toUpperCase()} • Size: {formatBytes(selectedFile.sizeBytes)}
              </div>
            </div>
          </div>
        )}

        {/* Category Presets for Quick Testing */}
        <div className="pt-2 z-20 relative flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => loadSamplePreset('100gb-video')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
          >
            🎬 100GB 8K Video
          </button>
          <button
            type="button"
            onClick={() => loadSamplePreset('apk-app')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
          >
            📦 Android APK App
          </button>
          <button
            type="button"
            onClick={() => loadSamplePreset('pdf-doc')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
          >
            📄 PDF Document
          </button>
          <button
            type="button"
            onClick={() => loadSamplePreset('photos')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
          >
            📸 Photo Gallery
          </button>
        </div>

      </div>

      {/* STEP 2: AUTO-GENERATED TRANSFER CODE (NO PERSONAL CODE ENTERING REQUIRED BY SENDER!) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Auto-Displayed Transfer Code */}
        <div className="glass-card p-6 rounded-3xl space-y-6 text-center border border-cyan-500/40 relative shadow-2xl">
          
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/50 text-[10px] font-mono font-bold text-cyan-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Expires in {timeLeft}s (Auto-Refreshes)</span>
            </div>

            <h3 className="text-xl font-black text-white mt-3">Auto-Generated Transfer Code</h3>
            <p className="text-xs text-slate-400">Your friend or recipient enters this code on their device to download.</p>
          </div>

          {/* Huge Code Display */}
          <div className="p-6 rounded-2xl bg-slate-950 border-2 border-cyan-500/60 space-y-3 shadow-inner">
            <div className="font-mono text-5xl font-black text-gradient-cyan tracking-widest">
              {transferCode}
            </div>

            <div className="flex items-center justify-center space-x-2 pt-1">
              <button
                onClick={handleCopyCode}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 flex items-center space-x-1.5 transition-all"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                <span>{isCopied ? 'Code Copied!' : 'Copy Code'}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700 text-xs font-bold text-purple-300 flex items-center space-x-1.5 transition-all"
              >
                {isLinkCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Globe className="w-4 h-4 text-purple-400" />}
                <span>{isLinkCopied ? 'Share Link Copied!' : 'Copy Share Link'}</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-500">
            No personal code entry required • 100% Encrypted & Anonymous
          </div>

        </div>

        {/* Right: QR Code Scanner & Recipient Connection Listener */}
        <div className="glass-card p-6 rounded-3xl space-y-6 text-center border border-slate-800 shadow-2xl">
          <div>
            <h3 className="text-xl font-black text-white">QR Code Mobile Pair</h3>
            <p className="text-xs text-slate-400">Scan with iPhone Camera or Android QR Reader</p>
          </div>

          <div className="inline-block p-4 rounded-2xl bg-white shadow-2xl border-4 border-cyan-400">
            <QRCodeSVG
              value={`https://victorshare.vercel.app/receive?code=${transferCode.replace('-', '')}`}
              size={150}
              level="H"
              includeMargin={true}
            />
          </div>

          <button
            onClick={() => simulateRecipientConnect('Friend Device (iOS / Android / PC)')}
            disabled={isTransferring}
            className="w-full py-3.5 rounded-xl btn-gradient-primary text-xs font-bold shadow-lg shadow-cyan-500/20"
          >
            {isTransferring ? 'Fast Encrypted Stream Active...' : 'Simulate Friend Connecting with Code'}
          </button>
        </div>

      </div>

      {/* Active P2P Stream Progress Monitor */}
      {isTransferring && (
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/50 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-300 font-bold">Streaming to {connectedPeer}</span>
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
            <h4>File Delivered Worldwide!</h4>
            <p className="text-xs text-slate-300 font-mono font-normal">
              {selectedFile.name} was successfully received.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
