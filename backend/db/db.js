const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// Create a JSON file for storing data
const adapter = new FileSync('db/db.json');
const db = low(adapter);

// Set default structure if not already present
db.defaults({ users: [], messages: [] }).write();

module.exports = db;