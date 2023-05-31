
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

const Device = new Schema({
    // deviceId: { type: Number, required: true ,unique: true},
    nameDevice: { type: String, required: true },
    status: { type: Number, required: true },
    role: { type: Number, required: true },
    stationId: { type: ObjectId, required: true, ref: 'Station'},
});

module.exports = mongoose.model('Device', Device);
