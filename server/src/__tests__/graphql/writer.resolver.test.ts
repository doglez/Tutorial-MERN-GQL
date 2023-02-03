import colors from "colors";
import dbConnect from "../../db/dbConnect";
import mongoose from "mongoose";
import request from "supertest";
import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from "../../graphql";
import app from "../../app";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

interface MyContext {
    token?: String;
}

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
});

describe("Show Writer Resolver", () => {
    beforeAll(async () => {
        colors.enable();
        dbConnect();
        await server.start();
        app.use(
            "/graphql",
            cors<cors.CorsRequest>(),
            bodyParser.json(),
            expressMiddleware(server)
        );
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await server.stop();
    });

    it("should return a list of writers", async () => {
        const queryData = {
            query: `
            query {
                getWriters {
                    name
                }
            }
        `,
        };

        const response = await request(app).post("/graphql").send(queryData);

        expect(response.status).toBe(200);
        expect(response.body.data.getWriters[0].name).toBe(
            "F. Scott Fitzgerald"
        );
    });
});
