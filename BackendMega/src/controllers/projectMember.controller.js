import { Project } from '../models/project.model.js';
import { ProjectMember } from '../models/projectMember.model.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { UserRolesEnum, AvailableUserRoles } from '../utils/constants.js';
import asyncHandler from 'express-async-handler';


const createProject = async (req, res) => {
  // create project
 try {
   const {name, description} = req.body;
   if(!name || !description){
     throw new ApiError(400, "Name and description  are required");
   }
   const existingProject = await Project.findOne({name});
   if(existingProject){
     throw new ApiError(400, "Project with this name already exists");
   }
   const newProject = await Project.create({
     name,
     description,
     createdBy: req.params.User._id
   });
   if(!newProject){
     throw new ApiError(500, "Something went wrong while creating new project")
   }
   const newProjectMember = await ProjectMember.create({
     user: req.params.User._id,
     project: newProject._id,
     role: UserRolesEnum.ADMIN
   });
   if(!newProjectMember){
     throw new ApiError(500, "Something went wrong while adding project member")
   }
   throw new ApiResponse(201, "Project created successfully", {
     project: {
       id: newProject._id,
       name: newProject.name,
       description: newProject.description,
       createdBy: newProject.createdBy
     }
   });
 } catch (error) {
  console.log(error);
  throw new ApiError(401, "Something went wrong while creating project")
  
 }

};



const getProjects = async (req, res) => {
  // get all projects
  try {
    const projects = await Project.find({createdBy: req.params.User._id})
    if(!projects || projects.length === 0){
      throw new ApiError(404, "No projects found for this user");
    }
    throw new ApiResponse(200, "Project fetched successfully",{
      projects: projects.map(project => ({
        id: project._id,
        name: project.name,
        description: project.description,
        createdBy: project.createdBy
      }))
    })
  
  } catch (error) {
    console.log(error);
    throw new ApiError(401, "Something went wrong while fetching projects");
  }
};

const getProjectById = async (req, res) => {
  // get project by id
  try {
    const project = await Project.findById({_id: req.params.ProjectId, createdBy: req.params.User._id});
    if(!project){
      throw new ApiError(404, "Project not found")
    }
    throw new ApiResponse(200, "Project fetched successfully", {
      project: {
        id: project._id,
        name: project.name,
        description: project.description,
        createdBy: project.createdBy
      }
    });

  } catch (error) {
    console.log(error);
    throw new ApiError(401, "Something went wrong while fetching project by id");
    
  }
};


const updateProject = async (req, res) => {
  // update project
  try{
    const {name, description}= req.body;
    if(!name || !description){
      throw new ApiError(400, "name and description is required");
    }
    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      { name, description },
      { new: true}   // new: true will return the updated document
    )
    if(!project){
      throw new ApiError(404, "Project not found");
    }
    throw new ApiResponse(200, "Project updated successfully", {
      project: {
        id: project._id,
        name: project.name,
        description: project.description,
        createdBy: project.createdBy
      }
    });

  } catch(error){
    console.log(error);
    throw new ApiError(401, "Something went wrong while updating Project")
  }
};

const deleteProject = async (req, res) => {
  // delete project
  try {
    const user = req.params.User._id;
    if(user.role === UserRolesEnum.MEMBER){
      throw new ApiError(403, "You are not allowed to delete this project");
    }

    const project = await Project.findByIdAndDelete(req.params.projectId)
    if(!project){
      throw new ApiError(404, "Project not found")
    }
    throw new ApiResponse(200, "Project deleted successfully")


  } catch (error) {
    console.log(error);

  }
};

const getProjectMembers = async (req, res) => {
  // get project members
};

const addMemberToProject = async (req, res) => {
  // add member to project
  
};

const deleteMember = async (req, res) => {
  // delete member from project
};

const updateMemberRole = async (req, res) => {
  // update member role
};

export {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
};
