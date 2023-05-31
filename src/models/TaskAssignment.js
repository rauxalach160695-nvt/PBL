
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

const TaskAssignment = new Schema({
    // deviceId: { type: Number, required: true ,unique: true},
    taskId: { type: Number, required: true, ref: 'Task' },
    userId: { type: Number, required: true, ref: 'User'},
});

module.exports = mongoose.model('TaskAssignment', TaskAssignment);
