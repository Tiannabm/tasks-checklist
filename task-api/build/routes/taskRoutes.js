"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
//GET /tasks: returns a list of all tasks
router.get('/', taskController_1.allTasks);
// TESTER IN POSTMAN - GET /tasks by :id 
router.get('/:taskId', taskController_1.getTaskById);
//POST /tasks: creates a new task
router.post('/', taskController_1.newTask);
//PUT /tasks/:id: updates an existing task
router.put('/:taskId', taskController_1.updateTask);
//DELETE /tasks/:id: deletes an existing task
router.delete('/:taskId', taskController_1.deleteTask);
exports.default = router;
