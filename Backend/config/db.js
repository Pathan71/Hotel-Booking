import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"));
        await mongoose.connect(process.env.MONGO_URL)  
    } 
    catch (err) {
        console.log(err.message)
    }
}

export default connectDB;