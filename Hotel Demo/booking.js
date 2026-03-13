// Booking script now sends data to backend
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const guestName = `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`;
        const phone = document.getElementById('phone').value;
        const roomBooked = document.getElementById('roomType').selectedOptions[0].text;
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;

        const payload = { guestName, phone, roomBooked, checkin, checkout };

        try {
            const res = await fetch('http://localhost:3000/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert('Thank you! Your booking request has been sent. We will contact you soon.');
                bookingForm.reset();
            } else {
                const err = await res.json();
                alert('Failed to send booking: ' + err.error);
            }
        } catch (error) {
            console.error(error);
            alert('Error sending booking. Check console for details.');
        }
    });
}
