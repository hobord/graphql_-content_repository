// import { httpServer } from '../HttpServer';
// import { makeExecutableSchema } from 'graphql-tools';
// import { importSchema } from 'graphql-import'
// import resolvers from './resolvers';
import * as path from "path";
import { buildSchema } from 'type-graphql';
import { BasicPageContentResolver } from './resolvers/BasicPageContentResolver';


export async function addGrapQL(httpServer) {

  const schema = await buildSchema({
    resolvers: [BasicPageContentResolver],
    // automatically create `schema.gql` file with schema definition in current folder
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  // console.log(schema)

  // const typeDefs = importSchema('src/http/graphql/schemas/Schema.graphql');
  // const executableSchema = makeExecutableSchema({
  //   typeDefs,
  //   resolvers,
  // });

  const graphqlHTTP = require('express-graphql');

  httpServer.post('/graphql', graphqlHTTP({
    // schema: executableSchema,
    schema,
    graphiql: false
  }));

  httpServer.get('/graphql', graphqlHTTP({
    // schema: executableSchema,
    schema,
    graphiql: true
  }));

}
