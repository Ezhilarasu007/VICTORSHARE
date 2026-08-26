import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { SendPage } from './components/SendPage';
import { ReceivePage } from './components/ReceivePage';
import { VideoCompressor } from './components/VideoCompressor';
import { AudioExtractor } from './components/AudioExtractor';
import { ImageOptimizer } from './components/ImageOptimizer';
import { SpeedTestTool } from './components/SpeedTestTool';
import { AdminDashboard } from './components/AdminDashboard';
import { TransferHistory } from './components/TransferHistory';
import { UserReviews } from './components/UserReviews';
import { PermissionsModal } from './components/PermissionsModal';
import { DonateModal } from './components/DonateModal';
import { InfoModal } from './components/InfoModal';
import { GuideModal } from './components/GuideModal';
import { LanguageProvider } from './utils/languageStore';
import { Shield, Lock, Heart, Globe, Mail, Star, HelpCircle, AlertCircle } from 'lucide-react';

export default function App() {
  // Direct Path Routing Handler
  const getTabFromPath = () => {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    if (path === '/send') return 'send';
    if (path === '/receive') return 'receive';
    if (path === '/compressor') return 'compressor';
    if (path === '/audio-extractor') return 'audio-extractor';
    if (path === '/image-optimizer') return 'image-optimizer';
    if (path === '/speed-test') return 'speed-test';
    if (path === '/admin') return 'admin';
    if (path === '/history') return 'history';
    if (path === '/reviews') return 'reviews';
    return 'home';
  };

  const getInfoTabFromPath = () => {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
    if (path === '/terms' || path === '/termsandconditions') return 'terms';
    if (path === '/privacy') return 'privacy';
    if (path === '/about') return 'about';
    if (path === '/contact') return 'contact';
    return null;
  };

  const [activeTab, setActiveTabState] = useState(getTabFromPath());
  const [infoTab, setInfoTabState] = useState(getInfoTabFromPath());

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    const newPath = tab === 'home' ? '/' : `/${tab}`;
    window.history.pushState(null, '', newPath);
  };

  const setInfoTab = (tab) => {
    setInfoTabState(tab);
    if (tab) {
      const pathMap = { terms: '/termsandconditions', privacy: '/privacy', about: '/about', contact: '/contact' };
      window.history.pushState(null, '', pathMap[tab] || `/${tab}`);
    } else {
      window.history.pushState(null, '', activeTab === 'home' ? '/' : `/${activeTab}`);
    }
  };

  // Sync back/forward browser buttons
  useEffect(() => {
    const handlePopState = () => {
      setActiveTabState(getTabFromPath());
      setInfoTabState(getInfoTabFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Permissions State (Default 2 essential permissions)
  const [permissions, setPermissions] = useState({
    storage: true,
    network: true
  });

  // Modal states
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [history, setHistory] = useState([]);

  // Auto-prompt 2 Essential Permissions modal on first user entry!
  useEffect(() => {
    const hasPrompted = sessionStorage.getItem('victorshare_permissions_prompted');
    if (!hasPrompted) {
      setIsPermissionsOpen(true);
      sessionStorage.setItem('victorshare_permissions_prompted', 'true');
    }
  }, []);

  const handleCompressionComplete = (logEntry) => {
    setHistory(prev => [logEntry, ...prev]);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
        
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openPermissionsModal={() => setIsPermissionsOpen(true)}
          openDonateModal={() => setIsDonateOpen(true)}
          openGuideModal={() => setIsGuideOpen(true)}
        />

        {/* Main Body View Switcher */}
        <main className="flex-1 pb-16">
          {activeTab === 'home' && (
            <HomePage
              setActiveTab={setActiveTab}
              openPermissionsModal={() => setIsPermissionsOpen(true)}
            />
          )}

          {activeTab === 'send' && (
            <SendPage
              onBackHome={() => setActiveTab('home')}
              permissions={permissions}
              openPermissionsModal={() => setIsPermissionsOpen(true)}
            />
          )}

          {activeTab === 'receive' && (
            <ReceivePage
              onBackHome={() => setActiveTab('home')}
              permissions={permissions}
              openPermissionsModal={() => setIsPermissionsOpen(true)}
            />
          )}

          {activeTab === 'compressor' && (
            <VideoCompressor
              onCompressionComplete={handleCompressionComplete}
              permissions={permissions}
              openPermissionsModal={() => setIsPermissionsOpen(true)}
            />
          )}

          {activeTab === 'audio-extractor' && (
            <AudioExtractor onBackHome={() => setActiveTab('home')} />
          )}

          {activeTab === 'image-optimizer' && (
            <ImageOptimizer onBackHome={() => setActiveTab('home')} />
          )}

          {activeTab === 'speed-test' && (
            <SpeedTestTool onBackHome={() => setActiveTab('home')} />
          )}

          {activeTab === 'admin' && (
            <AdminDashboard onBackHome={() => setActiveTab('home')} />
          )}

          {activeTab === 'history' && (
            <TransferHistory
              history={history}
              onClear={() => setHistory([])}
            />
          )}

          {activeTab === 'reviews' && (
            <UserReviews />
          )}
        </main>

        {/* Global 2026 Footer with Direct Legal Links */}
        <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 px-4 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left: Branding & 18+ Age Restriction */}
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-1.5">
                  <span>VICTORSHARE ADVANCED V1.0</span>
                  <span className="px-1.5 py-0.5 text-[9px] rounded bg-amber-950 text-amber-300 border border-amber-500/40">18+ RESTRICTED</span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">Universal P2P File & Video Transfer Engine (10MB to 10TB+)</p>
              </div>
            </div>

            {/* Middle: Legal & Info Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-bold text-slate-300">
              <button onClick={() => setIsGuideOpen(true)} className="hover:text-cyan-400 font-bold transition-all flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>How to Use Guide</span>
              </button>
              <span className="text-slate-700">•</span>
              <button onClick={() => setInfoTab('terms')} className="hover:text-cyan-400 transition-all">
                Terms & Conditions
              </button>
              <span className="text-slate-700">•</span>
              <button onClick={() => setInfoTab('privacy')} className="hover:text-cyan-400 transition-all">
                Privacy Policy
              </button>
              <span className="text-slate-700">•</span>
              <button onClick={() => setInfoTab('about')} className="hover:text-cyan-400 transition-all">
                About Us
              </button>
              <span className="text-slate-700">•</span>
              <button onClick={() => setInfoTab('contact')} className="hover:text-cyan-400 transition-all flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-pink-400" />
                <span>Contact Us</span>
              </button>
              <span className="text-slate-700">•</span>
              <button onClick={() => setActiveTab('reviews')} className="hover:text-amber-400 transition-all flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>Ratings (4.9/5)</span>
              </button>
              <span className="text-slate-700">•</span>
              <button onClick={() => setIsDonateOpen(true)} className="hover:text-pink-400 text-pink-400 font-black transition-all flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-pink-400" />
                <span>Donate UPI</span>
              </button>
            </div>

            {/* Right: Copyright */}
            <div className="text-right text-[11px] text-slate-400 font-mono">
              © 2026 VictorShare Inc. • AES-256 E2EE Pipe
            </div>

          </div>
        </footer>

        {/* Modals */}
        <PermissionsModal
          isOpen={isPermissionsOpen}
          onClose={() => setIsPermissionsOpen(false)}
          permissions={permissions}
          setPermissions={setPermissions}
        />

        <DonateModal
          isOpen={isDonateOpen}
          onClose={() => setIsDonateOpen(false)}
        />

        <InfoModal
          activeTab={infoTab}
          onClose={() => setInfoTab(null)}
        />

        <GuideModal
          isOpen={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
        />

      </div>
    </LanguageProvider>
  );
}
