import mongoose, {Schema} from "mongoose"

const subTaskSchema = new Schema ({
    title: {
        type: String,
        required: true,
        trim: true
    },
    task: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false

    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

export const subTask = mongoose.model("SubTask", subTaskSchema)