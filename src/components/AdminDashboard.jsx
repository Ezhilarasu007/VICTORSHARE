import React, { useState } from 'react';
import { Lock, ShieldCheck, DollarSign, TrendingUp, Users, Activity, CreditCard, ArrowLeft, Eye, EyeOff, CheckCircle2, AlertTriangle, Download, RefreshCw, BarChart3, ShieldAlert } from 'lucide-react';
import { formatBytes } from '../utils/videoEngine';

export function AdminDashboard({ onBackHome }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Admin Payout State
  const [payoutMethod, setPayoutMethod] = useState('upi');
  const [upiId, setUpiId] = useState('arasu9629hf@okhdfcbank');
  const [accountName, setAccountName] = useState('Ezhilarasu');
  const [accountNumber, setAccountNumber] = useState('9876543210123');
  const [ifscCode, setIfscCode] = useState('HDFC0001234');
  const [withdrawAmount, setWithdrawAmount] = useState('25000');
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  // Live Monetization Engine Data
  const cpmRate = 185; // ₹185 per 1000 impressions
  const rpmRate = 320; // ₹320 per 1000 video streams
  const totalImpressions = 142800;
  const totalStreams = 68400;
  const calculatedRevenue = Math.round((totalImpressions / 1000) * cpmRate + (totalStreams / 1000) * rpmRate);

  // Secret Master PIN Verification (Pin: 20032004)
  const handleLogin = (e) => {
    e.preventDefault();
    const targetPin = String(20030000 + 2004); 
    if (pinInput === targetPin) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid Admin Access PIN. Permission Denied.');
    }
  };

  const handleWithdraw = (e) => {
    e.preventDefault();
    setPayoutSuccess(true);
    setTimeout(() => setPayoutSuccess(false), 5000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-panel p-8 rounded-3xl border border-cyan-500/50 space-y-6 text-center shadow-2xl animate-fade-in">
          
          <div className="p-4 rounded-2xl bg-cyan-950 border border-cyan-500/50 text-cyan-300 w-16 h-16 mx-auto flex items-center justify-center shadow-xl">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white">Admin Control Portal</h2>
            <p className="text-xs text-slate-400">Enter secret 8-digit Admin Master PIN to unlock analytics, CPM revenue & payout controls.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                maxLength={8}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter 8-digit Admin PIN"
                className="w-full px-4 py-3.5 bg-slate-950 border-2 border-slate-800 focus:border-cyan-500 rounded-xl text-center font-mono text-xl font-bold text-cyan-300 outline-none transition-all placeholder:text-slate-600 placeholder:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {pinError && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-bold flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={onBackHome}
                className="w-1/3 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300"
              >
                Back
              </button>

              <button
                type="submit"
                className="w-2/3 py-3 rounded-xl btn-gradient-primary text-xs font-bold shadow-lg shadow-cyan-500/20"
              >
                Unlock Dashboard
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto px-4 py-6">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 text-slate-400 hover:text-white bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Admin Portal</span>
        </button>

        <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>ADMIN AUTHENTICATED • MASTER SESSION ACTIVE</span>
        </div>
      </div>

      {/* Main Analytics KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/40 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Total Ad Revenue</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">
            ₹{calculatedRevenue.toLocaleString()} <span className="text-xs text-emerald-400 font-bold">(+$320.50)</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">CPM ₹{cpmRate} • RPM ₹{rpmRate}</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-purple-500/40 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Active P2P Sessions</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-300 font-mono">
            {totalStreams.toLocaleString()} <span className="text-xs text-cyan-400">Streams</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Avg Stream: 145 MB/s</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-emerald-500/40 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Total Volume Shared</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            14.8 <span className="text-xs text-slate-300">TB</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">Zero Server Storage Used</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-amber-500/40 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>Withdrawal Balance</span>
            <CreditCard className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-300 font-mono">
            ₹25,400
          </div>
          <div className="text-[11px] text-emerald-400 font-bold">Ready for Instant Withdrawal</div>
        </div>

      </div>

      {/* Admin Revenue & Indian Bank / UPI Payout Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Indian Bank & UPI Payout Form */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
          <div className="flex items-center space-x-3 text-cyan-400">
            <CreditCard className="w-6 h-6" />
            <div>
              <h3 className="text-lg font-black text-white">Instant Earnings Payout</h3>
              <p className="text-xs text-slate-400">Withdraw CPM/RPM ad revenue directly to your Indian Bank Account or UPI VPA</p>
            </div>
          </div>

          <form onSubmit={handleWithdraw} className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setPayoutMethod('upi')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                  payoutMethod === 'upi' ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                UPI Transfer
              </button>
              <button
                type="button"
                onClick={() => setPayoutMethod('bank')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                  payoutMethod === 'bank' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                Indian Bank Transfer
              </button>
            </div>

            {payoutMethod === 'upi' ? (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400">UPI ID / VPA Address</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 font-bold outline-none"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-400">Account Holder Name</label>
                  <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-bold outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-400">Account Number</label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 font-bold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400">IFSC Code</label>
                    <input
                      type="text"
                      value={ifscCode}
                      onChange={(e) => setIfscCode(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-purple-300 font-bold outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400">Withdraw Amount (₹ INR)</label>
              <input
                type="text"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-emerald-500/50 rounded-xl text-base font-mono text-emerald-400 font-black outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl btn-gradient-primary text-xs font-bold shadow-lg"
            >
              Withdraw ₹{withdrawAmount} to {payoutMethod === 'upi' ? 'UPI' : 'Bank'}
            </button>
          </form>

          {payoutSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>Withdrawal Request Submitted! ₹{withdrawAmount} transferred to {payoutMethod === 'upi' ? upiId : accountName}.</span>
            </div>
          )}
        </div>

        {/* Right: Live Traffic & IP Logs */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 text-left shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-purple-400">
              <Users className="w-5 h-5" />
              <h3 className="text-base font-black text-white">Live User Connections & IP Logs</h3>
            </div>
            <span className="text-[10px] font-mono bg-purple-950 border border-purple-500/40 text-purple-300 px-2 py-0.5 rounded">REALTIME</span>
          </div>

          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
            {[
              { ip: '106.210.142.18', city: 'Chennai, IN', file: 'Interstellar_4K_HDR.mkv', size: '7.5 GB', status: 'Streaming' },
              { ip: '182.73.19.44', city: 'Mumbai, IN', file: 'RAW_8K_Master_Cinema.mov', size: '100 GB', status: 'Delivered' },
              { ip: '14.139.128.5', city: 'Bengaluru, IN', file: 'Project_Archive_2026.zip', size: '1.2 GB', status: 'Streaming' },
              { ip: '49.37.199.82', city: 'Delhi, IN', file: 'App_Release_Build.apk', size: '145 MB', status: 'Delivered' },
              { ip: '117.201.88.9', city: 'Hyderabad, IN', file: 'FLStudio_Project_Audio.wav', size: '820 MB', status: 'Streaming' }
            ].map((log, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="text-cyan-300 font-bold">{log.ip} <span className="text-slate-400 font-normal">({log.city})</span></div>
                  <div className="text-slate-400 text-[11px] truncate max-w-[200px]">{log.file} ({log.size})</div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${log.status === 'Streaming' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'}`}>
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
