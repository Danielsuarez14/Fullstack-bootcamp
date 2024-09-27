import { Router } from "express";
const router = Router()
import{getTasks, getTask, create, update, deleteTask} from '../controllers/task.controllers.js'

router.get('/tasks',getTasks)
router.get('/tasks/:id',getTask)
router.post('/tasks',create)
router.put('/tasks/:id',update)
router.delete('/tasks/:id',deleteTask)
export default router