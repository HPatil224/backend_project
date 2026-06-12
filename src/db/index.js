import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try{
        const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n Mongo db host name: ${connectioninstance.connection.host}`)
    }
    catch(error){
            console.log("Mongoose error: ", error)
            process.exit(1)
    }
}

export default connectDB