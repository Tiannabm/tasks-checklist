import { Router } from "express";
import { allTasks, getTaskById, deleteTask, newTask, updateTask } from "../controllers/taskController";


const router = Router();


//GET /tasks: returns a list of all tasks
router.get('/', allTasks);

// TESTER IN POSTMAN - GET /tasks by :id 
router.get('/:taskId', getTaskById);

//POST /tasks: creates a new task
router.post('/', newTask);

//PUT /tasks/:id: updates an existing task
router.put('/:taskId', updateTask);

//DELETE /tasks/:id: deletes an existing task
router.delete('/:taskId', deleteTask);

export default router;