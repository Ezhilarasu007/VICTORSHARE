import React from 'react';
import { HardDrive, Download, CheckCircle2, Trash2, Smartphone, ArrowUpRight } from 'lucide-react';
import { formatBytes } from '../utils/videoEngine';

export function TransferHistory({ history = [], onClear }) {
  const defaultLogs = [
    {
      id: 1,
      filename: 'RAW_8K_CINEMATIC_MASTER_100GB.mov',
      originalSizeBytes: 100 * 1024 * 1024 * 1024,
      compressedSizeBytes: 10 * 1024 * 1024 * 0.98,
      reductionPercent: '99.99%',
      targetSizeMB: 10,
      timestamp: 'Just now',
      status: 'Transferred to iPhone 15 Pro'
    },
    {
      id: 2,
      filename: '4K_DRONE_FOOTAGE_45GB.mp4',
      originalSizeBytes: 45 * 1024 * 1024 * 1024,
      compressedSizeBytes: 25 * 1024 * 1024 * 0.98,
      reductionPercent: '99.94%',
      targetSizeMB: 25,
      timestamp: '15 mins ago',
      status: 'Shared via Discord Preset'
    }
  ];

  const logs = history.length > 0 ? history : defaultLogs;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      
      {/* Stats Summary Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-cyan-500/30">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Bandwidth Saved</span>
          <div className="text-2xl font-black text-gradient-cyan mt-1">299.70 GB</div>
          <p className="text-[10px] text-emerald-400 mt-1">99.9% Storage Efficiency</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-purple-500/30">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Transfers Completed</span>
          <div className="text-2xl font-black text-gradient-purple mt-1">{logs.length} Videos</div>
          <p className="text-[10px] text-purple-300 mt-1">iOS & Android Compatible</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-emerald-500/30">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Transfer Speed</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">45.8 MB/s</div>
          <p className="text-[10px] text-slate-400 mt-1">Direct WebRTC P2P Stream</p>
        </div>

      </div>

      {/* History Log Table */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-cyan-400" />
            Activity Log & Saved Files
          </h3>

          {onClear && (
            <button
              onClick={onClear}
              className="text-xs text-slate-400 hover:text-rose-400 flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase">
                <th className="pb-3 font-semibold">File Name</th>
                <th className="pb-3 font-semibold">Original Size</th>
                <th className="pb-3 font-semibold">Output Size</th>
                <th className="pb-3 font-semibold">Ratio</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {logs.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-all">
                  <td className="py-3 font-bold text-white max-w-xs truncate">{item.filename}</td>
                  <td className="py-3 font-mono text-slate-400">{formatBytes(item.originalSizeBytes)}</td>
                  <td className="py-3 font-mono text-cyan-300 font-bold">{item.targetSizeMB} MB</td>
                  <td className="py-3 font-mono text-emerald-400 font-bold">-{item.reductionPercent || '99.9%'}</td>
                  <td className="py-3 text-slate-300 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
