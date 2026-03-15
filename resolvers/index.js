const authResolvers = require('./auth');
const bookingResolvers = require('./booking');
const  eventResolvers = require('./event');

const resolvers = {
    ...authResolvers,
    ...bookingResolvers,
    ...eventResolvers
};

module.exports = resolvers;
