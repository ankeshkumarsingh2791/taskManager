import {Router} from 'express'
import express from 'express'
import { createProject, deleteProject, getProjectById, getProjects, updateProject } from '../controllers/projectMember.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/create-project', isLoggedIn, createProject)
router.get('/project-id', isLoggedIn, getProjectById)
router.get('/all-project', isLoggedIn, getProjects)
router.patch('/update-project', updateProject)
router.delete('/project-delete', deleteProject)

export default router

