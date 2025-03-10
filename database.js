const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure the data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Initialize database
const db = new Database(path.join(dataDir, 'keskpank.db'));

// Enable foreign keys support
db.pragma('foreign_keys = ON');

// Initialize tables if they don't exist
const initDb = () => {
    // Create banks table
    db.exec(`
        CREATE TABLE IF NOT EXISTS banks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            apiKey TEXT NOT NULL UNIQUE,
            transactionUrl TEXT NOT NULL,
            bankPrefix TEXT NOT NULL UNIQUE,
            owners TEXT NOT NULL,
            jwksUrl TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log('SQLite database initialized');
};

// Helper functions
const getById = (tableName, id) => {
    const stmt = db.prepare(`SELECT * FROM ${tableName} WHERE id = ?`);
    return stmt.get(id);
};

const getBy = (tableName, field, value) => {
    const stmt = db.prepare(`SELECT * FROM ${tableName} WHERE ${field} = ?`);
    return stmt.get(value);
};

const getAll = (tableName, fields = ['*']) => {
    const fieldsStr = fields.join(', ');
    const stmt = db.prepare(`SELECT ${fieldsStr} FROM ${tableName}`);
    return stmt.all();
};

const insert = (tableName, data) => {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => '?').join(', ');
    const values = keys.map(key => data[key]);
    
    const stmt = db.prepare(`
        INSERT INTO ${tableName} (${keys.join(', ')})
        VALUES (${placeholders})
    `);
    
    const info = stmt.run(values);
    return { id: info.lastInsertRowid, ...data };
};

module.exports = {
    db,
    initDb,
    getById,
    getBy,
    getAll,
    insert
};