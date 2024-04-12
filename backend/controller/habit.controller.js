import { habitsModel } from '../model/habit.schema.js';

export const home = async(req, res) => {
    // rendering homepage
    const myHabits = await habitsModel.find({});
    return res.render('home', {
        myHabits: myHabits
    });
}

// create a new Habit inside the database
export const createHabit = async(req, res) => {
    try {
        let date = new Date().toString(); // getting today's date
        date = `${date.slice(4,15)}`;

        const weekStatus = Array(7).fill(null); // weekly dates

        const doc = await habitsModel.create({
            name: req.body.name,
            createdAt: date,
            weeklyStatus: weekStatus,
            completedDays: 0
        });

        return res.redirect('back');
    } catch (error) {
        console.log(error);
        res.redirect('back');
    }
};

// to get list of all the days and dates in last week
const CalculateDayOfWeek = (date) => {
    var days = new Array();
    for (var i = 6; i >= 0; i--) {
        days[6 - i] = new Date(date.getFullYear(), date.getMonth(), date.getDate() - i).toString();
        days[6 - i] = `${days[6-i].slice(0,4)}, ${days[6-i].slice(4,11)}`;
    }
    return days;
}

// render all the habits with weekly status
export const habits = async(req, res) => {
    try {
        let date = new Date().toString();
        date = `${date.slice(0,3)},${date.slice(3,15)}`;
        const pastWeek = CalculateDayOfWeek(new Date());

        const myHabits = await habitsModel.find({});

        // render all the habits 
        return res.render('myHabits', {
            date: date,
            myHabits: myHabits,
            weekDays: pastWeek
        });

    } catch (error) {
        console.log(error);
        res.redirect('back');
    }
}

export const deleteHabit = async(req, res) => {
    try {
        let id = req.query.id;
        const habit = await habitsModel.findOne({ _id: id });
        await habit.deleteOne();


        res.redirect('back');
    } catch (error) {
        console.log(error);
        res.redirect('back');
    }
}

// for toggeling status of a habit on a specific day
export const toggleStatus = async(req, res) => {
    try {
        let id = req.query.id;
        let index = req.query.i;
        let status = req.query.status;

        const habit = await habitsModel.findOne({ _id: id });

        if (status === 'true') {
            if (habit.weeklyStatus[index] !== 'true') {
                habit.completedDays = habit.completedDays + 1;
            }
        } else {
            if (habit.weeklyStatus[index] === 'true') {
                habit.completedDays = habit.completedDays - 1;
            }
        }

        habit.weeklyStatus[index] = status;
        await habit.save();

        return res.redirect('back');
    } catch (err) {
        console.log(err.message);
        res.redirect('back');
    }
}