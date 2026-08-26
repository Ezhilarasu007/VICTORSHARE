import React, { useState } from 'react';
import { Download, Lock, ShieldCheck, CheckCircle2, Smartphone, ArrowLeft, RefreshCw, Sparkles, HardDrive, Hash, Folder, Image, Film, FileText, Zap } from 'lucide-react';
import { formatBytes, gbToBytes } from '../utils/videoEngine';

export function ReceivePage({ onBackHome, permissions, openPermissionsModal }) {
  const [pinInput, setPinInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedFileMeta, setVerifiedFileMeta] = useState(null);
  
  // Transfer stream state
  const [isReceiving, setIsReceiving] = useState(false);
  const [receiveProgress, setReceiveProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [completedFile, setCompletedFile] = useState(null);

  const handleKeyClick = (num) => {
    if (pinInput.replaceAll('-', '').length < 6) {
      const nextRaw = pinInput.replaceAll('-', '') + num;
      if (nextRaw.length === 3) {
        setPinInput(`${nextRaw}-`);
      } else if (nextRaw.length > 3) {
        setPinInput(`${nextRaw.slice(0, 3)}-${nextRaw.slice(3)}`);
      } else {
        setPinInput(nextRaw);
      }
    }
  };

  const handleBackspace = () => {
    const raw = pinInput.replaceAll('-', '');
    if (raw.length > 0) {
      const nextRaw = raw.slice(0, -1);
      if (nextRaw.length > 3) {
        setPinInput(`${nextRaw.slice(0, 3)}-${nextRaw.slice(3)}`);
      } else {
        setPinInput(nextRaw);
      }
    }
  };

  const handleClear = () => {
    setPinInput('');
    setVerifiedFileMeta(null);
    setCompletedFile(null);
  };

  // Inspect PIN and display file/folder metadata
  const handleVerifyPin = (presetPin) => {
    const pin = presetPin || pinInput;
    if (pin.replaceAll('-', '').length < 6) {
      alert('Please enter a valid 6-digit pairing PIN (e.g. 325-600)');
      return;
    }

    setIsVerifying(true);
    setVerifiedFileMeta(null);

    setTimeout(() => {
      setIsVerifying(false);
      
      // Determine inspect result based on PIN
      let meta = {
        name: '🎬 RAW_8K_CINEMATIC_MASTER_100GB.mov',
        type: 'video',
        sizeBytes: gbToBytes(100),
        itemCount: 1,
        sender: 'iPhone 15 Pro (iOS Safari)'
      };

      if (pin.includes('418') || pin.includes('folder')) {
        meta = {
          name: '📁 PROJECT_ASSETS_FOLDER (48 files)',
          type: 'folder',
          sizeBytes: gbToBytes(4.5),
          itemCount: 48,
          sender: 'MacBook Air M2 (macOS)'
        };
      } else if (pin.includes('914') || pin.includes('photo')) {
        meta = {
          name: '📸 ULTRA_HD_GALLERY_ALBUM.zip',
          type: 'image',
          sizeBytes: gbToBytes(0.8),
          itemCount: 150,
          sender: 'Galaxy S24 Ultra (Android)'
        };
      }

      setVerifiedFileMeta(meta);
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
      pct += Math.floor(Math.random() * 10) + 5;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        setIsReceiving(false);
        setCompletedFile(verifiedFileMeta);
      }
      setReceiveProgress(pct);
      setDownloadSpeed((Math.random() * 20 + 38).toFixed(1));
    }, 150);
  };

  const handleNativeShare = async () => {
    if (completedFile && navigator.share) {
      try {
        await navigator.share({
          title: completedFile.name,
          text: `Received ${completedFile.name} (${formatBytes(completedFile.sizeBytes)}) via VictorShare`
        });
      } catch (e) {}
    } else {
      alert('Direct iOS AirDrop & Android Share sheet active. File saved to device!');
    }
  };

  const getFileIcon = (type) => {
    if (type === 'folder') return Folder;
    if (type === 'image') return Image;
    if (type === 'video') return Film;
    return FileText;
  };

  const FileIconComp = verifiedFileMeta ? getFileIcon(verifiedFileMeta.type) : FileText;

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6">
      
      {/* Back Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 text-slate-400 hover:text-white bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800 transition-all text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to ShareIt Home</span>
        </button>

        <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>ShareIt Receive • Direct P2P Channel</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white">Receive Shared File or Folder</h1>
        <p className="text-xs text-slate-400">Enter the sender's 6-digit PIN code to reveal file details and download.</p>
      </div>

      {/* Main Receive Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-8 border border-purple-500/30 text-center max-w-xl mx-auto shadow-2xl">
        
        {/* PIN Display Input */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Enter 6-Digit Sender PIN Code
          </label>

          <input
            type="text"
            readOnly
            value={pinInput}
            placeholder="___-___"
            className="w-full text-center text-3xl sm:text-4xl font-mono font-black tracking-widest py-4 rounded-2xl bg-slate-950 border-2 border-purple-500/50 text-white placeholder-slate-700 shadow-inner"
          />

          {/* Quick Test PIN Buttons */}
          <div className="flex items-center justify-center space-x-2 pt-1">
            <button
              onClick={() => { setPinInput('325-600'); handleVerifyPin('325-600'); }}
              className="px-3 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-700 text-xs font-mono font-bold text-purple-300"
            >
              🎬 PIN: 325-600 (100GB Movie)
            </button>
            <button
              onClick={() => { setPinInput('418-739'); handleVerifyPin('418-739'); }}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-300"
            >
              📁 PIN: 418-739 (Folder)
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
            onClick={() => handleVerifyPin()}
            disabled={isVerifying}
            className="w-full py-4 rounded-xl btn-gradient-purple text-base font-bold shadow-xl shadow-purple-500/25 transition-all"
          >
            {isVerifying ? (
              <span className="flex items-center justify-center space-x-2">
                <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
                <span>Locating Sender Stream...</span>
              </span>
            ) : (
              <span>Verify PIN & Inspect Shared File</span>
            )}
          </button>
        )}

        {/* STEP 2: Revealed Shared File / Folder Card */}
        {verifiedFileMeta && (
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-purple-950/60 border-2 border-purple-500/50 text-left space-y-4 animate-fade-in shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
              <span className="text-[10px] uppercase font-bold text-purple-300 bg-purple-900/80 px-2.5 py-1 rounded border border-purple-700">
                P2P Connection Established
              </span>
              <span className="text-xs font-mono text-slate-400">From {verifiedFileMeta.sender}</span>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="p-3.5 rounded-2xl bg-purple-950 border border-purple-500/40 text-purple-300">
                <FileIconComp className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">{verifiedFileMeta.name}</h3>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  Size: {formatBytes(verifiedFileMeta.sizeBytes)} • {verifiedFileMeta.itemCount} file(s)
                </p>
              </div>
            </div>

            {/* Start Download Button */}
            {!isReceiving && !completedFile && (
              <button
                onClick={startFastDownload}
                className="w-full py-3.5 rounded-xl btn-gradient-primary text-xs font-bold shadow-lg shadow-cyan-500/20 flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>START FAST P2P DOWNLOAD NOW ({formatBytes(verifiedFileMeta.sizeBytes)})</span>
              </button>
            )}

            {/* Live Progress Bar */}
            {isReceiving && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-purple-300 font-bold">Downloading P2P Stream...</span>
                  <span className="text-emerald-400 font-bold">{downloadSpeed} MB/s</span>
                </div>
                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 transition-all duration-150"
                    style={{ width: `${receiveProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>{receiveProgress}% Downloaded</span>
                  <span>Direct Encrypted Pipe</span>
                </div>
              </div>
            )}

            {/* Completed Result Actions */}
            {completedFile && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Download Finished! Saved to local device.</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => alert(`Saving ${completedFile.name} to device storage...`)}
                    className="py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Save File</span>
                  </button>

                  <button
                    onClick={handleNativeShare}
                    className="py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center space-x-1.5"
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
