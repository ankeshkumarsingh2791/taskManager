import { Project } from '../models/project.modle.js';
import { ProjectMember } from '../models/projectMember.modle.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import {User} from '../models/user.modles.js'
import { UserRolesEnum, AvailableUserRoles } from '../utils/constants.js';



const createProject = async (req, res) => {
  // create project
 try {
   const {name, description} = req.body;
   const userId = req.query.userId || req.params.userId // get userId from query or params
   console.log("userId ....", userId);
   if(!name || !description ||!userId ){
     throw new ApiError(400, "Name and description  are required");
   }
   const existingProject = await Project.findOne({name});
   if(existingProject){
     throw new ApiError(400, "Project with this name already exists");
   }
   const newProject = await Project.create({
     name,
     description,
     createdBy: userId
   });
   await newProject.save()
   if(!newProject){
     throw new ApiError(500, "Something went wrong while creating new project")
   }
   const newProjectMember = await ProjectMember.create({
     user: userId,
     project: newProject._id,
     role: UserRolesEnum.ADMIN
   });
   if(!newProjectMember){
     throw new ApiError(500, "Something went wrong while adding project member")
   }
    new ApiResponse(201, "Project created successfully", {
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
    // user id;
    const userId = req.user._id;

    // fetch all project from DB;
    const projects = await Project.find({createdBy: userId})

    // send it to frontend
    if(!projects || projects.length === 0){
      throw new ApiError(404, "No projects found for this user");
    }
     
    res.status(200).json(new ApiResponse(200, projects,"Project fetched successfully"))
  
  } catch (error) {
    console.log(error);
    throw new ApiError(401, "Something went wrong while fetching projects");
  }
};

const getProjectById = async (req, res) => {
  // get project by id
  try {
    const userId = req.user._id
    const projectId = req.query.projectId || req.params.projectId
    const project = await Project.findById({_id: projectId, createdBy: userId});
    if(!project){
      throw new ApiError(404, "Project not found")
    }
     new ApiResponse(200,  {
      project: {
        id: project._id,
        name: project.name,
        description: project.description,
        createdBy: project.createdBy
      }
    },"Project fetched successfully",);

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
  try {
    
    const project = await Project.findById(req.params.projectId);
    if(!project){
      throw new ApiError(401, "Project not found")
    }

    const members = await ProjectMember.find({project: project._id}).populate('user', 'name email');
    if(!members || members.length === 0){
      throw new ApiError(404, "No members found for this project");
    }
    throw new ApiResponse(200, "Project members fetched successfully", {
      members: members.map(member => ({
        id: member._id,
        user: {
          id: member.user._id,
          name: member.user.name,
          email: member.user.email
        },
        project: member.project,
        role: member.role,


      }))

    })
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong while fetching project members");
    
  }
};

const addMemberToProject = async (req, res) => {
  // add member to project
try {
    const {email, name} = req.body;
    if(!email || !name){
      throw new ApiError(400, "Email and name is required");
    }
    const user = await User.findOne({email});
    if(!user){
      throw new ApiError(404, "User not found with this email");
  
    }
    const project = await Project.findById(req.params.projectId);
    if(!project){
      throw new ApiError(401, "Project not found");
    }
    if(project.createdBy.toString() !== req.params.User._id.toString()){
      throw new ApiError(401, "You are not allowed")
    }
    const existingMember = await ProjectMember.findOne({
      user: user._id,
      project: project._id
    })
    if(existingMember){
      throw new ApiError(400, "User is already a member of this project");
    }
    const newMember = await ProjectMember.create({
      user: user._id,
      project: project._id,
      role: AvailableUserRoles.MEMBER // default role
    });
    if(!newMember){
      throw new ApiError(500, "Something went wrong while adding member to project");
    }
    throw new ApiResponse(201, "Member added to project successfully", {
      member: {
        id: newMember._id,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        project: project._id,
        role: newMember.role
      }
    });
} catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong while adding member to project");
  }
  
}




const deleteMember = async (req, res) => {
  // delete member from project
  const {projectId} =req.params;
  const {memberId} = req.params;
  try {
    const project = await Project.findById(projectId);
    if(!project){
      throw new ApiError(404, "Project not found");
    }
    const member  = await ProjectMember.findByIdAndDelete(memberId);
    if(!member){
      throw new ApiError(404, "Member not found in this project");
    }
    if(!member){
      throw new ApiError(404, "Member not found in this project");
    }
    res.status(200).json(new ApiResponse( 200, "member deleted successfully"))
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong while deleting member from project");
    
  }


};

const updateMemberRole = async (req, res) => {
  // update member role
  const {projectId} = req.params;
  const {memberId} = req.params;
  const project =  await Project.findById(projectId);
  if(!project){
    throw new ApiError(404, "Project not found");
  }
  const member = await ProjectMember.findById(memberId);
  if(!member){
    throw new ApiError(404, "Member not found in this project");
  }
  const { role } = req.body;
  if (!role || !Object.values(AvailableUserRoles).includes(role)) {
    throw new ApiError(400, "Invalid or missing role");
  }
  member.role = role;
  await member.save();
  res.status(200).json(new ApiResponse(200, "Member role updated successfully", {
    member: {
      id: member._id,
      user: member.user,
      project: member.project,
      role: member.role
    }
  }));

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
