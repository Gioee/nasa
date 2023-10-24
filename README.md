# Nasa project

This project is a GraphQL service for interstellar space flight booking.

## Technical specifications

### Tech stack

- Node.js using TypeScript
- Koa framework for middleware handling
- PostgreSQL database for storage
- Apollo server for GraphQL server
- Docker for database server
- Knex.js for queries building
- Jest for unit testing
- Git for code versioning

### The server

- The server is secured by a simple bearer token
- The server runs on port `3000`
- The graphql endpoint is accessible at `/graphql`

## Functional specifications

With this service you can get informations about planets, space centers, flights and bookings and you can schedule and book flights.

Every i/o variable is checked with TypeScript native type checking and with GraphQLScalarType type check.

Queries, mutations, migrations and seedings are made with Knex.js.

The GraphQL server is run with Apollo Server as a Koa middleware.

