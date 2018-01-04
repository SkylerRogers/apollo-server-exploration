import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { schema } from './src/schema';

const { port = 3000, NODE_ENV = 'development' } = process.env;
const app = express();

// Server Config
const config = {
  context: {},
  cacheControl: true,
  // tracing: NODE_ENV === 'development',
};

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, ...config }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(port);
