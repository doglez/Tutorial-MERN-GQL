import colors from "colors";
import dbConnect from "../db/dbConnect";
import mongoose from "mongoose";
import request from "supertest";
import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from "../graphql";
import app from "../app";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import Writer from "../models/Writer";

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

        const newWriter = new Writer({
            _id: "63dda00ed046ae063d9190fc",
            name: "Carlos",
            born: "1919-01-01",
            died: "1940-12-21",
            nationality: "American",
            image_url: "https://www.example.com",
            biography:
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
        });

        await newWriter.save();
    });

    afterAll(async () => {
        const deleteWriter = await Writer.findOne({ name: "Fake" });
        await deleteWriter?.remove();

        await server.stop();
        await mongoose.disconnect();
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

    it("should return a writer", async () => {
        const queryData = {
            query: `
                query {
                    showWriter(id: "63d5cd6f487dc70f92ae78af") {
                        name
                    }
                }                
            `,
        };

        const response = await request(app).post("/graphql").send(queryData);

        expect(response.status).toBe(200);
        expect(response.body.data.showWriter.name).toBe("J.D. Salinger");
    });

    it("should return an error if not exist writer", async () => {
        const queryData = {
            query: `
                query {
                    showWriter(id: "63d5cd6f487dc70f92ae78a1") {
                        name
                    }
                }                
            `,
        };

        const response = await request(app).post("/graphql").send(queryData);

        expect(response.status).toBe(404);
        expect(response.body.errors[0].message).toBe(
            "Writer not found with id 63d5cd6f487dc70f92ae78a1"
        );
    });

    it("should return an error Resource not found if the format is incorrect", async () => {
        const queryData = {
            query: `
                query {
                    showWriter(id: "63d5cd6f487dc70f92ae78a") {
                        name
                    }
                }                
            `,
        };

        const response = await request(app).post("/graphql").send(queryData);

        expect(response.status).toBe(404);
        expect(response.body.errors[0].message).toBe("Resource not found");
    });

    it("should create a writer", async () => {
        const queryData = {
            query: `
                mutation {
                    createWriter(
                        name: "Fake"
                        born: "1919-01-01"
                        died: "1940-12-21"
                        nationality: "American"
                        image_url: "https://www.example.com"
                        biography: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu") {
                        id
                        name
                    }
                }
            `,
        };

        const response = await request(app).post("/graphql").send(queryData);

        expect(response.status).toBe(200);
        expect(response.body.data.createWriter.name).toBe("Fake");
    });

    it("should return an error of validation name", async () => {
        const queryData = {
            query: `
                mutation {
                    createWriter(
                        name: "a"
                        born: "1919-01-01"
                        died: "1940-12-21"
                        nationality: "American"
                        image_url: "https://www.example.com"
                        biography: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu") {
                        id
                        name
                    }
                }
            `,
        };

        const response = await request(app).post("/graphql").send(queryData);

        expect(response.status).toBe(400);
        expect(response.body.errors[0].message).toBe(
            "Name must be at least 3 characters."
        );
    });

    it("should update a writer", async () => {
        const queryData = {
            query: `
                mutation {
                    updateWriter(id: "63dda00ed046ae063d9190fc", name: "Thor") {
                        name
                    }
                }                
            `,
        };

        const response = await request(app).post("/graphql").send(queryData);

        expect(response.status).toBe(200);
        expect(response.body.data.updateWriter.name).toBe("Thor");
    });

    it("should delete a writer", async () => {
        const queryData = {
            query: `
                mutation {
                    deleteWriter(id: "63dda00ed046ae063d9190fc") {
                        name
                    }
                }                
            `,
        };

        const response = await request(app).post("/graphql").send(queryData);

        expect(response.status).toBe(200);
        expect(response.body.data.deleteWriter.name).toBe("Thor");
    });
});
