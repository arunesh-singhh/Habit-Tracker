import mongoose from 'mongoose';

const habitsSchema = new mongoose.Schema({
    // task name
    name: {
        type: String,
        require: true
    },
    // creation date
    createdAt: {
        type: String,
        require: true
    },
    // days on which the task is completed
    completedDays: {
        type: Number,
        require: true
    },
    // status of past week
    weeklyStatus: [{
        type: String,
        require: true
    }, ],
});

export const habitsModel = mongoose.model('Habits', habitsSchema);