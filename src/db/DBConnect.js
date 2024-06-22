import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.DB_URI}/${process.env.DB_NAME}`
        );
        console.log(
            `\nMONGODB Connected !! DB Host: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MONGODB Connection Error", error);
        process.exit(1);
    }
};

export default connectDB;
