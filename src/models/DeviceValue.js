
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceValue = new Schema({
    // valueId: { type: Number, required: true },
    value: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now},
    deviceId: { type: Number, required: true ,unique: true, ref: 'Device'},
});

module.exports = mongoose.model('DeviceValue', DeviceValue);
