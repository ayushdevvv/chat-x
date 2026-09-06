import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("The database is connected");

    } catch (error) {
        console.log("The database is not connected", error);

    }

}


export default connectDb