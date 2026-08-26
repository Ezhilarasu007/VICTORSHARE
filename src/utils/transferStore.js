// Global Transfer Session Store connected to Database API & Local Peer Storage

class TransferStoreManager {
  constructor() {
    this.sessions = new Map();
    this.listeners = new Set();

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
   * Register a real file session created by sender & post to Database API
   */
  async createSession(file) {
    const pin = this.generatePin();
    const cleanCode = pin.replace('-', '');

    const filename = file ? file.name : 'Shared_File.dat';
    const sizeBytes = file ? file.size : 0;
    const mimeType = file ? file.type || 'application/octet-stream' : 'application/octet-stream';
    
    // Categorize
    let category = 'document';
    if (mimeType.startsWith('video') || filename.match(/\.(mp4|mkv|avi|mov|webm)$/i)) category = 'video';
    else if (mimeType.startsWith('audio') || filename.match(/\.(mp3|wav|flac|aac)$/i)) category = 'audio';
    else if (mimeType.startsWith('image') || filename.match(/\.(jpg|png|gif|webp)$/i)) category = 'image';
    else if (filename.match(/\.(apk|ipa|exe)$/i)) category = 'app';

    const fileMeta = {
      name: filename,
      sizeBytes,
      type: mimeType,
      category,
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

    if (typeof window !== 'undefined') {
      window.__VICTORSHARE_SESSIONS__ = window.__VICTORSHARE_SESSIONS__ || {};
      window.__VICTORSHARE_SESSIONS__[cleanCode] = session;
      window.__VICTORSHARE_SESSIONS__[pin] = session;
    }

    // POST to Vercel Serverless Database API / Python DB
    try {
      await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          code: cleanCode,
          filename,
          sizeBytes,
          category,
          mimeType
        })
      }).catch(() => {});
    } catch (e) {}

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
   * Retrieve active file session by PIN or Code (local memory first, then Database API)
   */
  async getSession(codeOrPin) {
    if (!codeOrPin) return null;
    const clean = codeOrPin.replaceAll('-', '').trim();

    // 1. Check local memory map
    if (this.sessions.has(clean)) return this.sessions.get(clean);
    if (this.sessions.has(codeOrPin)) return this.sessions.get(codeOrPin);

    // 2. Check window global
    if (typeof window !== 'undefined' && window.__VICTORSHARE_SESSIONS__) {
      if (window.__VICTORSHARE_SESSIONS__[clean]) return window.__VICTORSHARE_SESSIONS__[clean];
      if (window.__VICTORSHARE_SESSIONS__[codeOrPin]) return window.__VICTORSHARE_SESSIONS__[codeOrPin];
    }

    // 3. Query Database API (`/api/session?code=...`)
    try {
      const res = await fetch(`/api/session?code=${clean}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.found) {
          const apiSession = {
            pin: data.pin,
            code: data.code,
            fileMeta: {
              name: data.filename,
              sizeBytes: data.sizeBytes,
              category: data.category,
              type: data.mimeType
            },
            createdAt: data.createdAt
          };
          this.sessions.set(clean, apiSession);
          return apiSession;
        }
      }
    } catch (e) {}

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
