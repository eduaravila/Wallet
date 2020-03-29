//!!
//!! Eduardo avila 2020 21
//!!

import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import express_user_ip from "express-ip";
import cluster from "cluster";

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
      app.use(express_user_ip().getIpInfoMiddleware); //* get the user location data

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
        tracing: false,
        playground: true
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
