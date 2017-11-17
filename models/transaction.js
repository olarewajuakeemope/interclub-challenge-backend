const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

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

TransactionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Transaction', TransactionSchema);
