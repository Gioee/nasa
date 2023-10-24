import http from "http";
import Koa from 'koa';
import { ApolloServer } from "@apollo/server";
import { koaMiddleware } from "@as-integrations/koa";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs } from './utilities/typeDefs.js';
import { resolvers } from './utilities/resolvers.js';
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { GraphQLError } from "graphql";

const app = new Koa();
const httpServer = http.createServer(app.callback());

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
server.start().then(()=>{
  app.use(cors());
  app.use(bodyParser());
  app.use(
    koaMiddleware(server,{
      context: async ({ ctx }) => { 

        const token = ctx.headers.token
      
        if(token!='nasa'){ // simple authorization check from the header
          throw new GraphQLError('Bad token')
        }

        return token
      },
    })).listen(3000);
});