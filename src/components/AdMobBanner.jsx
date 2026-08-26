import React, { useEffect, useState } from 'react';
import { Sparkles, PlayCircle, DollarSign, Award, Gift } from 'lucide-react';

export function AdMobBanner({ adType = 'banner', slotId = '2966231183' }) {
  const [adLoaded, setAdLoaded] = useState(false);
  const [showRewardedModal, setShowRewardedModal] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  // Exact AdMob & AdSense Identifiers
  const ADMOB_APP_ID = "ca-app-pub-6751037211810646~1453838961";
  const PUBLISHER_ID = "ca-pub-6751037211810646";

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch (e) {
      console.warn("AdMob tag init:", e);
    }
  }, []);

  const handleWatchRewardedAd = () => {
    setShowRewardedModal(true);
    setTimeout(() => {
      setRewardClaimed(true);
      setTimeout(() => {
        setShowRewardedModal(false);
        setRewardClaimed(false);
      }, 2500);
    }, 4000);
  };

  return (
    <div className="w-full my-4 flex flex-col items-center justify-center">
      
      {/* Rewarded Video Ad Format */}
      {adType === 'rewarded' && (
        <div className="w-full max-w-lg glass-panel p-4 rounded-2xl border border-amber-500/40 text-center space-y-3 shadow-xl">
          <div className="flex items-center justify-center space-x-2 text-amber-400 font-bold text-xs">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>Watch Sponsored Ad to Boost Transfer Speed to 500 MB/s</span>
          </div>

          <button
            onClick={handleWatchRewardedAd}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-slate-950 font-black text-xs flex items-center justify-center space-x-2 shadow-lg"
          >
            <PlayCircle className="w-4 h-4 fill-current" />
            <span>Watch Rewarded Video Ad (AdMob #{slotId})</span>
          </button>
        </div>
      )}

      {/* Adaptive Anchored Banner Ad Format */}
      {adType === 'banner' && (
        <div className="w-full max-w-4xl p-2 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-1.5 overflow-hidden">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> SPONSORED ADVERTISEMENT • ADMOB #{slotId}
          </div>

          {/* AdSense / AdMob Responsive Slot */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block', minHeight: '90px' }}
            data-ad-client={PUBLISHER_ID}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      )}

      {/* Rewarded Video Modal Simulation */}
      {showRewardedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in text-center">
          <div className="w-full max-w-sm glass-panel p-6 rounded-3xl border border-amber-500/50 space-y-4 shadow-2xl">
            {!rewardClaimed ? (
              <div className="space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-950 border border-amber-500/50 flex items-center justify-center text-amber-400 animate-spin">
                  <PlayCircle className="w-8 h-8" />
                </div>
                <h4 className="font-black text-white text-base">Playing Rewarded Video Ad...</h4>
                <p className="text-xs text-slate-300">Google AdMob Unit ID: <span className="font-mono text-amber-300">ca-app-pub-6751037211810646/7773986107</span></p>
              </div>
            ) : (
              <div className="space-y-3 animate-bounce">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <Award className="w-8 h-8" />
                </div>
                <h4 className="font-black text-emerald-400 text-base">Reward Earned! 🎉</h4>
                <p className="text-xs text-white">Thunder P2P speed boosted to 500 MB/s!</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
