const bcrypt = require('bcrypt');
const Event = require('./models/event');
const User = require('./models/user');
const ExpressError = require('./expressError');

const resolvers = {
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
    }
};

module.exports = resolvers;
