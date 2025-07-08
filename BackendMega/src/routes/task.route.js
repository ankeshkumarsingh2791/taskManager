import express from 'express'
import {Router} from 'express'
import { isLoggedIn } from '../middleware/auth.middleware.js'
import { createTask } from '../controllers/task.controller.js'

const router = express.Router()

router.post('/create-task', isLoggedIn, createTask)

export default router;
