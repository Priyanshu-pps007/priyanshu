import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

const dataDirectory = path.join(process.cwd(), "data");
const databasePath = path.join(dataDirectory, "portfolio.sqlite");

let database: DatabaseSync | null = null;

function getDatabase() {
  if (!database) {
    mkdirSync(dataDirectory, { recursive: true });
    database = new DatabaseSync(databasePath);
    database.exec(`
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        password_salt TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT,
        message TEXT NOT NULL,
        submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT,
        user_agent TEXT
      );

      CREATE TABLE IF NOT EXISTS admin_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        session_token TEXT NOT NULL UNIQUE,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        expires_at TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES admin_users(id) ON DELETE CASCADE
      );
    `);
  }

  return database;
}

export type ContactSubmission = {
  id: number;
  name: string;
  email: string;
  company: string | null;
  message: string;
  submitted_at: string;
  ip_address: string | null;
  user_agent: string | null;
};

export type AdminUserRecord = {
  id: number;
  email: string;
  password_hash: string;
  password_salt: string;
};

export function findAdminUserByEmail(email: string) {
  return getDatabase()
    .prepare("SELECT id, email, password_hash, password_salt FROM admin_users WHERE email = ?")
    .get(email) as AdminUserRecord | undefined;
}

export function createAdminSession(userId: number, sessionToken: string, expiresAt: string) {
  getDatabase()
    .prepare("INSERT INTO admin_sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)")
    .run(userId, sessionToken, expiresAt);
}

export function findSession(sessionToken: string) {
  return getDatabase()
    .prepare(
      `SELECT admin_sessions.id, admin_sessions.user_id, admin_sessions.expires_at, admin_users.email
       FROM admin_sessions
       INNER JOIN admin_users ON admin_users.id = admin_sessions.user_id
       WHERE admin_sessions.session_token = ?`
    )
    .get(sessionToken) as
    | { id: number; user_id: number; expires_at: string; email: string }
    | undefined;
}

export function deleteSession(sessionToken: string) {
  getDatabase().prepare("DELETE FROM admin_sessions WHERE session_token = ?").run(sessionToken);
}

export function deleteExpiredSessions() {
  getDatabase()
    .prepare("DELETE FROM admin_sessions WHERE datetime(expires_at) <= datetime('now')")
    .run();
}

export function saveContactSubmission(input: {
  name: string;
  email: string;
  company?: string;
  message: string;
  ipAddress?: string;
  userAgent?: string;
}) {
  getDatabase()
    .prepare(
      `INSERT INTO contact_submissions (name, email, company, message, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(
      input.name,
      input.email,
      input.company?.trim() || null,
      input.message,
      input.ipAddress || null,
      input.userAgent || null
    );
}

export function getContactSubmissions() {
  return getDatabase()
    .prepare(
      `SELECT id, name, email, company, message, submitted_at, ip_address, user_agent
       FROM contact_submissions
       ORDER BY datetime(submitted_at) DESC`
    )
    .all() as ContactSubmission[];
}
