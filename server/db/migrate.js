import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function runMigrations() {
  const migrationsDir = path.resolve(__dirname, 'migrations');

  if (!fs.existsSync(migrationsDir)) {
    console.error(`Migrations directory not found at ${migrationsDir}`);
    return;
  }

  // Create migrations tracker table if not exists
  db.exec(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  const isExecuted = db.prepare('SELECT name FROM _migrations WHERE name = ?');
  const recordMigration = db.prepare('INSERT INTO _migrations (name) VALUES (?)');

  let appliedCount = 0;

  for (const file of files) {
    const executed = isExecuted.get(file);
    if (!executed) {
      console.log(`Running migration: ${file}...`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      
      const transaction = db.transaction(() => {
        db.exec(sql);
        recordMigration.run(file);
      });
      
      transaction();
      appliedCount++;
      console.log(`✓ Applied migration: ${file}`);
    }
  }

  if (appliedCount === 0) {
    console.log('Database is already up to date. No new migrations.');
  } else {
    console.log(`Successfully applied ${appliedCount} migration(s).`);
  }
}

// Allow running directly via CLI (e.g. npm run migrate)
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('Starting database migrations...');
  runMigrations();
  console.log('Migration process finished.');
  process.exit(0);
}
