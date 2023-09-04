import { ApolloServer } from 'apollo-server';
import resolvers from './resolvers';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const environment = process.env.NODE_ENV === 'development' ? 'dev': process.env.NODE_ENV;
require('dotenv').config({ path: `./environments/${environment}.env` })

const loadedTypeDefs = loadFilesSync(`${__dirname}/schemas`, { extensions: ['graphql'] });
const typeDefs = mergeTypeDefs(loadedTypeDefs);

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Servidor GraphQL arrancado en ${url}`);
});