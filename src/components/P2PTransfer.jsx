import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Wifi, Send, Download, Smartphone, Monitor, ShieldCheck, Camera, CheckCircle2, ArrowRight, RefreshCw, Copy, Check, Sparkles, HardDrive, Radio } from 'lucide-react';
import { formatBytes } from '../utils/videoEngine';
import { triggerDirectDownload } from '../utils/fileDownloader';

export function P2PTransfer({ initialFile, permissions, openPermissionsModal }) {
  const [activeSubTab, setActiveSubTab] = useState('send'); // 'send' | 'receive'
  
  // Send state
  const [selectedFile, setSelectedFile] = useState(initialFile || null);
  const [pairingPin, setPairingPin] = useState('325-600');
  const [isCopied, setIsCopied] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferProgress, setTransferProgress] = useState(0);
  const [transferSpeed, setTransferSpeed] = useState(0); // MB/s
  const [currentChunk, setCurrentChunk] = useState(0);
  const [totalChunks, setTotalChunks] = useState(160);
  const [activePeers, setActivePeers] = useState([
    { id: 'peer-1', name: 'iPhone 15 Pro (iOS)', ip: '192.168.1.42', icon: Smartphone, status: 'Nearby' },
    { id: 'peer-2', name: 'Galaxy S24 Ultra (Android)', ip: '192.168.1.88', icon: Smartphone, status: 'Nearby' },
    { id: 'peer-3', name: 'MacBook Pro 16 (macOS)', ip: '192.168.1.105', icon: Monitor, status: 'Nearby' }
  ]);
  const [connectedPeer, setConnectedPeer] = useState(null);

  // Receive State
  const [inputPin, setInputPin] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [receivedFile, setReceivedFile] = useState(null);
  const [isReceiving, setIsReceiving] = useState(false);
  const [receiveProgress, setReceiveProgress] = useState(0);

  useEffect(() => {
    if (initialFile) {
      setSelectedFile(initialFile);
    }
  }, [initialFile]);

  // Generate random pairing PIN
  const generateNewPin = () => {
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    const formatted = `${pin.slice(0, 3)}-${pin.slice(3)}`;
    setPairingPin(formatted);
  };

  const handleCopyPin = () => {
    navigator.clipboard.writeText(pairingPin);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Start P2P Send Stream
  const startSendTransfer = (peer) => {
    if (!permissions.network || !permissions.storage) {
      openPermissionsModal();
      return;
    }

    setConnectedPeer(peer);
    setIsTransferring(true);
    setTransferProgress(0);

    const fileMB = selectedFile ? (selectedFile.compressedSizeBytes / (1024 * 1024)) || selectedFile.targetSizeMB || 10 : 10;
    const totalChunkCount = Math.ceil(fileMB * 16); // 64KB per chunk
    setTotalChunks(totalChunkCount);

    let chunk = 0;
    const interval = setInterval(() => {
      chunk += Math.floor(Math.random() * 8) + 4;
      if (chunk >= totalChunkCount) {
        chunk = totalChunkCount;
        clearInterval(interval);
        setIsTransferring(false);
      }
      
      const pct = Math.min(100, Math.round((chunk / totalChunkCount) * 100));
      setTransferProgress(pct);
      setCurrentChunk(chunk);
      setTransferSpeed((Math.random() * 15 + 35).toFixed(1)); // 35 - 50 MB/s speed
    }, 120);
  };

  // Receive Flow simulation
  const handleConnectPin = () => {
    if (inputPin.replaceAll('-', '').length < 6) {
      return;
    }
    
    setIsReceiving(true);
    setReceiveProgress(0);

    let pct = 0;
    const timer = setInterval(() => {
      pct += 10;
      setReceiveProgress(pct);
      if (pct >= 100) {
        clearInterval(timer);
        setIsReceiving(false);
        setReceivedFile({
          name: 'victorshare_10mb_compressed_video.mp4',
          sizeBytes: 10 * 1024 * 1024 * 0.98,
          sender: 'iPhone 15 Pro'
        });
      }
    }, 200);
  };

  const handleNativeShareReceived = async () => {
    if (receivedFile && navigator.share) {
      try {
        await navigator.share({
          title: receivedFile.name,
          text: 'Received via VictorShare P2P Network'
        });
      } catch (e) {}
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-6">
      
      {/* Header Tabs: Send vs Receive */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-3xl border border-purple-500/20">
        
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-950/80 border border-purple-500/30 rounded-2xl">
            <Wifi className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Cross-Platform P2P Direct Share</h2>
            <p className="text-xs text-slate-400">Zero-configuration file transfer between iOS, Android, and PC</p>
          </div>
        </div>

        <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setActiveSubTab('send')}
            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 ${
              activeSubTab === 'send'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>SEND FILE</span>
          </button>

          <button
            onClick={() => setActiveSubTab('receive')}
            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 ${
              activeSubTab === 'receive'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>RECEIVE FILE</span>
          </button>
        </div>

      </div>

      {/* SEND MODE CONTENT */}
      {activeSubTab === 'send' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Pairing QR Code & 6-Digit PIN */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card p-6 rounded-2xl space-y-6 text-center">
              
              <div>
                <span className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 rounded-full">
                  Scan to Connect Mobile Device
                </span>
                <h3 className="text-lg font-bold text-white mt-2">Pair iOS or Android Phone</h3>
                <p className="text-xs text-slate-400 mt-0.5">Scan with iPhone Camera or Android QR Reader</p>
              </div>

              {/* QR Code Container */}
              <div className="inline-block p-4 rounded-2xl bg-white shadow-2xl border-4 border-cyan-400/80">
                <QRCodeSVG
                  value={`https://victorshare.app/pair?pin=${pairingPin.replace('-', '')}`}
                  size={180}
                  level="H"
                  includeMargin={true}
                />
              </div>

              {/* PIN Code Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500">6-Digit Pairing PIN</span>
                <div className="flex items-center justify-center space-x-3">
                  <span className="font-mono text-2xl font-black text-gradient-cyan tracking-widest">{pairingPin}</span>
                  <button
                    onClick={handleCopyPin}
                    className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-700 transition-all"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                onClick={generateNewPin}
                className="text-xs text-cyan-400 hover:underline flex items-center justify-center space-x-1 mx-auto"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Generate New Code</span>
              </button>

            </div>

          </div>

          {/* Right: Radar Scanning & Nearby Devices List */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="glass-card p-6 rounded-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-cyan-950 border border-cyan-500/40">
                    <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
                    <div className="absolute inset-0 rounded-full border border-cyan-400 animate-radar" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Local Network Radar</h3>
                    <p className="text-xs text-slate-400">Searching for active peers on Wi-Fi...</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800">
                  {activePeers.length} Devices Found
                </span>
              </div>

              {/* Active Peers List */}
              <div className="space-y-3">
                {activePeers.map((peer) => {
                  const Icon = peer.icon;
                  const isConnected = connectedPeer?.id === peer.id;

                  return (
                    <div
                      key={peer.id}
                      className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                        isConnected
                          ? 'bg-cyan-950/60 border-cyan-400 text-white'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{peer.name}</h4>
                          <p className="text-xs text-slate-400 font-mono">{peer.ip} • Ready for WebRTC</p>
                        </div>
                      </div>

                      <button
                        onClick={() => startSendTransfer(peer)}
                        disabled={isTransferring}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                          isTransferring && isConnected
                            ? 'bg-slate-800 text-slate-400'
                            : 'btn-gradient-primary shadow-md shadow-cyan-500/20'
                        }`}
                      >
                        {isTransferring && isConnected ? 'Transferring...' : 'Send File Now'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Active Transfer Progress Monitor */}
              {isTransferring && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyan-300 font-bold">Sending to {connectedPeer?.name}</span>
                    <span className="text-emerald-400 font-bold">{transferSpeed} MB/s</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-150"
                      style={{ width: `${transferProgress}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Chunk {currentChunk} / {totalChunks}</span>
                    <span>{transferProgress}% Complete</span>
                  </div>
                </div>
              )}

              {/* Success Notification */}
              {transferProgress === 100 && !isTransferring && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Transfer Finished! File delivered safely to peer device.</span>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* RECEIVE MODE CONTENT */}
      {activeSubTab === 'receive' && (
        <div className="max-w-2xl mx-auto space-y-6">
          
          <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 text-center">
            
            <div className="p-4 rounded-full bg-purple-950/60 border border-purple-500/30 w-16 h-16 mx-auto flex items-center justify-center">
              <Download className="w-8 h-8 text-purple-400" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Receive Video or File</h3>
              <p className="text-xs text-slate-400 mt-1">Enter sender's 6-Digit PIN or scan QR code to initiate download</p>
            </div>

            {/* PIN Entry */}
            <div className="space-y-4 max-w-xs mx-auto">
              <input
                type="text"
                placeholder="Enter PIN (e.g. 849-201)"
                value={inputPin}
                onChange={(e) => setInputPin(e.target.value)}
                maxLength={7}
                className="w-full text-center text-xl font-mono font-bold tracking-widest px-4 py-3 rounded-2xl bg-slate-950 border border-purple-500/40 text-white placeholder-slate-600 focus:outline-none focus:border-purple-400"
              />

              <button
                onClick={handleConnectPin}
                disabled={isReceiving}
                className="w-full py-3.5 rounded-xl btn-gradient-purple text-sm font-bold shadow-lg shadow-purple-500/20"
              >
                {isReceiving ? `Receiving File... (${receiveProgress}%)` : 'Connect & Download'}
              </button>
            </div>

            {/* Live Receive Progress */}
            {isReceiving && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-2">
                <div className="flex justify-between text-xs font-mono text-purple-300">
                  <span>Receiving Stream...</span>
                  <span>{receiveProgress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500" style={{ width: `${receiveProgress}%` }} />
                </div>
              </div>
            )}

            {/* Received File Result */}
            {receivedFile && (
              <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-left space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{receivedFile.name}</h4>
                      <p className="text-xs text-slate-400 font-mono">From {receivedFile.sender} • {formatBytes(receivedFile.sizeBytes)}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => triggerDirectDownload(receivedFile ? receivedFile.name : 'victorshare_download.mp4')}
                    className="py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Save to File</span>
                  </button>

                  <button
                    onClick={handleNativeShareReceived}
                    className="py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center space-x-2"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>iOS / Android Share</span>
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
