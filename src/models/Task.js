
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const Schema = mongoose.Schema;
 

const Task = new Schema({
    // taskId: { type: Number, required: true ,unique: true},
    nameTask: { type: String, required: true },
    completed: { type: Boolean, required: true },
    dayStart: { type: Date, required: true, default: Date.now},
    dayEnd: { type: Date, required: true, default: Date.now},
    deviceId: { type: ObjectId, required: true, ref: 'Device'},
    userId : {type:ObjectId, required:true ,ref: 'Device'}
});

module.exports = mongoose.model('Task', Task);
