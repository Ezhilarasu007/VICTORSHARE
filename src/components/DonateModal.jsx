import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Heart, Copy, Check, X, ShieldCheck, Zap, Sparkles, Smartphone, CreditCard } from 'lucide-react';

export function DonateModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState('200');
  const [isCopied, setIsCopied] = useState(false);
  const upiId = 'arasu9629hf@okhdfcbank';

  if (!isOpen) return null;

  const validAmount = Math.max(200, Math.min(parseInt(amount || '200'), 1000000));
  const upiString = `upi://pay?pa=${upiId}&pn=VictorShare%20Support&am=${validAmount}&cu=INR&tn=Support%20VictorShare%20Development`;

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const presetAmounts = ['200', '500', '1000', '2000', '5000', '10000'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/50 shadow-2xl overflow-hidden text-center space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-900/80 rounded-full border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2">
          <div className="p-3 bg-gradient-to-tr from-pink-500 via-purple-600 to-cyan-500 text-white rounded-2xl w-14 h-14 mx-auto flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Heart className="w-7 h-7 fill-white stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black text-white">Support VictorShare</h2>
          <p className="text-xs text-slate-300">
            Keep VictorShare 100% free & open for everyone! Min ₹200 to Max ₹10,000,000 / day.
          </p>
        </div>

        {/* Preset Amounts */}
        <div className="grid grid-cols-3 gap-2">
          {presetAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt)}
              className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                amount === amt
                  ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              ₹{amt}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <div className="space-y-1 text-left">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Custom Contribution (INR ₹)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">₹</span>
            <input
              type="number"
              min="200"
              max="1000000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-950 border border-purple-500/50 text-white font-mono font-bold text-sm"
            />
          </div>
        </div>

        {/* UPI QR Code */}
        <div className="space-y-3">
          <div className="inline-block p-4 rounded-2xl bg-white shadow-2xl border-4 border-purple-400">
            <QRCodeSVG value={upiString} size={150} level="H" includeMargin={true} />
          </div>
          <p className="text-[11px] text-slate-400 font-mono">Scan with Google Pay, PhonePe, Paytm, or BHIM</p>
        </div>

        {/* UPI ID Copy Card */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block font-bold">Official UPI VPA ID</span>
            <span className="font-mono font-bold text-purple-300">{upiId}</span>
          </div>
          <button
            onClick={handleCopyUpi}
            className="px-3 py-1.5 rounded-lg bg-purple-950 border border-purple-700 text-purple-300 hover:text-white flex items-center space-x-1 font-bold text-[11px]"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* 1-Tap Pay Direct App Trigger Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <a
            href={upiString}
            className="py-3 rounded-xl btn-gradient-purple text-xs font-bold flex items-center justify-center space-x-1.5 shadow-lg shadow-purple-500/20"
          >
            <Smartphone className="w-4 h-4" />
            <span>Pay ₹{validAmount} via UPI App</span>
          </a>

          <button
            onClick={onClose}
            className="py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
