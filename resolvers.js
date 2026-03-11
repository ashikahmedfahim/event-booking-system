const resolvers = {
    events: () => ['Event 1', 'Event 2'],
    createEvent: ({ name }) => name,
};

module.exports = resolvers;
