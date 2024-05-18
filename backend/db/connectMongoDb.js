import mongoose from "mongoose";

export default async function connectMongoDb(){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb connected")
    } catch (error) {
        console.log("Error connecting in mongoodb -> ",error.message);
    }
}

// export default connectMongoDb;