import Solution from "./Models/Solution.js";
import Contest from "./Models/Contest.js";

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
    const { contestId, questionId } = req.params;
    // console.log(params);
    const name = contestId.replace(/-/g, " ");
    console.log(name);
    const cheaters = await Contest.findOne({ name: name });
    console.log(cheaters);
    let cheaters_sol =
      Number(questionId) == 3 ? cheaters.question3 : cheaters.question4;
    cheaters_sol.sort((a, b) => a.rank - b.rank);
    console.log(cheaters_sol);
    return res.status(200).json({
      cheaters_sol,
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
    const { contestId, rank, questionId } = req.params;
    const str = String(contestId);
    const id = str.replace(/-/g, " ");
    console.log(id);
    const solution = await Solution.findOne({
      contestId: id,
      solutionNumber: Number(questionId),
      rank: rank,
    });

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
