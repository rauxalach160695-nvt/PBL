
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

const UserDetail= new Schema({
    fullName: { type: String},
    dateOfBirth: { type: Date, default:Date.now},
    email: { type: String },
    phoneNumber: { type: String, required: true },
    userId: { type: ObjectId, required: true ,unique: true, ref: 'User'},
});

module.exports = mongoose.model('UserDetail', UserDetail);