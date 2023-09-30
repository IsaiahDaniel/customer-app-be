import { connect } from "mongoose";


const connectDB = async () => {
    try {
        const mongoURI: any = process.env.NODE_ENV == "development" ? process.env.MONGO_URI : process.env.MONGO_URI_PROD;
        const conn = await connect(mongoURI);
        console.log(`MongoDB connected - ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error - ", error);
        // process.exit(1);
    }
}

export default connectDB;