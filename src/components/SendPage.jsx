import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Upload, HardDrive, Lock, ShieldCheck, Copy, Check, Radio, Send, CheckCircle2, RefreshCw, Smartphone, ArrowLeft, Sparkles } from 'lucide-react';
import { formatBytes, gbToBytes } from '../utils/videoEngine';

export function SendPage({ onBackHome, permissions, openPermissionsModal }) {
  const [selectedFile, setSelectedFile] = useState({
    name: 'RAW_8K_CINEMATIC_MASTER_100GB.mov',
    sizeBytes: gbToBytes(100),
    isDemo: true
  });

  const [pairingPin, setPairingPin] = useState('325-600');
  const [isCopied, setIsCopied] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);
  const [transferSpeed, setTransferSpeed] = useState(0);
  const [connectedPeer, setConnectedPeer] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        sizeBytes: file.size,
        isDemo: false,
        rawFile: file
      });
      setIsTransferring(false);
      setTransferProgress(0);
    }
  };

  const loadSampleFile = (gbSize, name) => {
    setSelectedFile({
      name: name || `SAMPLE_VIDEO_${gbSize}GB.mp4`,
      sizeBytes: gbToBytes(gbSize),
      isDemo: true
    });
    setIsTransferring(false);
    setTransferProgress(0);
  };

  const handleGenerateNewPin = () => {
    const p1 = Math.floor(100 + Math.random() * 900);
    const p2 = Math.floor(100 + Math.random() * 900);
    setPairingPin(`${p1}-${p2}`);
  };

  const handleCopyPin = () => {
    navigator.clipboard.writeText(pairingPin);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const simulateRecipientConnect = (peerName = 'iPhone 15 Pro (iOS)') => {
    if (!permissions.network || !permissions.storage) {
      openPermissionsModal();
      return;
    }

    setConnectedPeer(peerName);
    setIsTransferring(true);
    setTransferProgress(0);

    let progressVal = 0;
    const timer = setInterval(() => {
      progressVal += Math.floor(Math.random() * 8) + 4;
      if (progressVal >= 100) {
        progressVal = 100;
        clearInterval(timer);
        setIsTransferring(false);
      }
      setTransferProgress(progressVal);
      setTransferSpeed((Math.random() * 20 + 35).toFixed(1));
    }, 150);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto px-4 py-6">
      
      {/* Top Back Navigation & Security Badge */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 text-slate-400 hover:text-white bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800 transition-all text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>AES-256 E2EE Private Channel</span>
        </div>
      </div>

      {/* Upload Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white">Send File (10MB up to 100GB)</h1>
        <p className="text-xs text-slate-400">Upload your file to generate your 6-digit pairing PIN code.</p>
      </div>

      {/* Step 1: Big Tap to Upload Dropzone */}
      <div className="glass-panel p-8 rounded-3xl border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 text-center space-y-6 transition-all relative">
        
        <input
          type="file"
          onChange={handleFileUpload}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
        />

        <div className="p-5 rounded-3xl bg-cyan-950/60 border border-cyan-500/40 w-20 h-20 mx-auto flex items-center justify-center shadow-xl shadow-cyan-500/20">
          <Upload className="w-10 h-10 text-cyan-400 animate-bounce" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-white">Tap to Upload File</h2>
          <p className="text-xs text-slate-400">Supports Video, Archives, Images, and Documents from 10MB to 100GB</p>
        </div>

        {/* Selected File Details */}
        {selectedFile && (
          <div className="inline-flex items-center space-x-3 px-5 py-2.5 rounded-2xl bg-slate-900 border border-cyan-500/50 text-xs font-mono font-bold text-cyan-300 z-20 relative">
            <HardDrive className="w-4 h-4 text-cyan-400" />
            <span>{selectedFile.name}</span>
            <span className="text-white bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              {formatBytes(selectedFile.sizeBytes)}
            </span>
          </div>
        )}

        {/* Quick Sample File Switcher */}
        <div className="pt-2 z-20 relative flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => loadSampleFile(100, 'RAW_8K_CINEMATIC_MASTER_100GB.mov')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] font-bold text-slate-300"
          >
            Load 100GB Demo File
          </button>
          <button
            type="button"
            onClick={() => loadSampleFile(10, '4K_FOOTAGE_10GB.mp4')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] font-bold text-slate-300"
          >
            Load 10GB File
          </button>
          <button
            type="button"
            onClick={() => loadSampleFile(0.01, 'COMPRESSED_10MB_VIDEO.mp4')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] font-bold text-slate-300"
          >
            Load 10MB File
          </button>
        </div>

      </div>

      {/* Step 2: Generated 6-Digit PIN & Pairing Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: PIN Code Display */}
        <div className="glass-card p-6 rounded-3xl space-y-6 text-center border border-cyan-500/30">
          <div>
            <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-950 rounded-full border border-cyan-800">
              Share This PIN Code
            </span>
            <h3 className="text-lg font-bold text-white mt-2">6-Digit Pairing PIN</h3>
            <p className="text-xs text-slate-400">Recipient enters this PIN on their device to download.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="font-mono text-4xl font-black text-gradient-cyan tracking-widest">
              {pairingPin}
            </div>

            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={handleCopyPin}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 flex items-center space-x-1.5"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{isCopied ? 'PIN Copied!' : 'Copy PIN'}</span>
              </button>

              <button
                onClick={handleGenerateNewPin}
                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-400 hover:text-white"
                title="Refresh PIN"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-500">
            PIN valid for current session • No server logs
          </div>
        </div>

        {/* Right: QR Code & Active Recipient Listener */}
        <div className="glass-card p-6 rounded-3xl space-y-6 text-center border border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white">Scan QR Code or Test Transfer</h3>
            <p className="text-xs text-slate-400">Mobile camera scan or simulate connected recipient</p>
          </div>

          {/* QR Code */}
          <div className="inline-block p-4 rounded-2xl bg-white shadow-2xl border-4 border-cyan-400">
            <QRCodeSVG
              value={`https://victorshare.vercel.app/receive?pin=${pairingPin.replace('-', '')}`}
              size={150}
              level="H"
              includeMargin={true}
            />
          </div>

          {/* Recipient Status / Trigger button */}
          <div className="space-y-3">
            <button
              onClick={() => simulateRecipientConnect('iPhone 15 Pro (iOS Safari)')}
              disabled={isTransferring}
              className="w-full py-3 rounded-xl btn-gradient-primary text-xs font-bold shadow-lg shadow-cyan-500/20"
            >
              {isTransferring ? 'Transferring File...' : 'Simulate Recipient Connect (iPhone 15 Pro)'}
            </button>
          </div>
        </div>

      </div>

      {/* Active Transfer Stream Progress Bar */}
      {isTransferring && (
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/40 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-cyan-300 font-bold">Transferring to {connectedPeer}...</span>
            <span className="text-emerald-400 font-bold">{transferSpeed} MB/s</span>
          </div>

          <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-150"
              style={{ width: `${transferProgress}%` }}
            />
          </div>

          <div className="flex justify-between text-xs font-mono text-slate-400">
            <span>Progress: {transferProgress}%</span>
            <span>File: {selectedFile ? formatBytes(selectedFile.sizeBytes) : '100 GB'}</span>
          </div>
        </div>
      )}

      {/* Completion Notification */}
      {transferProgress === 100 && !isTransferring && (
        <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm font-bold flex items-center space-x-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div>
            <h4>File Sent Successfully!</h4>
            <p className="text-xs text-slate-300 font-mono font-normal">
              Recipient safely downloaded {selectedFile ? formatBytes(selectedFile.sizeBytes) : '100GB'}.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
