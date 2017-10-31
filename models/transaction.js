const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    member: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },

    type: {
        type: String,
        enaum: ['income', 'expense']
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
