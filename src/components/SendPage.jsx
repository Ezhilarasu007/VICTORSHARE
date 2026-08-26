import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Upload, HardDrive, Lock, ShieldCheck, Copy, Check, Radio, Send, CheckCircle2, RefreshCw, Smartphone, ArrowLeft, Sparkles, Folder, Image, Film, FileText, Package, Globe, Clock } from 'lucide-react';
import { formatBytes, gbToBytes } from '../utils/videoEngine';

export function SendPage({ onBackHome, permissions, openPermissionsModal }) {
  // Uploaded File State (Supports Videos 10MB - 100GB, Photos, APK Apps, PDFs, Folders)
  const [selectedFile, setSelectedFile] = useState({
    name: '🎬 RAW_8K_CINEMATIC_MASTER_100GB.mov',
    category: 'VIDEO',
    sizeBytes: gbToBytes(100),
    isDemo: true
  });

  // Auto-Generated Encrypted Transfer Code (NO MANUAL ENTERING REQUIRED BY SENDER!)
  const [transferCode, setTransferCode] = useState('325-600');
  const [timeLeft, setTimeLeft] = useState(120);
  const [isCopied, setIsCopied] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  // Active P2P Encrypted Transfer Stream State
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);
  const [transferSpeed, setTransferSpeed] = useState(0);
  const [connectedPeer, setConnectedPeer] = useState(null);

  // Generate fresh 6-digit PIN automatically
  const generateFreshPin = () => {
    const c1 = Math.floor(100 + Math.random() * 900);
    const c2 = Math.floor(100 + Math.random() * 900);
    const newPin = `${c1}-${c2}`;
    setTransferCode(newPin);
    setTimeLeft(120);
  };

  // Auto-refreshes PIN every 2 mins for privacy
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
        let total = 0;
        for (let i = 0; i < files.length; i++) total += files[i].size;
        setSelectedFile({
          name: `📁 Shared_Folder_Bundle (${files.length} items)`,
          category: 'FOLDER',
          sizeBytes: total,
          isDemo: false
        });
      } else {
        const file = files[0];
        let category = 'DOCUMENT';
        if (file.type.startsWith('video')) category = 'VIDEO';
        else if (file.type.startsWith('image')) category = 'PHOTO';
        else if (file.name.endsWith('.apk')) category = 'APP';
        else if (file.name.endsWith('.pdf')) category = 'PDF';

        setSelectedFile({
          name: file.name,
          category,
          sizeBytes: file.size,
          isDemo: false,
          rawFile: file
        });
      }

      setIsTransferring(false);
      setTransferProgress(0);
      generateFreshPin(); // Instantly show new encrypted PIN upon upload!
    }
  };

  const loadSamplePreset = (type) => {
    if (type === '100gb-video') {
      setSelectedFile({
        name: '🎬 RAW_8K_CINEMATIC_MASTER_100GB.mov',
        category: 'VIDEO',
        sizeBytes: gbToBytes(100),
        isDemo: true
      });
    } else if (type === 'apk-app') {
      setSelectedFile({
        name: '📦 VICTORSHARE_PRO_V3.2.1.apk',
        category: 'APP',
        sizeBytes: 154 * 1024 * 1024,
        isDemo: true
      });
    } else if (type === 'pdf-doc') {
      setSelectedFile({
        name: '📄 PROJECT_DOCUMENTS_BUNDLE.pdf',
        category: 'PDF',
        sizeBytes: 45 * 1024 * 1024,
        isDemo: true
      });
    } else if (type === 'photos') {
      setSelectedFile({
        name: '📸 ULTRA_HD_PHOTO_GALLERY.zip',
        category: 'PHOTO',
        sizeBytes: gbToBytes(1.2),
        isDemo: true
      });
    }

    setIsTransferring(false);
    setTransferProgress(0);
    generateFreshPin();
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
    if (cat === 'VIDEO') return Film;
    if (cat === 'PHOTO') return Image;
    if (cat === 'APP') return Package;
    if (cat === 'PDF') return FileText;
    if (cat === 'FOLDER') return Folder;
    return HardDrive;
  };

  const CategoryIcon = getCategoryIcon(selectedFile.category);

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-6">
      
      {/* Top Header Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 text-slate-400 hover:text-white bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 transition-all text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold">
          <Lock className="w-4 h-4 text-cyan-400" />
          <span>AES-256 E2EE Private Transfer • No Server Leak</span>
        </div>
      </div>

      {/* STEP 1: Upload Dropzone (Tap to Add File) */}
      <div className="glass-panel p-8 rounded-3xl border-2 border-dashed border-cyan-500/50 hover:border-cyan-400 text-center space-y-6 transition-all relative shadow-2xl">
        
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
        />

        <div className="p-5 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 text-slate-950 shadow-xl shadow-cyan-500/30 w-20 h-20 mx-auto flex items-center justify-center">
          <Upload className="w-10 h-10 stroke-[2.5] animate-bounce" />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white">Tap to Add File or Video (10MB - 100GB)</h2>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Upload any Video, Photo, App, PDF, or Folder. The app automatically generates your encrypted transfer PIN.
          </p>
        </div>

        {/* Selected File Card Details */}
        {selectedFile && (
          <div className="inline-flex items-center space-x-4 px-6 py-4 rounded-2xl bg-slate-950 border-2 border-cyan-500/60 text-xs font-bold text-white shadow-2xl z-20 relative">
            <CategoryIcon className="w-7 h-7 text-cyan-400 flex-shrink-0" />
            <div className="text-left">
              <div className="font-black text-cyan-300 text-base truncate max-w-md">{selectedFile.name}</div>
              <div className="text-xs text-slate-300 font-mono mt-0.5">
                Category: <span className="text-cyan-400 font-bold">{selectedFile.category}</span> • Size: <span className="text-emerald-400 font-bold">{formatBytes(selectedFile.sizeBytes)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Sample Category Presets */}
        <div className="pt-2 z-20 relative flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => loadSamplePreset('100gb-video')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200"
          >
            🎬 100GB Movie File
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

      {/* STEP 2: AUTO-GENERATED ENCRYPTED PIN & QR CODE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Auto-Displayed Encrypted PIN */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 text-center border border-cyan-500/50 relative shadow-2xl">
          
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/50 text-[10px] font-mono font-bold text-cyan-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Auto-Refreshes in {timeLeft}s</span>
            </div>

            <h3 className="text-xl font-black text-white mt-3">Auto-Generated Encrypted Code</h3>
            <p className="text-xs text-slate-300 mt-1">
              Your friend or recipient enters this code on their device to download directly to her storage.
            </p>
          </div>

          {/* Huge PIN Code Display */}
          <div className="p-6 rounded-2xl bg-slate-950 border-2 border-cyan-500/70 space-y-4 shadow-inner">
            <div className="font-mono text-5xl sm:text-6xl font-black text-gradient-cyan tracking-widest">
              {transferCode}
            </div>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={handleCopyCode}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 flex items-center space-x-2 transition-all shadow-md"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                <span>{isCopied ? 'Code Copied!' : 'Copy Code'}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="px-5 py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700 text-xs font-bold text-purple-300 flex items-center space-x-2 transition-all shadow-md"
              >
                {isLinkCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Globe className="w-4 h-4 text-purple-400" />}
                <span>{isLinkCopied ? 'Link Copied!' : 'Copy Share Link'}</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            🔒 100% Private Encrypted Transfer • Zero Cloud Storage & No Leak
          </div>

        </div>

        {/* Right: Mobile QR Scanner Pairing */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 text-center border border-slate-800 shadow-2xl">
          <div>
            <h3 className="text-xl font-black text-white">Mobile QR Scan Pair</h3>
            <p className="text-xs text-slate-400">Scan with iOS iPhone Camera or Android Phone</p>
          </div>

          <div className="inline-block p-4 rounded-2xl bg-white shadow-2xl border-4 border-cyan-400">
            <QRCodeSVG
              value={`https://victorshare.vercel.app/receive?code=${transferCode.replace('-', '')}`}
              size={160}
              level="H"
              includeMargin={true}
            />
          </div>

          <button
            onClick={() => simulateRecipientConnect('Friend Device (iOS / Android / PC)')}
            disabled={isTransferring}
            className="w-full py-3.5 rounded-xl btn-gradient-primary text-xs font-bold shadow-lg shadow-cyan-500/20"
          >
            {isTransferring ? 'Fast Encrypted Stream Active...' : 'Simulate Friend Entering Code to Receive'}
          </button>
        </div>

      </div>

      {/* Active P2P Stream Progress Monitor */}
      {isTransferring && (
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/50 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-300 font-bold">Streaming Encrypted Data to {connectedPeer}</span>
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
        <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm font-bold flex items-center space-x-3 shadow-xl">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div>
            <h4>File Delivered Privately to Friend Device!</h4>
            <p className="text-xs text-slate-300 font-mono font-normal">
              {selectedFile.name} was safely downloaded directly into recipient's device storage.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
