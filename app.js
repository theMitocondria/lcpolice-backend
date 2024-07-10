import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDatabase from './database.js';
import appRouter from './Router.js';

const app = express();

dotenv.config();
connectDatabase();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use("/api/v1/",appRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`port is running at ${port}`)
})