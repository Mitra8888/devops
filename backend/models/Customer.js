const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    }
});

const CustomerSchema = mongoose.Schema({
    date: {
        type: Date,
        
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },

    tasks: {
        type: [TaskSchema],
        default: []
    }


});

const Customer = mongoose.model('customers', CustomerSchema);

module.exports = Customer;