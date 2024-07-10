import mongoose from 'mongoose';

const ContestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    question3: [] ,
    question4: [] , 
}, { collection: 'contest' });;

const Contest = mongoose.model('contest', ContestSchema);

export default Contest;
