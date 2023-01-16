import request from "supertest";
import app from "../app";
import httpStatus from "http-status";

describe("RUN Server", () => {
    it("Should start server", async () => {
        const response = await request(app).get("/").send();
        expect(response.type).toEqual("text/html");
        expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
});
