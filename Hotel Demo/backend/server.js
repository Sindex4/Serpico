const express = require('express');
const cors = require('cors');
const roomsRouter = require('./routes/rooms');
const bookingsRouter = require('./routes/bookings');
const db = require('./models/db'); // ensure db is initialized

const app = express();
app.use(cors());
app.use(express.json());

// mount routers
app.use('/rooms', roomsRouter);
app.use('/bookings', bookingsRouter);

// simple root route
app.get('/', (req, res) => {
  res.send('Hotel backend is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});