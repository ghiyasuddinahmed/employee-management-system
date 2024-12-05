import "reflect-metadata";
import express from 'express';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql/schema';
import { connectDB } from './config/db';
import { config } from './config/env';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Apollo Server
async function startServer() {
  const apolloServer = new ApolloServer({
    schema: await schema(),
    context: ({ req, res }) => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app as any, path: '/graphql' });

  const PORT = config.PORT;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/graphql`);
    });
  });
}

startServer();
