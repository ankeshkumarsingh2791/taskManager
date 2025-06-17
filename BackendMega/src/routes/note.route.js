import {Router} from "express"
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants"
import {createNote, deleteNote, getNotes, getNotesById, updateNote } from "../controllers/note.controller.js"

const router = Router()

router.route("/:projectId")
.get( validateProjectAccess(AvailableUserRoles), getNotes)
.post(validateProjectAccess([UserRolesEnum.ADMIN]), createNote)

router.route("/:projectId/n/:noteId")
.get(validateProjectAccess(AvailableUserRoles), getNotesById)
.put(validateProjectAccess([UserRolesEnum.ADMIN]), updateNote)
.delete(validateProjectAccess([UserRolesEnum.ADMIN]), deleteNote)