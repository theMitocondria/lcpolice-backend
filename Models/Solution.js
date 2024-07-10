import mongoose from 'mongoose';

const SolutionSchema = new mongoose.Schema({
    rank: { type: Number, required: true },
    solution: { type: String, required: true },
    contestId: { type: String , required : true},
    solutionNumber : { type: Number, required: true  }
}, { collection: 'solution' });

const Solution = mongoose.model('Solution', SolutionSchema);

export default Solution;
