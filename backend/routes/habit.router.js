import express from "express";
import { home, createHabit, habits, deleteHabit, toggleStatus } from "../controller/habit.controller.js";

const router = express.Router();

// calling controller for the home page
router.get('/', home);

// route to creating a new habit
router.post('/create-habit', createHabit);

// route for details page
router.get('/my-habits', habits);

// rout for delete habit
router.get('/delet', deleteHabit);

// route to change status on a task 
router.get('/my-habits/toggle-status', toggleStatus);

export default router;