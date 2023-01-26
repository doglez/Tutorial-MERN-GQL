import express from "express";
// import { NODE_ENV } from "./config/Config";
// import morgan from "morgan";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import hpp from "hpp";
import ErrorHandler from "./middleware/ErrorHandler";

const app = express();

// if (NODE_ENV !== "production") {
//     app.use(morgan("dev"));
// }

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

app.use(ErrorHandler);

export default app;
