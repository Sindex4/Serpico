# Hotel Demo Backend

This simple Node.js/Express backend provides a REST API to support the hotel website. It uses SQLite for storage so you can run everything locally without additional dependencies.

## Features

1. **Rooms storage** – name, price, description, images, availability. Seed data is inserted automatically on first run.
2. **Bookings storage** – guest name, phone, room booked, check-in/out dates, and a status field.
3. **API endpoints**
   - `GET /rooms` &rarr; list all rooms
   - `GET /rooms/:id` &rarr; get a single room
   - `POST /bookings` &rarr; create a booking (body must contain `guestName`, `phone`, `roomBooked`, `checkin`, `checkout`)
   - `GET /bookings` &rarr; list all bookings
4. CORS enabled for use from the static frontend.

## Setup Instructions (SQLite)

1. **Prerequisites**
   - Install [Node.js](https://nodejs.org/) (14+ recommended).
   - Optionally install `nodemon` globally for development (`npm install -g nodemon`).

2. **Install dependencies**
   ```bash
   cd "c:\Users\ereku\Desktop\Hotel Demo\backend"
   npm install
   ```

3. **Start the server**
   ```bash
   npm run start
   # or for auto‑reloading during development:
   npm run dev
   ```

   The server will create `hotel.db` in the backend folder and build the tables. You'll see console messages for the database connection and seeded rooms.

4. **Test the API**
   Use `curl`, Postman, or your browser:
   ```bash
   curl http://localhost:3000/rooms
   curl http://localhost:3000/bookings
   curl -X POST http://localhost:3000/bookings \
        -H "Content-Type: application/json" \
        -d '{"guestName":"Jane Doe","phone":"123456","roomBooked":"Suite","checkin":"2026-04-01","checkout":"2026-04-05"}'
   ```

## Connecting the Frontend

The booking form (`Book.html`) already has JavaScript (`booking.js`) wired up to send a POST request to `http://localhost:3000/bookings`. Start the backend and then open `Book.html` in a browser; form submissions will be stored in the database.

If you serve the static site via a local web server (e.g. `http-server` or `live-server`), make sure it is allowed by CORS (the backend is configured with `cors()` which opens it to all origins).

## Using MySQL Instead

If you prefer MySQL, you can swap out the `sqlite3` dependency and modify `models/db.js` accordingly:

1. Install `mysql2` and `sequelize` or use raw `mysql2` connection.
2. Update the connection logic and table creation.
3. Ensure a running MySQL server and update connection credentials.

The route handlers remain the same – just adjust the SQL dialect.

## Optional Notifications

To send a WhatsApp or email alert when a booking arrives, add a library such as:

- [Twilio](https://www.twilio.com/docs/quickstart/node/whatsapp) for WhatsApp
- [Nodemailer](https://nodemailer.com/about/) for email

Trigger the notification inside the `POST /bookings` handler after the database insert. Keep your API keys in environment variables or a `.env` file.

## Notes

- The database file `hotel.db` will live alongside `server.js`; you can delete it to reset the data.
- Additional endpoints (e.g. `PUT /bookings/:id` to update status) can be added as needed.
- This backend is intentionally simple so it integrates easily with your existing static Bootstrap site.
