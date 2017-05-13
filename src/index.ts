import * as express from 'express';
import * as cors from 'cors';
import * as graphqlHttp from 'express-graphql';
import { query } from './queries';
import { mutation } from './mutations';
import * as dotenv from 'dotenv';
import * as documentdb from 'documentdb';
dotenv.config()

const documentDbClient = new documentdb.DocumentClient(process.env.AZURE_DOCUMENTDB_HOST, {
  masterKey: process.env.AZURE_DOCUMENTDB_PRIMARY_KEY
})

const graphql = require('graphql');
const schema = new graphql.GraphQLSchema({
  query,
  mutation
});

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('x-request-id', 'OThkMTMwNWU3N2JlNWM2NDNiNzA1NWUyYTQ5Y2EyMTgwZmQxYjU1ZWU1MmQyYjBmMjc0MmNkMDFlYzNmZWJiYQ==');
  if (next) next();
});

app.use('/graphql', graphqlHttp({
  schema,
  graphiql: true,
  pretty: true,
  formatError: (error: any) => {
    return {
      message: error.message,
      locations: error.locations,
      stack: error.stack
    };
  }
}));

app.get('/', (req, res) => {
  res.send(200, "GraphQL server running...");
});

const port = process.env.PORT || 4000;
console.log(`GraphQL started on port: ${port}`);
app.listen(port);