const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true},
    email: {
        type: String,
        unique: true,
        index: true
        },
    mobile: String,
    password: String,
    userType: String,
})

usersSchema.set('toJSON', {
    virtuals: true,
});

exports.User = mongoose.model('User', usersSchema);
exports.usersSchema = usersSchema;
