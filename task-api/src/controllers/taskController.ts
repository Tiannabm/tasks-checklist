import { RequestHandler } from "express";
import mysql, { MysqlError } from 'mysql';
import { Task } from "../models/task";


const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Password!',
    database: `mysql`
});

db.connect((err: MysqlError) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + db.threadId);
});


export const allTasks: RequestHandler = async (req, res, next) => {
    try {

        let taskList = await Task.findAll();

        if (taskList.length === 0) {
            return res.status(404).json({ message: 'No tasks found.' });
        } else {
            
            return res.status(200).json(taskList);
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const getTaskById: RequestHandler = async (req, res, next) => {
    try {
        let itemId = req.params.taskId;

        let currTask = await Task.findByPk(itemId);

        if (currTask) {
            return res.status(200).json(currTask);
        } else {
            return res.status(404).json({ message: 'No tasks found by id.' });
        }
       
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const deleteTask: RequestHandler = async (req, res, next) => {
    try {
            let itemId = parseInt(req.params.taskId);

            let deleted = await Task.destroy({
                where: { taskId: itemId }
            });

            if (deleted) {
                res.status(200).json('Task successfully deleted');
            } else {
                res.status(404).render('error', { message: 'Cannot find task'})
            }
       
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    
};


export const newTask: RequestHandler = async (req, res, next) => {
    try {
        let taskTotal = await Task.count() + 1;

        const addTask = await Task.create({
            taskId: taskTotal, 
            title: req.body.title, 
            completed: false
        });
        res.status(201).json(addTask); 

    } catch (error) {
        console.error("Error adding new task:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const updateTask: RequestHandler = async  (req, res, next) => {
   try {  
        const itemId = parseInt(req.params.taskId);

        const foundTask = await Task.findOne({
            where: { taskId: itemId }
        });

        if (foundTask) {
            
            await Task.update({ completed: true }, {
                where: { taskId: itemId }
            });
            res.status(200).json(foundTask);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error("Error updating tasks");
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
