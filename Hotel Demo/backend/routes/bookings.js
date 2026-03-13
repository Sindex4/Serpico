const express = require('express');
const router = express.Router();
const db = require('../models/db');

// POST /bookings → create new booking request
router.post('/', (req, res) => {
  const { guestName, phone, roomBooked, checkin, checkout } = req.body;
  const status = 'pending';
  const sql = `INSERT INTO bookings (guestName, phone, roomBooked, checkin, checkout, status)
               VALUES (?,?,?,?,?,?)`;
  db.run(sql, [guestName, phone, roomBooked, checkin, checkout, status], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      id: this.lastID,
      guestName,
      phone,
      roomBooked,
      checkin,
      checkout,
      status,
    });
  });
});

// GET /bookings → list all bookings
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM bookings';
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;