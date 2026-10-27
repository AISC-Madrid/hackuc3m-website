CREATE TABLE IF NOT EXISTS event_content (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  content TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
CREATE TABLE IF NOT EXISTS waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  name TEXT NOT NULL DEFAULT '',
  joined_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  consent_version TEXT NOT NULL,
  confirmation_sent_at TEXT,
  invitation_sent_at TEXT,
  invitation_token_hash TEXT UNIQUE,
  invitation_expires_at TEXT,
  registered_at TEXT
);
CREATE TABLE IF NOT EXISTS signup_limits (
  key TEXT PRIMARY KEY,
  requests INTEGER NOT NULL DEFAULT 1,
  expires_at INTEGER NOT NULL
);
