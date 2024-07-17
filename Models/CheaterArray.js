import mongoose, { Schema } from "mongoose";

const CheaterArraySchema = new mongoose.Schema(
	{
		array_of_cheaters: {
			type: [
				{
					name_of_cheater: String,
					plagpercentage: Number,
					rank: Number,
					code: Schema.Types.ObjectId,
				},
			],
		},
	},
	{ collection: "cheater_array" }
);

const CheaterArray = mongoose.model("cheater_array", CheaterArraySchema);

export default CheaterArray;
