const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ExpressError = require('../expressError');

module.exports = {
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
    login: async ({ email, password }) => {
        const user = await User.findOne({ email });
        if (!user) throw new ExpressError(401, 'User not found');

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) throw new ExpressError(401, 'Invalid password');

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { userId: user.id, token, tokenExpiration: 1 };
    }
};