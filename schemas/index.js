const { buildSchema } = require('graphql');

const graphqlSchema = buildSchema(`
    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }
    type User {
        _id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
    }
    type Booking {
        _id: ID!
        event: Event!
        user: User!
        createdAt: String!
        updatedAt: String!
    }
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }
    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: ID!
    }
    input UserInput {
        email: String!
        password: String!
    }
    type RootQuery {
        events: [Event!]!
        bookings: [Booking!]!
        login(email: String!, password: String!): AuthData
    }
    type RootMutation {
        createEvent(eventInput: EventInput!): Event!
        createUser(userInput: UserInput!): User!
        bookEvent(eventId: ID!, userId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);

module.exports = graphqlSchema;
