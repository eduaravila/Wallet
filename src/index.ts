//!!
//!! Eduardo avila 2020 21
//!!

import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import express_user_ip from "express-ip";
import cluster from "cluster";
import bp from "body-parser";

import { buildFederatedSchema } from "./helpers/buildFederatedSchema";
//?  decorators metadata

import connectDB from "./DB/index";
import { WalletResolver } from "./resolvers/WalletResolver";
import { RarityResolver } from "./resolvers/RarityResolver";
import { User, Arena } from "./schema/WalletSchema";
import { Badge, resolveBadgeReference } from "./schema/BadgesSchema";
import { BadgeResolver } from "./resolvers/BadgeResolver";

const PORT: string = process.env.PORT || "3000";
if (cluster.isMaster) {
  cluster.fork();

  cluster.on("exit", function(worker, code, signal) {
    cluster.fork();
  });
}
if (cluster.isWorker) {
  (async () => {
    try {
      // Initialize the app
      const app = express();
      app.use(
        /\/((?!graphql).)*/,
        bp.urlencoded({
          limit: "50mb",
          extended: true
        })
      );
      app.use(
        /\/((?!graphql).)*/,
        bp.json({
          limit: "50mb"
        })
      );
      app.use(express_user_ip().getIpInfoMiddleware); //* get the user location data
      app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*"); //* dominios por donde se permite el acceso
        res.setHeader(
          "Access-Control-Allow-Methods",
          "POST,GET,DELETE,UPDATE,PUT"
        ); //* metodos permitidos por el cliente
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Content-Type,Authorization"
        );
        //* dominios por donde se permite el acceso
        //* graph ql no envia una respuesta valida con el tipo options, cuando hay un tipo de request OPTIONS se retorna una respuesta con el estado 200
        // * graphql does not send a valid response when the OPTIONS request is received, if a OPTIONS request type is presented server return an empty response with the code 200
        if (req.method === "OPTIONS") {
          res.sendStatus(200);
        }
        next();
      });
      const server = new ApolloServer({
        schema: await buildFederatedSchema(
          {
            resolvers: [WalletResolver, RarityResolver, BadgeResolver],
            orphanedTypes: [User, Badge, Arena]
          },
          { Badge: { __resolveReference: resolveBadgeReference } }
        ),
        context: req => req,
        formatError: err => {
          return err;
        },
        playground: true,
        introspection: true
      });
      // The GraphQL endpoint

      server.applyMiddleware({ app, path: "/graphql" });

      // Start the server
      await connectDB();

      app.listen(PORT, () => {
        console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
      });
    } catch (error) {
      console.log(error);
    }
  })();
}
