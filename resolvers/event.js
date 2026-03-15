const Event = require('../models/event');

module.exports = {
    events: async () => {
        const events = await Event.find().populate('creator');
        return events.map(event => {
            return { ...event._doc, _id: event.id };
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
    }
};