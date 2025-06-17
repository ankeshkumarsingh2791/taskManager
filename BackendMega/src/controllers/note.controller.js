import {ApiError} from "../utils/apiError.js"
import { Project } from "../models/project.modle.js"
import {ProjectNote} from "../models/note.modle.js"
import {ApiResponse} from "../models"
import mongoose from "mongoose"
const getNotes = async(req, res) => {
    const {projectId} = req.params
    const project = await Project.findById(projectId)
    if(!project){
        throw new ApiError(401, "project not found");
    }

    const notes = await ProjectNote.find({
        project: new mongoose.Types.ObjectId(projectId)
    }).populate("createdBy", "username fullName avatar")

    return res.status(200).json(new ApiResponse(200, notes, "Notes fetched successfully"))

}

const getNotesById = async (req,res) => {
    const {noteId} = req.params;

    const Note = await ProjectNote.findById(noteId).populate(
        "createdBy",
        "username fullname avatar"
    )

    if(!Note){
        throw new ApiError(401, "Note not found")
    }
    res.status(200).json(new ApiError(200, Note, "notes fetched " ))

}

const createNote = async(req, res) => {
    const {projectId} = req.params;
    const {content} = req.body

    const project = await Project.findById(projectId)
    if(!project){
        throw new ApiError(401, "project not found")
    }

    const note =  ProjectNote.create({
        project: new mongoose.Types.ObjectId(projectId),
        content,
        createdBy: new mongoose.Types.ObjectId(req.user._id)
    })

    const populateNote = await ProjectNote.findById(note._id).populate(
        "createBy",
        "username, fullname avatar"
    )

    return res.status(200).json(new ApiResponse(200, populateNote, "Note created successfully"))
}

const updateNote = async (req, res) => {
    const {noteId} = req.params
    const {content} = req.body

    const existingNote = await ProjectNote.findById(noteId)

     if(!existingNote){
        throw new ApiError(401, "note not found");
    }

    const updatedNote = ProjectNote.findByIdAndUpdate(
        noteId,
        {content},
        {new: true}
    ).populate(
        createdBy,
        "username fullname avatar"
    )
    return res.status(200).json(new ApiResponse(200, updateNote, "Note updated successfully"))


}

const deleteNote = async (req, res) => {
    const {noteId} = req.params

    const note = ProjectNote.findByIdAndDelete(noteId)

     if(!note){
        throw new ApiError(401, "Note not found");
    }
    return res.status(200).json(new ApiResponse(200, note, "Note deleted successfully"))
}

export {
    getNotes,
    getNotesById,
    deleteNote,
    updateNote,
    createNote
}