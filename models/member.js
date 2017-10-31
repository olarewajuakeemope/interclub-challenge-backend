const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    number: Number,

    email: String
});

module.exports = mongoose.model('Member', MemberSchema);
