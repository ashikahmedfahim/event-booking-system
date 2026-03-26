import React from 'react'
import './Bookings.css'

const Bookings = () => {
    const [bookings, setBookings] = React.useState([]);

    const fetchBookings = async () => {
        const requestBody = {
            query: `
                query {
                    bookings {
                        _id
                        event {
                            title
                            date
                        }
                        user {
                            email
                        }
                        createdAt
                    }
                }
            `
        };
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        if (data.data && data.data.bookings) {
            setBookings(data.data.bookings);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        const requestBody = {
            query: `
                mutation CancelBooking($bookingId: ID!) {
                    cancelBooking(bookingId: $bookingId) {
                        _id
                    }
                }
            `,
            variables: {
                bookingId
            }
        };
        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        const data = await response.json();
        if (data.data && data.data.cancelBooking) {
            fetchBookings();
        }
    };

    React.useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className='bookings-page'>
            <h2 className='bookings-title'>Your Bookings</h2>
            <ul className='bookings-list'>
                {bookings.map(booking => (
                    <li key={booking._id} className='booking-item'>
                        <h3>{booking.event.title}</h3>
                        <p>Date: {new Date(booking.event.date).toLocaleDateString()}</p>
                        <p>Booked by: {booking.user.email}</p>
                        <p>Created At: {new Date(booking.createdAt).toLocaleDateString()}</p>
                        <button className='cancel-button' onClick={() => handleCancelBooking(booking._id)}>
                            Cancel Booking
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Bookings