import express from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import hpp from "hpp";

const app = express();

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

export default app;
