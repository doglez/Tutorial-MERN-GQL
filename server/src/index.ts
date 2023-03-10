import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import https from "https";
import { HOST_NAME, NODE_ENV, PORT } from "./config/Config";
import CertificateOptions from "./certificate/CertificateOptions";
import app from "./app";
import colors from "colors";
import dbConnect from "./db/dbConnect";
import { resolvers, typeDefs } from "./graphql";

(async function () {
    colors.enable();
    dbConnect();

    interface MyContext {
        token?: String;
    }

    let httpServer: http.Server | https.Server;
    if (NODE_ENV === "production") {
        httpServer = https.createServer(CertificateOptions, app);
    } else {
        httpServer = http.createServer(app);
    }

    const server = new ApolloServer<MyContext>({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            NODE_ENV === "production"
                ? ApolloServerPluginLandingPageProductionDefault({
                      footer: false,
                  })
                : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
        ],
    });
    await server.start();

    app.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        bodyParser.json(),
        expressMiddleware(server, {
            context: async ({ req }) => ({ token: req.headers.authorization }),
        })
    );

    await new Promise<void>((resolve) =>
        httpServer.listen({ port: PORT }, resolve)
    );

    if (NODE_ENV === "production") {
        console.log("🚀 Server ready at", `${HOST_NAME}/graphql`.yellow);
    } else {
        console.log(
            "🚀 Server ready at",
            `${HOST_NAME}:${PORT}/graphql`.yellow
        );
    }
})();
