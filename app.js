const express = require('express');
const bodyParser = require('body-parser');
const { createHandler } = require('graphql-http/lib/use/express');
const resolvers = require('./resolvers');
const getGraphiQLHTML = require('./graphiql');
const graphqlSchema = require('./schema');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Event Booking System API');
});

app.get('/graphql', (req, res) => {
    res.type('html').send(getGraphiQLHTML());
});

app.post('/graphql', createHandler({
    schema: graphqlSchema,
    rootValue: resolvers,
}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});