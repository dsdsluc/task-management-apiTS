import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: String,
    status: String,
    content: String,
    timeStart: Date,
    timeFinsh: Date,
    createdBy:String,
    listUser: Array,
    taskParenId:String,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteAt : Date
  },{ timestamps: true });
const Task = mongoose.model('Task', TaskSchema,"tasks");

export default Task;