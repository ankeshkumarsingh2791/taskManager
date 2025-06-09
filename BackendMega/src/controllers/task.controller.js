// get all tasks
import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
const getTasks = async (req, res) => {
  // get all tasks
  if(!req.Task._id){
    throw new ApiError(401, "Unauthorized access denied")
  }
  const task = await Task.findById(req.Task._id)
  if(!task){
    throw new ApiError(401, "Task not found")
  }
  throw new ApiResponse(200,"task found", {
     task: {
         id: task._id,
         title: task.title,
         description: task.description,
         status: task.status,
         project: task.project,
         assignedTo: task.assignedTo,
         assignedBy: task.assignedBy,
         attachments: task.attachments
       }
  })
};


const getTaskByProject = async (req, res) => {
  // get task by project id
  if(!req.params.projectId){
    throw new ApiError(401, "Project ID is required");
  }
  const tasks = await Task.find({ project: req.params.projectId })
    .populate("assignedTo", "name email")
    .populate("assignedBy", "name email");
  if (!tasks || tasks.length === 0) {
    throw new ApiError(404, "No tasks found for this project");
  }
  throw new ApiResponse(200, "Tasks retrieved successfully", {
    tasks: tasks.map(task => ({
      id: task._id,
      title: task.title,
      description: task.description,
      status: task.status,
      project: task.project,
      assignedTo: task.assignedTo,
      assignedBy: task.assignedBy,
      attachments: task.attachments
    }))
  });

};

const createTask = async (req, res) => {
  // create task
 try {
     const {title, description, status} = req.body;
     if(!title || !description || !status){
       throw new ApiError(401, "title and description required")
     }
     const task = await Task.create({
       title,
       description,
       status,
       project: req.params.projectId,
       assignedTo: req.User._id,
       assignedBy: req.User._id,
       attachments: req.files.map(file => ({
         url: file.path,
         mimetype: file.mimetype,
         size: file.size
       }))
   
   
     })
     if(!task){
       throw new ApiError(401, "Something went wrong while creating task")
     }
     throw new ApiResponse(200, "Task created successfully", {
       task: {
         id: task._id,
         title: task.title,
         description: task.description,
         status: task.status,
         project: task.project,
         assignedTo: task.assignedTo,
         assignedBy: task.assignedBy,
         attachments: task.attachments
       }
   
     })
 } catch (error) {
    console.log(error)
    throw new ApiError(401, "Error in catch part internal error")  
 }
};



const updateTask = async (req, res) => {
  // update task
try {
      const {title, description} = req.body;
      if(!title || !description){
        throw new ApiError(401, "missing title or description")
      }
      const task = await Task.findById(req.Task_id)
    
      if(!task){
        throw new ApiError(401, "Task not found")
      }
      task.title = title;
      task.description = description;
      task.status = req.body.status || task.status; // this line using lms
        task.attachments = req.files.map(file => ({
            url: file.path,
            mimetype: file.mimetype,
            size: file.size
        }));
        await task.save();
        throw new ApiResponse(200, "Task updated successfully")


} catch (error) {
    console.log(error)
    throw new ApiError (401, "Error in task update", error.message)
}
};


const deleteTask = async (req, res) => {
  // delete task
  if(!req.Task._id){
    throw new ApiError(401, "Unauthorized access denied");

  }
    const task = await Task.findByIdAndDelete(req.Task._id);
    if(!task){
        throw new ApiError(404, "Task not found");
        }
        throw new ApiResponse(200, "Task deleted successfully");
};


const createSubTask = async (req, res) => {
  // create subtask

};


const updateSubTask = async (req, res) => {
  // update subtask
};


const deleteSubTask = async (req, res) => {
  // delete subtask
};

export {
  createSubTask,
  createTask,
  deleteSubTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateSubTask,
  updateTask,
};
