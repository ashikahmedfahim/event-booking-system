const Event = require('./models/event');

const resolvers = {
    events: () => {
        return Event.find().then(events => {
            return events.map(event => {
                return { ...event._doc, _id: event.id };
            });
        }).catch(err => {
            console.error('Error fetching events:', err);
            throw err;
        });
    },
    createEvent: ({ eventInput }) => {
        const event = new Event({
            title: eventInput.title,
            description: eventInput.description,
            price: +eventInput.price,
            date: new Date(eventInput.date)
        });
        return event.save().then((result) => {
            return { ...result._doc, _id: result.id };
        }).catch(err => {
            console.error('Error creating event:', err);
            throw err;
        });
    }
};

module.exports = resolvers;
