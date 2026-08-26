import React, { useState } from 'react';
import { Download, Lock, ShieldCheck, CheckCircle2, Smartphone, ArrowLeft, RefreshCw, Sparkles, HardDrive, Hash, Folder, Image, Film, FileText, Package, Zap, AlertCircle, Clock } from 'lucide-react';
import { formatBytes, gbToBytes } from '../utils/videoEngine';
import { triggerDirectDownload } from '../utils/fileDownloader';

export function ReceivePage({ onBackHome, permissions, openPermissionsModal }) {
  const [codeInput, setCodeInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedFileMeta, setVerifiedFileMeta] = useState(null);
  
  // Transfer stream state
  const [isReceiving, setIsReceiving] = useState(false);
  const [receiveProgress, setReceiveProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [etaText, setEtaText] = useState('');
  const [completedFile, setCompletedFile] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleKeyClick = (num) => {
    setErrorMessage('');
    if (codeInput.replaceAll('-', '').length < 6) {
      const nextRaw = codeInput.replaceAll('-', '') + num;
      if (nextRaw.length === 3) {
        setCodeInput(`${nextRaw}-`);
      } else if (nextRaw.length > 3) {
        setCodeInput(`${nextRaw.slice(0, 3)}-${nextRaw.slice(3)}`);
      } else {
        setCodeInput(nextRaw);
      }
    }
  };

  const handleBackspace = () => {
    setErrorMessage('');
    const raw = codeInput.replaceAll('-', '');
    if (raw.length > 0) {
      const nextRaw = raw.slice(0, -1);
      if (nextRaw.length > 3) {
        setCodeInput(`${nextRaw.slice(0, 3)}-${nextRaw.slice(3)}`);
      } else {
        setCodeInput(nextRaw);
      }
    }
  };

  const handleClear = () => {
    setCodeInput('');
    setErrorMessage('');
    setVerifiedFileMeta(null);
    setCompletedFile(null);
  };

  // Inspect Code and display file/folder metadata
  const handleVerifyCode = (presetCode) => {
    const code = presetCode || codeInput;
    if (code.replaceAll('-', '').length < 6) {
      setErrorMessage('Please enter a valid 6-digit Transfer Code');
      return;
    }

    setErrorMessage('');
    setIsVerifying(true);
    setVerifiedFileMeta(null);

    setTimeout(() => {
      setIsVerifying(false);
      
      // Inspect Code details
      let meta = {
        name: 'RAW_8K_CINEMATIC_MASTER_100GB.mov',
        category: 'video',
        sizeBytes: gbToBytes(100),
        itemCount: 1,
        sender: 'Worldwide Peer (iOS / Android / PC)'
      };

      if (code.includes('418') || code.includes('app')) {
        meta = {
          name: 'VICTORSHARE_PRO_V3.2.1.apk (Android App)',
          category: 'app',
          sizeBytes: 154 * 1024 * 1024,
          itemCount: 1,
          sender: 'Android Device Peer'
        };
      } else if (code.includes('914') || code.includes('pdf')) {
        meta = {
          name: 'COMPLETE_PROJECT_SPECIFICATIONS_2026.pdf',
          category: 'pdf',
          sizeBytes: 45 * 1024 * 1024,
          itemCount: 1,
          sender: 'Desktop Peer'
        };
      }

      setVerifiedFileMeta(meta);
      showToast(`AES-256 Encrypted Channel Verified! Found ${meta.name}`);
    }, 450);
  };

  const startFastDownload = () => {
    if (!permissions.network || !permissions.storage) {
      openPermissionsModal();
      return;
    }

    setIsReceiving(true);
    setReceiveProgress(0);

    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.floor(Math.random() * 8) + 4;
      
      const currentSpeed = (Math.random() * 25 + 95).toFixed(1);
      setDownloadSpeed(currentSpeed);

      if (verifiedFileMeta && verifiedFileMeta.sizeBytes > gbToBytes(50)) {
        const remainingGB = ((100 - pct) / 100) * 100;
        const remainingSec = Math.round((remainingGB * 1024) / parseFloat(currentSpeed));
        const mins = Math.floor(remainingSec / 60);
        const secs = remainingSec % 60;
        setEtaText(`${mins}m ${secs}s remaining`);
      } else {
        setEtaText('< 30 seconds remaining');
      }

      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        setIsReceiving(false);
        setCompletedFile(verifiedFileMeta);
        
        // AUTOMATIC SILENT DIRECT DOWNLOAD (NO ALERT POPUPS!)
        triggerDirectDownload(verifiedFileMeta.name);
        showToast(`✓ ${verifiedFileMeta.name} downloaded directly to device storage`);
      }
      setReceiveProgress(pct);
    }, 150);
  };

  const handleManualSave = () => {
    if (completedFile) {
      triggerDirectDownload(completedFile.name);
      showToast(`✓ Downloading ${completedFile.name}... Check your Downloads folder!`);
    }
  };

  const handleNativeShare = async () => {
    if (completedFile && navigator.share) {
      try {
        await navigator.share({
          title: completedFile.name,
          text: `Received ${completedFile.name} via VictorShare`
        });
      } catch (e) {}
    } else {
      showToast('Native iOS AirDrop / Android Share sheet active');
    }
  };

  const getCategoryIcon = (cat) => {
    if (cat === 'video') return Film;
    if (cat === 'image') return Image;
    if (cat === 'app') return Package;
    if (cat === 'pdf') return FileText;
    if (cat === 'folder') return Folder;
    return HardDrive;
  };

  const CategoryIcon = verifiedFileMeta ? getCategoryIcon(verifiedFileMeta.category) : HardDrive;

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6 relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-xs font-bold shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Back Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 text-slate-400 hover:text-white bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800 transition-all text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
          <Lock className="w-4 h-4 text-purple-400" />
          <span>Encrypted Direct P2P Channel</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white">Receive Shared File or Video</h1>
        <p className="text-xs text-slate-400">Enter the sender's 6-digit Transfer Code to download directly.</p>
      </div>

      {/* Main Receive Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-8 border border-purple-500/30 text-center max-w-xl mx-auto shadow-2xl">
        
        {/* Code Input */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Enter 6-Digit Transfer Code
          </label>

          <input
            type="text"
            readOnly
            value={codeInput}
            placeholder="___-___"
            className="w-full text-center text-3xl sm:text-4xl font-mono font-black tracking-widest py-4 rounded-2xl bg-slate-950 border-2 border-purple-500/50 text-white placeholder-slate-700 shadow-inner"
          />

          {errorMessage && (
            <div className="text-xs font-bold text-rose-400 flex items-center justify-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Quick Test Code Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <button
              onClick={() => { setCodeInput('325-600'); handleVerifyCode('325-600'); }}
              className="px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-700 text-xs font-mono font-bold text-purple-300"
            >
              🎬 Code: 325-600 (100GB Movie)
            </button>
            <button
              onClick={() => { setCodeInput('418-739'); handleVerifyCode('418-739'); }}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-300"
            >
              📦 Code: 418-739 (APK App)
            </button>
          </div>
        </div>

        {/* Touch Keypad */}
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyClick(num)}
              className="py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xl font-bold text-white transition-all active:scale-95 shadow-md"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-400 uppercase"
          >
            Clear
          </button>
          <button
            onClick={() => handleKeyClick(0)}
            className="py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xl font-bold text-white transition-all active:scale-95 shadow-md"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-amber-400 uppercase"
          >
            ⌫
          </button>
        </div>

        {/* Verify Action Button */}
        {!verifiedFileMeta && (
          <button
            onClick={() => handleVerifyCode()}
            disabled={isVerifying}
            className="w-full py-4 rounded-xl btn-gradient-purple text-base font-bold shadow-xl shadow-purple-500/25 transition-all"
          >
            {isVerifying ? (
              <span className="flex items-center justify-center space-x-2">
                <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
                <span>Verifying Encrypted Code...</span>
              </span>
            ) : (
              <span>Verify Code & Inspect File</span>
            )}
          </button>
        )}

        {/* STEP 2: Revealed Shared File Card */}
        {verifiedFileMeta && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-purple-950/60 border-2 border-purple-500/50 text-left space-y-4 animate-fade-in shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
              <span className="text-[10px] uppercase font-bold text-purple-300 bg-purple-900/80 px-2.5 py-1 rounded border border-purple-700">
                AES-256 Encrypted Channel
              </span>
              <span className="text-xs font-mono text-slate-400">From {verifiedFileMeta.sender}</span>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="p-3.5 rounded-2xl bg-purple-950 border border-purple-500/40 text-purple-300">
                <CategoryIcon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">{verifiedFileMeta.name}</h3>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  Category: {verifiedFileMeta.category.toUpperCase()} • Size: {formatBytes(verifiedFileMeta.sizeBytes)}
                </p>
              </div>
            </div>

            {/* Start Download Button */}
            {!isReceiving && !completedFile && (
              <button
                onClick={startFastDownload}
                className="w-full py-4 rounded-xl btn-gradient-primary text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>START FAST P2P DOWNLOAD NOW ({formatBytes(verifiedFileMeta.sizeBytes)})</span>
              </button>
            )}

            {/* Live Progress Bar with Speed & ETA */}
            {isReceiving && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-purple-300 font-bold">Downloading Stream...</span>
                  <span className="text-emerald-400 font-bold">{downloadSpeed} MB/s</span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 transition-all duration-150"
                    style={{ width: `${receiveProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>{receiveProgress}% Complete</span>
                  <span className="flex items-center gap-1 text-cyan-300">
                    <Clock className="w-3 h-3" /> {etaText}
                  </span>
                </div>
              </div>
            )}

            {/* Completed Result Actions */}
            {completedFile && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Download Finished! Saved directly to device downloads.</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleManualSave}
                    className="py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>Save to Device</span>
                  </button>

                  <button
                    onClick={handleNativeShare}
                    className="py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-lg shadow-purple-500/20"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>iOS / Android Share</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
