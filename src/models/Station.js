
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

const Station= new Schema({
    // stationId: { type: Number, required: true, unique: true },
    // province: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    street: { type: String, required: true },
});

module.exports = mongoose.model('Station', Station);
