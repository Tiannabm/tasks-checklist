"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.newTask = exports.deleteTask = exports.getTaskById = exports.allTasks = void 0;
const mysql_1 = __importDefault(require("mysql"));
const task_1 = require("../models/task");
const db = mysql_1.default.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Password!',
    database: `mysql`
});
db.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});
const allTasks = async (req, res, next) => {
    try {
        let taskList = await task_1.Task.findAll();
        if (taskList.length === 0) {
            return res.status(404).json({ message: 'No tasks found.' });
        }
        else {
            return res.status(200).json(taskList);
        }
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.allTasks = allTasks;
const getTaskById = async (req, res, next) => {
    try {
        let itemId = req.params.taskId;
        let currTask = await task_1.Task.findByPk(itemId);
        if (currTask) {
            return res.status(200).json(currTask);
        }
        else {
            return res.status(404).json({ message: 'No tasks found by id.' });
        }
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.getTaskById = getTaskById;
const deleteTask = async (req, res, next) => {
    try {
        let itemId = parseInt(req.params.taskId);
        let deleted = await task_1.Task.destroy({
            where: { taskId: itemId }
        });
        if (deleted) {
            res.status(200).json('Task successfully deleted');
        }
        else {
            res.status(404).render('error', { message: 'Cannot find task' });
        }
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.deleteTask = deleteTask;
const newTask = async (req, res, next) => {
    try {
        let taskTotal = await task_1.Task.count() + 1;
        const addTask = await task_1.Task.create({
            taskId: taskTotal,
            title: req.body.title,
            completed: false
        });
        res.status(201).json(addTask);
    }
    catch (error) {
        console.error("Error adding new task:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.newTask = newTask;
const updateTask = async (req, res, next) => {
    try {
        const itemId = parseInt(req.params.taskId);
        const foundTask = await task_1.Task.findOne({
            where: { taskId: itemId }
        });
        if (foundTask) {
            await task_1.Task.update({ completed: true }, {
                where: { taskId: itemId }
            });
            res.status(200).json(foundTask);
        }
        else {
            res.status(404).json({ error: 'Task not found' });
        }
    }
    catch (error) {
        console.error("Error updating tasks");
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.updateTask = updateTask;
