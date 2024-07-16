import Solution from "./Models/Solution.js";
import Contest from "./Models/Contest.js";
import CheaterArray from "./Models/CheaterArray.js";
import { Types } from "mongoose";

export const getAllContests = async (req, res) => {
	try {
		const getAll = await Contest.aggregate([
			{
				$match: {},
			},
			{
				$lookup: {
					from: "solution",
					localField: "cheated3Sol",
					foreignField: "_id",
					as: "cheated3SolP",
					pipeline: [
						{
							$set: {
								id: "$_id",
							},
						},
						{
							$unset: "_id",
						},
					],
				},
			},
			{
				$lookup: {
					from: "solution",
					localField: "cheated4Sol",
					foreignField: "_id",
					as: "cheated4SolP",
					pipeline: [
						{
							$set: {
								id: "$_id",
							},
						},
						{
							$unset: "_id",
						},
					],
				},
			},
			{
				$lookup: {
					from: "cheater_array",
					localField: "question3",
					foreignField: "_id",
					as: "question3P",
					pipeline: [
						{
							$set: {
								id: "$_id",
							},
						},
						{
							$addFields: {
								num_of_cheaters: {
									$size: "$array_of_cheaters",
								},
							},
						},
						{
							$unset: ["_id", "array_of_cheaters"],
						},
					],
				},
			},
			{
				$lookup: {
					from: "cheater_array",
					localField: "question4",
					foreignField: "_id",
					as: "question4P",
					pipeline: [
						{
							$set: {
								id: "$_id",
							},
						},
						{
							$addFields: {
								num_of_cheaters: {
									$size: "$array_of_cheaters",
								},
							},
						},
						{
							$unset: ["_id", "array_of_cheaters"],
						},
					],
				},
			},
			{
				$set: {
					cheated3Sol: {
						$first: "$cheated3SolP",
					},
					cheated4Sol: {
						$first: "$cheated4SolP",
					},
					question4: {
						$first: "$question4P",
					},
					question3: {
						$first: "$question3P",
					},
					id: "$_id",
				},
			},
			{
				$unset: [
					"cheated3SolP",
					"cheated4SolP",
					"question3P",
					"question4P",
					"_id",
				],
			},
		]);
		getAll.reverse();
		return res.status(200).json({
			getAll,
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: error,
			success: false,
		});
	}
};
export const getAllCheatersInContest = async (req, res) => {
	try {
		const { questionId } = req.params;
		const { page_no, limit, username } = req.query;
		const page_No = Number(page_no) ?? 1;
		const limit_No = Number(limit) ?? 15;

		const cheaters = await CheaterArray.aggregate([
			{
				$match: {
					_id: new Types.ObjectId(questionId),
				},
			},
			{
				$project: {
					array_of_cheaters: true,
				},
			},
			{
				$unwind: "$array_of_cheaters",
			},
			{
				$replaceRoot: {
					newRoot: "$array_of_cheaters",
				},
			},
			{
				$match: {
					name_of_cheater: {
						$regex: username ?? "",
						$options: "i",
					},
				},
			},
			{
				$skip: (page_No - 1) * limit_No,
			},
			{
				$limit: limit_No,
			},
		]);

		return res.status(200).json({
			cheaters,
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false,
		});
	}
};

export const getCode = async (req, res) => {
	try {
		const { solutionId } = req.params;

		const solution = await Solution.findById(solutionId);

		return res.status(200).json({
			solution,
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
			success: false,
		});
	}
};
