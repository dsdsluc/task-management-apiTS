import mongoose from "mongoose"

export const connect = async () : Promise<void> =>{
    try {
        const mongooseUrl = process.env.MONGOOSE_URL
        await mongoose.connect(mongooseUrl);
        console.log("Connect Success!")
    } catch (error) {
        console.log("Connect Error!")
    }
}