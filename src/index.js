const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const TrackAPI = require('./datasources/track-api');

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
    cors: {
      credentials: true,
      origin: ["https://catstronauts-1-client.herokuapp.com", "https://studio.apollographql.com"]
    },
    
  });

  const { url, port } = await server.listen({port: process.env.PORT || 4000});
  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);
