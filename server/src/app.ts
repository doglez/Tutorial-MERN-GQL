import express from "express";
import { CORS_ADMIT_URL, NODE_ENV } from "./config/Config";
import morgan from "morgan";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";
import ErrorHandler from "./middleware/ErrorHandler";
import httpStatus from "http-status";

const app = express();
app.use(express.json());

if (NODE_ENV === "development" || NODE_ENV === "test") {
    app.use(morgan("dev"));
}

app.use(
    ExpressMongoSanitize({
        replaceWith: "_",
    })
);

app.use(helmet({ contentSecurityPolicy: false }));

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 1000000,
});
app.use(limiter);

app.use(hpp());

app.use(
    cors({
        origin: CORS_ADMIT_URL,
        credentials: true,
        optionsSuccessStatus: httpStatus.OK,
    })
);

app.use(ErrorHandler);

export default app;
