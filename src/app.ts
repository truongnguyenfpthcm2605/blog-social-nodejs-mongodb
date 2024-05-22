import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import logger from './middlewares/log/Logger';
import { rateLimiterUsingThirdParty } from './middlewares/limit/RateLimiter';
import { globalErrorsHanlder } from './middlewares/exception/ErrorsHanlde';
import { collections,connectToDatabase } from './config/MongoDB.config';
import User from './model/user';
import { ObjectId } from 'mongodb';
// config
dotenv.config();
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(rateLimiterUsingThirdParty);
app.use(globalErrorsHanlder.handleRequestError);

// routes
app.get("/hello",(req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send( "Hello you checked Me!");
});


app.get("/user", async (req: Request, res: Response) => {
    try {
        if (!collections.user) {
            throw new Error("Collection not initialized");
        }

        const users = await collections.user.find({}).toArray() as unknown as User[];
        res.status(200).send(users);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

app.get("/user/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        if (!collections.user) {
            throw new Error("Collection not initialized");
        }

        const query = { _id: new ObjectId(id) };
        const user = await collections.user.findOne(query) as User | null;

        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send(`No user found with id: ${id}`);
        }
    } catch (error) {
        res.status(500).send(`Unable to find matching document with id: ${id}`);
    }
});




const port = process.env.PORT || 3000
connectToDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });


logger.log({
    level: 'info',
    message: 'Start Server Successfull'
});
