
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const DeviceValue = new Schema({
    // valueId: { type: Number, required: true },
    value: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now},
    deviceId: { type: ObjectId, required: true ,unique: true, ref: 'Device'},
});

module.exports = mongoose.model('DeviceValue', DeviceValue);
