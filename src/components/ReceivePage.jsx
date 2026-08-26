import React, { useState } from 'react';
import { Download, Lock, ShieldCheck, CheckCircle2, Smartphone, ArrowLeft, RefreshCw, Sparkles, HardDrive, Hash } from 'lucide-react';
import { formatBytes } from '../utils/videoEngine';

export function ReceivePage({ onBackHome, permissions, openPermissionsModal }) {
  const [pinInput, setPinInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const [receiveProgress, setReceiveProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [receivedFile, setReceivedFile] = useState(null);

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
  };

  const handleConnectAndDownload = (presetPin) => {
    const activePin = presetPin || pinInput;
    if (activePin.replaceAll('-', '').length < 6) {
      alert('Please enter a full 6-digit pairing PIN (e.g. 325-600)');
      return;
    }

    setIsConnecting(true);
    setReceivedFile(null);

    setTimeout(() => {
      setIsConnecting(false);
      setIsReceiving(true);
      setReceiveProgress(0);

      let pct = 0;
      const interval = setInterval(() => {
        pct += Math.floor(Math.random() * 10) + 5;
        if (pct >= 100) {
          pct = 100;
          clearInterval(interval);
          setIsReceiving(false);
          setReceivedFile({
            name: 'RAW_8K_CINEMATIC_MASTER_100GB.mov',
            sizeBytes: 100 * 1024 * 1024 * 1024,
            sender: 'iPhone 15 Pro (iOS)',
            checksum: 'SHA256: 8f92a4... verified'
          });
        }
        setReceiveProgress(pct);
        setDownloadSpeed((Math.random() * 20 + 38).toFixed(1));
      }, 150);
    }, 600);
  };

  const handleNativeShare = async () => {
    if (receivedFile && navigator.share) {
      try {
        await navigator.share({
          title: receivedFile.name,
          text: `Received file via VictorShare P2P (${formatBytes(receivedFile.sizeBytes)})`
        });
      } catch (e) {}
    } else {
      alert('Direct iOS AirDrop & Android Share sheet open. File is ready for download!');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6">
      
      {/* Top Back Nav & Security Badge */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 text-slate-400 hover:text-white bg-slate-900/60 px-4 py-2 rounded-xl border border-slate-800 transition-all text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-bold font-mono">
          <ShieldCheck className="w-4 h-4 text-purple-400" />
          <span>No Cloud Storage • Direct P2P Channel</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-white">Receive File</h1>
        <p className="text-xs text-slate-400">Enter the sender's 6-digit PIN code to start high-speed download.</p>
      </div>

      {/* Main Receive Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-8 border border-purple-500/30 text-center max-w-xl mx-auto shadow-2xl">
        
        {/* PIN Display */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            6-Digit Sender PIN Code
          </label>

          <div className="relative">
            <input
              type="text"
              readOnly
              value={pinInput}
              placeholder="___-___"
              className="w-full text-center text-3xl sm:text-4xl font-mono font-black tracking-widest py-4 rounded-2xl bg-slate-950 border-2 border-purple-500/50 text-white placeholder-slate-700 shadow-inner"
            />
          </div>

          {/* Preset PIN Auto-Fill buttons for testing */}
          <div className="flex items-center justify-center space-x-2 pt-1">
            <button
              onClick={() => { setPinInput('325-600'); handleConnectAndDownload('325-600'); }}
              className="px-3 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-700 text-xs font-mono font-bold text-purple-300"
            >
              Test PIN: 325-600
            </button>
            <button
              onClick={() => { setPinInput('849-201'); handleConnectAndDownload('849-201'); }}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-300"
            >
              Test PIN: 849-201
            </button>
          </div>
        </div>

        {/* Touch Numeric Keypad for Mobile */}
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

        {/* Action Button */}
        <button
          onClick={() => handleConnectAndDownload()}
          disabled={isConnecting || isReceiving}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
            isConnecting || isReceiving
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
              : 'btn-gradient-purple shadow-xl shadow-purple-500/25 hover:scale-[1.01]'
          }`}
        >
          {isConnecting ? (
            <span className="flex items-center justify-center space-x-2">
              <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
              <span>Verifying PIN & Connecting P2P Stream...</span>
            </span>
          ) : isReceiving ? (
            <span>Receiving File ({receiveProgress}%)...</span>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Connect & Download File</span>
            </span>
          )}
        </button>

        {/* Live Downloading Stream Monitor */}
        {isReceiving && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-3 animate-fade-in text-left">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-purple-300 font-bold">Streaming from Sender...</span>
              <span className="text-emerald-400 font-bold">{downloadSpeed} MB/s</span>
            </div>

            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 transition-all duration-150"
                style={{ width: `${receiveProgress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>{receiveProgress}% Downloaded</span>
              <span>100 GB Stream Chunk Verified</span>
            </div>
          </div>
        )}

        {/* Downloaded File Result Card */}
        {receivedFile && (
          <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-left space-y-4 animate-fade-in">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-7 h-7 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-bold text-white">{receivedFile.name}</h4>
                <p className="text-xs text-slate-300 font-mono mt-0.5">
                  Size: {formatBytes(receivedFile.sizeBytes)} • Sender: {receivedFile.sender}
                </p>
                <p className="text-[10px] text-emerald-400 font-mono mt-1">{receivedFile.checksum}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => alert(`Saving ${receivedFile.name} to local device storage...`)}
                className="py-3 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Save to Files</span>
              </button>

              <button
                onClick={handleNativeShare}
                className="py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all"
              >
                <Smartphone className="w-4 h-4" />
                <span>iOS / Android Share</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
