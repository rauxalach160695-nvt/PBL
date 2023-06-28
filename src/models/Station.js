
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

const Station= new Schema({
    // stationId: { type: Number, required: true, unique: true },
    nameStation: {type: String, required: true},
    province: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String},
    street: { type: String },
});

module.exports = mongoose.model('Station', Station);
