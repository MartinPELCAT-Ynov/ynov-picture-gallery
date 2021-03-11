import "reflect-metadata";
import "./types";
import next from "next";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { useContainer } from "typeorm";
import { logger } from "./utils/logger-utils";
import Container from "typedi";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-koa";
import { resolvers } from "./gql/resolvers";
import { sessionMiddleware } from "./config/session";
import { nextRouter } from "./rest/controllers/next-controller";
import { connectDatabase } from "./utils/database-utils";

useContainer(Container);

const PORT = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const nextRoutes = nextRouter(handle, app);

export const server = async () => {
  return app.prepare().then(async () => {
    try {
      logger.info("Starting Application");

      const server = new Koa();

      await connectDatabase();

      server.use(bodyParser());
      server.use(sessionMiddleware(server));
      server.use(async (ctx, next) => {
        ctx.req.session = ctx.session; // Add session to req to be accessible in nextJS pages
        return next();
      });

      const schema = await buildSchema({
        resolvers,
        container: Container,
      });

      const apollo = new ApolloServer({
        schema,
        playground: {
          settings: {
            "request.credentials": "same-origin",
          },
        },
        context: async ({ ctx }) => ctx,
        formatError: (error) => ({ message: error.message }),
      });

      // Add all routes
      // server
      //   .use(installerController.routes())
      //   .use(installerController.allowedMethods());

      apollo.applyMiddleware({ app: server, path: "/api/gql" });
      server.use(nextRoutes.routes()).use(nextRoutes.allowedMethods());

      server.listen(PORT, () => {
        logger.info(`🚀 http://localhost:${PORT} `);
        logger.info(`🚀 http://localhost:${PORT}${apollo.graphqlPath}`);
      });
    } catch (error) {
      console.error(error);
      process.exit(0);
    }
  });
};
