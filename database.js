import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

//function to connect to the database
const connectDatabase = async() => {
    try{
        mongoose.set('strictQuery', true);
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`badhiya ho database connect huya h :)`)
    }catch(e){
        console.log("failed to connected to databse, :(")
        console.log(e);
    }
}

export default connectDatabase;