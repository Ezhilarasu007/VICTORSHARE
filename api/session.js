// Vercel Serverless API for VictorShare Global Session Database with Auto-Cleanup

const globalSessions = global.__VICTORSHARE_DB__ || new Map();
global.__VICTORSHARE_DB__ = globalSessions;

export default function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Create Session
  if (req.method === 'POST') {
    const { pin, code, filename, sizeBytes, category, mimeType } = req.body || {};
    if (!pin && !code) {
      return res.status(400).json({ error: 'PIN or code required' });
    }

    const activeCode = code || (pin ? pin.replace('-', '') : '325600');
    const activePin = pin || `${activeCode.slice(0, 3)}-${activeCode.slice(3)}`;

    const sessionData = {
      found: true,
      pin: activePin,
      code: activeCode,
      filename: filename || 'Shared_File.dat',
      sizeBytes: sizeBytes || 0,
      category: category || 'file',
      mimeType: mimeType || 'application/octet-stream',
      createdAt: Date.now()
    };

    globalSessions.set(activeCode, sessionData);
    globalSessions.set(activePin, sessionData);

    return res.status(200).json({ status: 'ok', session: sessionData });
  }

  // Query Session
  if (req.method === 'GET') {
    const { code, pin } = req.query || {};
    const queryCode = (code || pin || '').toString().replace('-', '').trim();

    if (globalSessions.has(queryCode)) {
      return res.status(200).json(globalSessions.get(queryCode));
    }

    if (globalSessions.has(code) || globalSessions.has(pin)) {
      return res.status(200).json(globalSessions.get(code || pin));
    }

    // Default fallback demo matching code
    if (queryCode === '325600') {
      return res.status(200).json({
        found: true,
        pin: '325-600',
        code: '325600',
        filename: 'www.1TamilMV.ing - Interstellar (2014) BluRay 1080p.mkv',
        sizeBytes: 8053063680,
        category: 'video',
        mimeType: 'video/x-matroska',
        createdAt: Date.now()
      });
    }

    return res.status(404).json({ found: false, message: 'Session not found for code: ' + queryCode });
  }

  // Auto-Delete Session Record from Server once download completes!
  if (req.method === 'DELETE') {
    const { code, pin } = req.query || {};
    const queryCode = (code || pin || '').toString().replace('-', '').trim();

    globalSessions.delete(queryCode);
    globalSessions.delete(code);
    globalSessions.delete(pin);

    return res.status(200).json({ status: 'cleaned', message: 'Session auto-deleted from server storage.' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
