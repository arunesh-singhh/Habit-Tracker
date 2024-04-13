import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const baseUrl ='0.0.0.0:27017';

export const connectToDB = async() => {
    try {
        console.log(baseUrl)
        await mongoose.connect(`mongodb://${baseUrl}/HabitTracker`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB connected using mongoose");
    } catch (err) {
        console.log(err);
    }
}
