import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './middlewares/log/Logger';
import { rateLimiterUsingThirdParty } from './middlewares/limit/RateLimiter';
import { globalErrorsHanlder } from './middlewares/exception/ErrorsHanlde';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute';
import classesRouter from './routes/classRoute';

// config
dotenv.config();
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({ origin: true, credentials: true }));
app.use(rateLimiterUsingThirdParty);
app.use(globalErrorsHanlder.handleRequestError);

// routes
app.get("/helloworld", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send("Hello you checked Me!");
});

// routes
app.use('/api/v1', userRouter);
app.use('/api/v1', classesRouter);


//connect mongodb
mongoose.connect(String(process.env.DB_CONN_URI), {
    dbName: process.env.DB_NAME,
}).then(() => {
    console.log("Connected to MongoDB successfully");

    // start server
    const port = process.env.PORT || 3000
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });

    logger.log({
        level: 'info',
        message: 'Start Server Successfully'
    });
}).catch((error: any) => {
    console.error("Error connecting to MongoDB:", error);
});
