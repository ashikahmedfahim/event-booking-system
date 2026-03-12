const events = [];

const resolvers = {
    events: () => events,
    createEvent: ({ eventInput }) => {
        const event = {
            _id: Math.random().toString(),
            title: eventInput.title,
            description: eventInput.description,
            price: +eventInput.price,
            date: eventInput.date
        };
        events.push(event);
        return event;
    }
};

module.exports = resolvers;
