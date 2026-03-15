const express = require('express');
const bodyParser = require('body-parser');
const { createHandler } = require('graphql-http/lib/use/express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const resolvers = require('./resolvers');
const getGraphiQLHTML = require('./graphiql');
const graphqlSchema = require('./schemas');
const catchAsync = require('./catchAsync');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Event Booking System API');
});

app.get('/graphql', (req, res) => {
    res.type('html').send(getGraphiQLHTML());
});

app.post('/graphql', catchAsync(createHandler({
    schema: graphqlSchema,
    rootValue: resolvers,
})));

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Internal Server Error" } = err;
    res.status(statusCode).json({ error: message });
});

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

