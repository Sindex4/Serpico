const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../hotel.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database at', dbPath);
  }
});

// create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      description TEXT,
      images TEXT,
      availability INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guestName TEXT,
      phone TEXT,
      roomBooked TEXT,
      checkin TEXT,
      checkout TEXT,
      status TEXT
    )
  `);

  // seed rooms if empty
  db.get(`SELECT COUNT(*) as count FROM rooms`, (err, row) => {
    if (err) return console.error(err);
    if (row.count === 0) {
      const stmt = db.prepare(`INSERT INTO rooms (name, price, description, images, availability) VALUES (?, ?, ?, ?, ?)`);
      stmt.run('Standard Room', 15000, 'Comfortable standard room with all basic amenities.', JSON.stringify(['room3.jpg','room3-2.jpg','room3-3.jpg']), 1);
      stmt.run('Deluxe Room', 20000, 'Spacious room with premium features and great view.', JSON.stringify(['room1.jpg','room1-2.jpg','room1-3.jpg']), 1);
      stmt.run('Suite', 35000, 'Luxury suite with separate living area and high-end services.', JSON.stringify(['room2.jpg','room2-2.jpg','room2-3.jpg']), 1);
      stmt.finalize();
      console.log('Seeded rooms table');
    }
  });
});

module.exports = db;