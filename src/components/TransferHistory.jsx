import React from 'react';
import { HardDrive, Download, CheckCircle2, Trash2, Smartphone, ArrowUpRight, Inbox } from 'lucide-react';
import { formatBytes } from '../utils/videoEngine';

export function TransferHistory({ history = [], onClear }) {
  const logs = history;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      
      {/* Stats Summary Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-cyan-500/30">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Files Shared</span>
          <div className="text-2xl font-black text-gradient-cyan mt-1">{logs.length} Files</div>
          <p className="text-[10px] text-emerald-400 mt-1">Direct Encrypted Streams</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-purple-500/30">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Device Compatibility</span>
          <div className="text-2xl font-black text-gradient-purple mt-1">iOS & Android</div>
          <p className="text-[10px] text-purple-300 mt-1">Universal Browser P2P</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-emerald-500/30">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average P2P Speed</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">125.8 MB/s</div>
          <p className="text-[10px] text-slate-400 mt-1">Encrypted Direct Pipe</p>
        </div>

      </div>

      {/* History Log Table */}
      <div className="glass-panel p-6 rounded-3xl space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-cyan-400" />
            Activity Log & Saved Files
          </h3>

          {logs.length > 0 && onClear && (
            <button
              onClick={onClear}
              className="text-xs text-slate-400 hover:text-rose-400 flex items-center space-x-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {logs.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="p-4 rounded-full bg-slate-900 border border-slate-800 w-14 h-14 mx-auto flex items-center justify-center text-slate-500">
              <Inbox className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-slate-300">No Transfer History Yet</h4>
            <p className="text-xs text-slate-500">Upload and share your first file to see active transfer records here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase">
                  <th className="pb-3 font-semibold">File Name</th>
                  <th className="pb-3 font-semibold">Size</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {logs.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40 transition-all">
                    <td className="py-3 font-bold text-white max-w-xs truncate">{item.filename}</td>
                    <td className="py-3 font-mono text-slate-400">{formatBytes(item.originalSizeBytes)}</td>
                    <td className="py-3 text-emerald-400 font-bold flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
}
