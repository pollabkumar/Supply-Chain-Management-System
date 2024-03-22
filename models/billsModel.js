const mongoose = require("mongoose");

const bilsSchema = mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
        },
        CustomerContact: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        cartItems: {
            type: Array,
            required: true
        },
        date: {
            type: Date,
            default: Date.now(),
        },

    },
    { timestamp: true }
);

const Bills = mongoose.model("bills", bilsSchema);

module.exports = Bills;