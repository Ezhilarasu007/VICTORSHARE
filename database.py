"""
VictorShare Database & Session Server
Handles global session storage, file metadata persistence, and pin code lookups.
"""

import sqlite3
import json
import time
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

DB_FILE = "victorshare_database.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sessions (
            code TEXT PRIMARY KEY,
            pin TEXT NOT NULL,
            filename TEXT NOT NULL,
            size_bytes INTEGER NOT NULL,
            category TEXT NOT NULL,
            mime_type TEXT NOT NULL,
            created_at INTEGER NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def save_session(pin, code, filename, size_bytes, category, mime_type):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    created_at = int(time.time())
    cursor.execute('''
        INSERT OR REPLACE INTO sessions (code, pin, filename, size_bytes, category, mime_type, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', (code, pin, filename, size_bytes, category, mime_type, created_at))
    conn.commit()
    conn.close()
    return {"status": "ok", "pin": pin, "code": code}

def get_session(code_or_pin):
    clean = code_or_pin.replace('-', '').strip()
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''
        SELECT pin, code, filename, size_bytes, category, mime_type, created_at
        FROM sessions
        WHERE code = ? OR pin = ?
    ''', (clean, code_or_pin))
    row = cursor.fetchone()
    conn.close()

    if row:
        return {
            "found": True,
            "pin": row[0],
            "code": row[1],
            "filename": row[2],
            "sizeBytes": row[3],
            "category": row[4],
            "mimeType": row[5],
            "createdAt": row[6]
        }
    return {"found": False, "message": "PIN not found"}

class RequestHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/session':
            query = parse_qs(parsed.query)
            code = query.get('code', [''])[0] or query.get('pin', [''])[0]
            result = get_session(code)
            self.send_response(200 if result['found'] else 404)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        parsed = urlparse(self.path)
        if parsed.path == '/api/session':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode())

            pin = data.get('pin', '325-600')
            code = data.get('code', pin.replace('-', ''))
            filename = data.get('filename', 'Shared_File.dat')
            size_bytes = data.get('sizeBytes', 0)
            category = data.get('category', 'file')
            mime_type = data.get('mimeType', 'application/octet-stream')

            result = save_session(pin, code, filename, size_bytes, category, mime_type)
            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())

def run_server(port=8080):
    init_db()
    server_address = ('', port)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f"VictorShare Database Server running on port {port}...")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
