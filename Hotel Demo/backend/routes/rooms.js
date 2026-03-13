const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET /rooms → return all rooms
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM rooms';
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    // parse images JSON before sending
    const data = rows.map(r => ({ ...r, images: JSON.parse(r.images || '[]') }));
    res.json(data);
  });
});

// GET /rooms/:id → single room
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM rooms WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Room not found' });
    row.images = JSON.parse(row.images || '[]');
    res.json(row);
  });
});

module.exports = router;