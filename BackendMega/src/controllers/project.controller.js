import { Project } from "../models/project.modle.js";
import { User } from "../models/user.model.js";
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"


const createProject = async (req, res) => {
    try {
        const {name, description} = req.body;
        const user = await User.findById(req.user._id);
        if(!user){
            throw new ApiError(404, "Invalid user")
        }
        const project = await Project.create({
            name,
            description,
            createdBy: user._id
        })
        await project.save();
        throw new ApiResponse(201, project, "project created successfully")

    } catch (error) {
        throw new ApiError(404, "Error while creating Project", Error)
    }
}   


const getAllProject = async (req, res) => {
    try {
        
        const projects = await Project.find({createdBy: req.User._id})
        if(!projects){
            throw new ApiError(404, "Project not found")
        }
        throw new ApiResponse(200, projects, "Projects fetched successfully")

    } catch (error) {
      throw new ApiError(404, "Error while fetching All projects", error)  
    }
}

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if(!project){
            throw new ApiError(404, "Project not found")
        }
        throw new ApiResponse(200, project, "Project fetched successfully")

    } catch (error) {
      throw new ApiError(404, "Error while fetching Project by ID", error)  
    }
}

const updateProject = async (req, res) => {
    try {
        const {name, description} = req.body;
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {name, description},
        )
        if(!project){
            throw new ApiError(404, "Project not found")
        }
        throw new ApiResponse(200, project, "Project updated successfully")


    } catch (error) {
        throw new ApiError(404, "Error while updating Project")
    }
}

const deleteProject = async(req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if(!project){
            throw new ApiError(404, "Project not found")
        }
        throw new ApiResponse(200, project, "Project deleted successfully")

    } catch (error) {
        throw new ApiError(404, "Error while deleting Project", error)

    }
}

export {
    createProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProject
}