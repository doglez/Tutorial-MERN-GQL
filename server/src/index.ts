import colors from "colors";
import http from "http";
import https from "https";
import { HOST_NAME, NODE_ENV, PORT } from "./config/Config";
import CertificateOptions from "./certificate/CertificateOptions";
import app from "./app";
import { graphqlHTTP } from "express-graphql";
import schema from "./graphql/schema";
import dbConnect from "./db/dbConnect";

colors.enable();
dbConnect();

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

let server: https.Server | http.Server;

if (NODE_ENV === "production") {
    server = https.createServer(CertificateOptions, app).listen(PORT, () => {
        console.log(
            `Server running in ${NODE_ENV} mode on URL ${HOST_NAME}`.yellow
        );
    });
} else {
    server = app.listen(PORT, () => {
        console.log(
            `Server running in ${NODE_ENV} mode on URL ${HOST_NAME}:${PORT}`
                .yellow
        );
    });
}

process.on("unhandledRejection", (reason: Error) => {
    console.log(`Error: ${reason}`.bgRed);
    server.close(() => process.exit(1));
});
