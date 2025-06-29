import mongoose from "mongoose"

const projectNotesSchema = new Schema ({
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    }

}, {timestamps: true})

export const ProjectNote = mongoose.model("ProjectNote", projectNotesSchema)