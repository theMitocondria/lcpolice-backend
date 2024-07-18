import express from "express";
import {
	getAllCheatersInContest,
	getAllContestCheatersSize,
	getAllContests,
	getAllContestSize,
	getCode,
} from "./Controller.js";
const appRouter = express.Router();

//get all contest
appRouter.get("/contest/all/", getAllContests);
//get all submissions of contest (q3,q4)
appRouter.get("/contest/:questionId", getAllCheatersInContest);
//get code of particular click
appRouter.get("/solution/:solutionId", getCode);
appRouter.get('/getAllContest', getAllContestSize)
appRouter.get('/getAllCheater/:id', getAllContestCheatersSize)

export default appRouter;
