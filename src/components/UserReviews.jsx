import React, { useState } from 'react';
import { Star, ThumbsUp, ShieldCheck, CheckCircle2, User, MessageSquare, Send, Sparkles, Smartphone, Laptop } from 'lucide-react';

export function UserReviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Alex Rivera',
      device: 'iPhone 15 Pro (iOS)',
      rating: 5,
      date: '10 mins ago',
      comment: 'Transferred a 45GB 4K drone video from my Mac to iPhone in under 5 minutes! The 6-digit PIN pairing is super fast.'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      device: 'Samsung Galaxy S24 (Android)',
      rating: 5,
      date: '2 hours ago',
      comment: 'Sent a 7.5GB movie file directly to my friend\'s phone. Loved that it saves straight to device storage with no cloud leaks.'
    },
    {
      id: 3,
      name: 'Marcus Chen',
      device: 'Windows 11 PC',
      rating: 5,
      date: '1 day ago',
      comment: 'Zero alert popups, super clean dark UI, and incredible WebRTC P2P speeds over 120 MB/s.'
    }
  ]);

  // Form state
  const [name, setName] = useState('');
  const [device, setDevice] = useState('Android');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newReview = {
      id: Date.now(),
      name,
      device: `${device} User`,
      rating,
      date: 'Just now',
      comment
    };

    setReviews([newReview, ...reviews]);
    setName('');
    setComment('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Rating Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center space-x-1 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Verified User Ratings & Testimonials</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Trusted by Over <span className="text-gradient-cyan">18,450+ Users Worldwide</span>
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            See real feedback from iOS, Android, and PC users who transfer 10MB to 100GB files daily on VictorShare.
          </p>
        </div>

        {/* Big Score Card */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          <div className="text-center">
            <div className="text-4xl font-black text-white flex items-center justify-center gap-1">
              <span>4.9</span>
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-6 h-6 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-1">Average Rating out of 5.0</p>
          </div>

          <div className="h-10 w-px bg-slate-800 hidden sm:block" />

          <div className="text-left text-xs space-y-1">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% AES-256 Encrypted Streams</span>
            </div>
            <div className="flex items-center space-x-2 text-cyan-300 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Avg Transfer Speed: 145.8 MB/s</span>
            </div>
          </div>
        </div>

      </div>

      {/* Review Grid & Submit Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: User Testimonials */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            Recent Happy User Reviews
          </h3>

          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-slate-950 font-black text-sm">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">{rev.device}</p>
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-mono">
                  <span>Verified Transfer</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Write a Review Form */}
        <div className="glass-card p-6 rounded-3xl border border-purple-500/30 space-y-4 shadow-2xl h-fit">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            Leave Your Rating
          </h3>
          <p className="text-xs text-slate-400">
            Share your transfer experience with the VictorShare community.
          </p>

          {submitted && (
            <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Thank you! Your review is published.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">Device Used</label>
              <select
                value={device}
                onChange={(e) => setDevice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white"
              >
                <option value="iPhone (iOS)">iPhone (iOS)</option>
                <option value="Android Phone">Android Phone</option>
                <option value="Windows PC">Windows PC</option>
                <option value="MacBook / Mac">MacBook / Mac</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">Star Rating</label>
              <div className="flex space-x-1 pt-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className="p-1 hover:scale-110 transition-all"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        num <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">Your Feedback</label>
              <textarea
                required
                rows={3}
                placeholder="How was your file transfer speed and experience?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl btn-gradient-primary text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Submit Review</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
