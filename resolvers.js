const bcrypt = require('bcrypt');
const Event = require('./models/event');
const User = require('./models/user');
const Booking = require('./models/booking');
const ExpressError = require('./expressError');

const resolvers = {
    events: async () => {
        const events = await Event.find().populate('creator');
        return events.map(event => {
            return { ...event._doc, _id: event.id };
        });
    },
    bookings: async () => {
        const bookings = await Booking.find().populate('event').populate('user');
        return bookings.map(booking => {
            return { ...booking._doc, _id: booking.id };
        });
    },
    createEvent: async ({ eventInput }) => {
        const event = new Event({
            title: eventInput.title,
            description: eventInput.description,
            price: +eventInput.price,
            date: new Date(eventInput.date),
            creator: eventInput.creator
        });
        const result = await event.save();
        return { ...result._doc, _id: result.id };
    },
    createUser: async ({ userInput }) => {
        const existingUser = await User.findOne({ email: userInput.email });
        if (existingUser?.email) throw new ExpressError(400, 'User already exists with this email');

        const hashedPassword = bcrypt.hashSync(userInput.password, 12);
        const user = new User({
            email: userInput.email,
            password: hashedPassword
        });
        const result = await user.save();
        return { ...result._doc, _id: result.id, password: null };
    },
    bookEvent: async ({ eventId }) => {
        const event = await Event.findById(eventId);
        if (!event) throw new ExpressError(404, 'Event not found');
        const booking = new Booking ({
            event: eventId,
            user: '69b29694012e86494706b8d7' // Replace with actual user ID from authentication
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

module.exports = resolvers;
