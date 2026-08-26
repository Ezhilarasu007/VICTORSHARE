// Real P2P Transfer Session Store using BroadcastChannel & local memory

class TransferStoreManager {
  constructor() {
    this.sessions = new Map();
    this.listeners = new Set();

    // Cross-tab broadcast channel for local peer communication
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      this.channel = new BroadcastChannel('victorshare_p2p_channel');
      this.channel.onmessage = (event) => {
        if (event.data && event.data.type === 'NEW_SESSION') {
          this.sessions.set(event.data.code, event.data.session);
          this.notifyListeners();
        }
      };
    }
  }

  generatePin() {
    const p1 = Math.floor(100 + Math.random() * 900);
    const p2 = Math.floor(100 + Math.random() * 900);
    return `${p1}-${p2}`;
  }

  /**
   * Register a real file session created by sender
   */
  createSession(file) {
    const pin = this.generatePin();
    const cleanCode = pin.replace('-', '');

    const fileMeta = {
      name: file ? file.name : 'Shared_File.dat',
      sizeBytes: file ? file.size : 0,
      type: file ? file.type || 'application/octet-stream' : 'application/octet-stream',
      lastModified: file ? file.lastModified : Date.now()
    };

    const session = {
      pin,
      code: cleanCode,
      fileMeta,
      file, // Real File object
      blobUrl: file ? URL.createObjectURL(file) : null,
      createdAt: Date.now()
    };

    this.sessions.set(cleanCode, session);
    this.sessions.set(pin, session);

    // Also store metadata in window for global access
    if (typeof window !== 'undefined') {
      window.__VICTORSHARE_SESSIONS__ = window.__VICTORSHARE_SESSIONS__ || {};
      window.__VICTORSHARE_SESSIONS__[cleanCode] = session;
      window.__VICTORSHARE_SESSIONS__[pin] = session;
    }

    if (this.channel) {
      try {
        this.channel.postMessage({
          type: 'NEW_SESSION',
          code: cleanCode,
          session: { pin, code: cleanCode, fileMeta }
        });
      } catch (e) {}
    }

    this.notifyListeners();
    return session;
  }

  /**
   * Retrieve active file session by PIN or Code
   */
  getSession(codeOrPin) {
    if (!codeOrPin) return null;
    const clean = codeOrPin.replaceAll('-', '').trim();

    // Check memory map
    if (this.sessions.has(clean)) return this.sessions.get(clean);
    if (this.sessions.has(codeOrPin)) return this.sessions.get(codeOrPin);

    // Check window global
    if (typeof window !== 'undefined' && window.__VICTORSHARE_SESSIONS__) {
      if (window.__VICTORSHARE_SESSIONS__[clean]) return window.__VICTORSHARE_SESSIONS__[clean];
      if (window.__VICTORSHARE_SESSIONS__[codeOrPin]) return window.__VICTORSHARE_SESSIONS__[codeOrPin];
    }

    return null;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb());
  }
}

export const TransferStore = new TransferStoreManager();
