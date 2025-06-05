import mongoose, {Schema} from "mongoose"
import {AvailableTaskStatus, TaskStatusEnum} from "../utils/constants.js"
const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true // [true, "Here we send custom message"]
    },
    assignedTo: {
        types: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    assignedBy: {
        types: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: AvailableTaskStatus,
        default: TaskStatusEnum.TODO
    },
 // handling file
    attachments: {
      type: [
        {
            url: String,
            mimetype: String,
            size: Number
        }
    ] ,   // [{}, {}, {}]
    default: []
    }
}, {timestamps: true})

export const Task = mongoose.model("Task", taskSchema)