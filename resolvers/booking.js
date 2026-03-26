const Booking = require('../models/booking');
const Event = require('../models/event');
const ExpressError = require('../expressError');

module.exports = {
    bookings: async (args, req) => {
        const bookings = await Booking.find().populate('event').populate('user');
        return bookings.map(booking => {
            return { ...booking._doc, _id: booking.id, event: { ...booking.event._doc, date: new Date(booking.event._doc.date).toISOString() }, createdAt: new Date(booking._doc.createdAt).toISOString() };
        });
    },
    bookEvent: async ({ eventId, userId }) => {
        const event = await Event.findById(eventId);
        if (!event) throw new ExpressError(404, 'Event not found');
        const booking = new Booking({
            event: eventId,
            user: userId
        });
        const result = await booking.save();
        return { ...result._doc, _id: result.id };
    },
    cancelBooking: async ({ bookingId }) => {
        const booking = await Booking.findById(bookingId).populate('event');
        if (!booking) throw new ExpressError(404, 'Booking not found');
        const event = booking.event;
        await Booking.deleteOne({ _id: bookingId });
        return { ...event._doc, _id: event.id };
    }

};