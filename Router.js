import express from "express";
import { getAllCheatersInContest, getAllContests, getCode } from "./Controller.js";
const appRouter = express.Router();

//get all contest
appRouter.get("/contest/all/", getAllContests);
//get all submissions of contest (q3,q4)
appRouter.get("/contest/:questionId", getAllCheatersInContest)
//get code of particular click
appRouter.get("/solution/:contestId/rank/:rank/:questionId", getCode);

export default appRouter;