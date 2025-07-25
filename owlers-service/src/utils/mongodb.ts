import { connect } from "mongoose";
import { mongodb } from "../config";

export const connectToDB = async () => {
    try {
        const db = await connect(mongodb.MONGODB_URI);
        console.log(`mongodb connected`);
        return db;
    } catch (err) {
        console.log("failed to connect to mongodb", err);
    }
}
