import React, { useState } from 'react';
import { Search, Sparkles, Copy, Check, ArrowLeft, BarChart2 } from 'lucide-react';

export function YouTubeSeoTool({ onBackHome }) {
  const [topic, setTopic] = useState('');
  const [seoResult, setSeoResult] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!topic) return;

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const cleanTopic = topic.trim();
      setSeoResult({
        titles: [
          `🔥 ${cleanTopic} (2026 FULL GUIDE) - How to Get Maximum Results!`,
          `How I Mastered ${cleanTopic} in 24 Hours [Step-By-Step]`,
          `Top 10 Secret ${cleanTopic} Tips Nobody Tells You!`
        ],
        tags: `${cleanTopic.toLowerCase()}, ${cleanTopic.toLowerCase()} 2026, how to ${cleanTopic.toLowerCase()}, best ${cleanTopic.toLowerCase()} guide, ${cleanTopic.toLowerCase()} tutorial, viral video, youtube seo`,
        description: `🚀 In this video, we cover everything about ${cleanTopic} in 2026!\n\n📌 Timestamps:\n00:00 - Introduction\n01:30 - Setup & Basics\n04:45 - Pro Tips & Tricks\n\n🔔 Subscribe for more high-CPM videos!`,
        estimatedCpm: '₹240 - ₹480 RPM ($3.50 - $6.80 CPM)'
      });
    }, 1000);
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6 text-center">
      <div className="flex items-center justify-between">
        <button
          onClick={onBackHome}
          className="flex items-center space-x-2 text-slate-400 hover:text-white bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 transition-all text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
          📈 High-CPM YouTube SEO Optimizer
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-white">YouTube Video SEO Generator</h1>
        <p className="text-xs text-slate-400">Generate viral titles, high-ranking tags, descriptions & CPM revenue optimizations.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 space-y-6 max-w-2xl mx-auto shadow-2xl">
        <form onSubmit={handleGenerate} className="space-y-4 text-left">
          <label className="text-xs font-bold text-slate-300">Enter Video Topic or Niche Keyword</label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. 4K Video Editing, Phonk Music, Gaming Montage"
              className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-xs font-bold text-white outline-none"
            />
            <button type="submit" className="px-6 py-3 rounded-xl btn-gradient-primary text-xs font-bold shadow-lg">
              {isGenerating ? 'Generating...' : 'Generate SEO'}
            </button>
          </div>
        </form>

        {seoResult && (
          <div className="space-y-4 text-left animate-fade-in pt-2">
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-cyan-300">
                <span>🔥 High-CTR Clickable Video Titles</span>
              </div>
              {seoResult.titles.map((t, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900 text-xs font-bold text-white flex justify-between items-center">
                  <span>{t}</span>
                  <button onClick={() => copyToClipboard(t, `title_${idx}`)} className="text-cyan-400 hover:text-white">
                    {copiedField === `title_${idx}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/40 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-purple-300">
                <span>🏷️ High-Ranking Video Tags</span>
                <button onClick={() => copyToClipboard(seoResult.tags, 'tags')} className="text-purple-400 hover:text-white flex items-center gap-1 text-[11px]">
                  {copiedField === 'tags' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Tags</span>
                </button>
              </div>
              <p className="text-xs text-slate-300 font-mono bg-slate-900 p-3 rounded-xl">{seoResult.tags}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
