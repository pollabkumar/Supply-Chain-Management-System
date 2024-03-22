const mongoose = require("mongoose");

const disSchema = mongoose.Schema(
    {
        dname: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        dcategory: {
            type: String,
            required: true,
        },
        dproduct: {
            type: String,
            required: true,
        },

        date: {
            type: String,
            required: true,
        },

    },
    { timestamp: true }
);

const Dis = mongoose.model("dis", disSchema);

module.exports = Dis;