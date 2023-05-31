
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

const Task = new Schema({
    // taskId: { type: Number, required: true ,unique: true},
    nameTask: { type: String, required: true },
    completed: { type: Boolean, required: true },
    dayStart: { type: Date, required: true, default: Date.now},
    dayEnd: { type: Date, required: true, default: Date.now},
    deviceId: { type: Number, required: true, ref: 'Device'},
    userIds : {type: Array, required:true}
});

module.exports = mongoose.model('Task', Task);
