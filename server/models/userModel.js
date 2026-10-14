import crypto from 'crypto';
import db from '../db/connection.js';

export const UserModel = {
  /**
   * Create a new user with secure password hash
   */
  create({ name, email, password_hash }) {
    const id = crypto.randomUUID();
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    const stmt = db.prepare(`
      INSERT INTO users (id, name, email, password_hash, created_at, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    stmt.run(id, trimmedName, normalizedEmail, password_hash);

    return this.findById(id);
  },

  /**
   * Find user by email (includes password_hash for authentication)
   */
  findByEmail(email) {
    if (!email) return null;
    const normalizedEmail = email.trim().toLowerCase();
    const stmt = db.prepare(`
      SELECT id, name, email, password_hash, created_at, updated_at
      FROM users
      WHERE email = ?
    `);
    return stmt.get(normalizedEmail) || null;
  },

  /**
   * Find user by ID (excludes password_hash for safe client consumption)
   */
  findById(id) {
    if (!id) return null;
    const stmt = db.prepare(`
      SELECT id, name, email, created_at, updated_at
      FROM users
      WHERE id = ?
    `);
    return stmt.get(id) || null;
  },

  /**
   * Check if an email is already registered
   */
  emailExists(email) {
    if (!email) return false;
    const normalizedEmail = email.trim().toLowerCase();
    const stmt = db.prepare('SELECT 1 FROM users WHERE email = ? LIMIT 1');
    return Boolean(stmt.get(normalizedEmail));
  }
};

export default UserModel;
