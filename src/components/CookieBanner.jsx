import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, Check, X, Lock } from 'lucide-react';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const [preferences, setPreferences] = useState({
    ad_storage: true,
    ad_user_data: true,
    ad_personalization: true,
    analytics_storage: true
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem('victorshare_cookie_consent');
    if (!savedConsent) {
      setIsVisible(true);
    } else {
      try {
        const parsed = JSON.parse(savedConsent);
        updateGoogleConsentMode(parsed);
      } catch (e) {}
    }
  }, []);

  const updateGoogleConsentMode = (consentState) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'ad_storage': consentState.ad_storage ? 'granted' : 'denied',
        'ad_user_data': consentState.ad_user_data ? 'granted' : 'denied',
        'ad_personalization': consentState.ad_personalization ? 'granted' : 'denied',
        'analytics_storage': consentState.analytics_storage ? 'granted' : 'denied'
      });
    }
  };

  const handleAcceptAll = () => {
    const allGranted = {
      ad_storage: true,
      ad_user_data: true,
      ad_personalization: true,
      analytics_storage: true
    };
    localStorage.setItem('victorshare_cookie_consent', JSON.stringify(allGranted));
    updateGoogleConsentMode(allGranted);
    setIsVisible(false);
  };

  const handleRejectOptional = () => {
    const allDenied = {
      ad_storage: false,
      ad_user_data: false,
      ad_personalization: false,
      analytics_storage: false
    };
    localStorage.setItem('victorshare_cookie_consent', JSON.stringify(allDenied));
    updateGoogleConsentMode(allDenied);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('victorshare_cookie_consent', JSON.stringify(preferences));
    updateGoogleConsentMode(preferences);
    setIsPreferencesOpen(false);
    setIsVisible(false);
  };

  if (!isVisible && !isPreferencesOpen) return null;

  return (
    <>
      {/* Bottom Sticky Cookie Consent Banner */}
      {isVisible && (
        <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 glass-panel p-5 rounded-3xl border border-cyan-500/50 shadow-2xl space-y-4 animate-fade-in text-left">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2.5 text-cyan-400">
              <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40">
                <Cookie className="w-5 h-5 text-amber-400" />
              </div>
              <h4 className="font-black text-white text-sm">Cookie & Privacy Consent</h4>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-slate-500 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300">
            VictorShare uses cookies & Consent Mode v2 to provide secure P2P file transfers and personalized ad revenue optimizations.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md"
            >
              Accept All Cookies
            </button>

            <button
              onClick={handleRejectOptional}
              className="px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300"
            >
              Reject Optional
            </button>

            <button
              onClick={() => setIsPreferencesOpen(true)}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white"
              title="Cookie Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {isPreferencesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-cyan-500/40 space-y-5 shadow-2xl text-left">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-cyan-400 font-black text-base">
                <ShieldCheck className="w-5 h-5" />
                <span>Google Consent Mode v2 Settings</span>
              </div>
              <button onClick={() => setIsPreferencesOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Ad Storage (ad_storage)</div>
                  <div className="text-slate-400 text-[11px]">Enables advertising cookie storage.</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.ad_storage}
                  onChange={(e) => setPreferences({ ...preferences, ad_storage: e.target.checked })}
                  className="w-4 h-4 accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Ad User Data (ad_user_data)</div>
                  <div className="text-slate-400 text-[11px]">Sends user data related to advertising to Google.</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.ad_user_data}
                  onChange={(e) => setPreferences({ ...preferences, ad_user_data: e.target.checked })}
                  className="w-4 h-4 accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Ad Personalization (ad_personalization)</div>
                  <div className="text-slate-400 text-[11px]">Enables personalized Google Ads.</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.ad_personalization}
                  onChange={(e) => setPreferences({ ...preferences, ad_personalization: e.target.checked })}
                  className="w-4 h-4 accent-cyan-400 cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Analytics Storage (analytics_storage)</div>
                  <div className="text-slate-400 text-[11px]">Enables analytics cookies (Google Analytics 4).</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics_storage}
                  onChange={(e) => setPreferences({ ...preferences, analytics_storage: e.target.checked })}
                  className="w-4 h-4 accent-cyan-400 cursor-pointer"
                />
              </div>

            </div>

            <button
              onClick={handleSavePreferences}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg"
            >
              Save Cookie Preferences
            </button>

          </div>
        </div>
      )}
    </>
  );
}
