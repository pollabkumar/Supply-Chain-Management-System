const mongoose = require("mongoose");

const menufSchema = mongoose.Schema(
    {
        mname: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
        },
        mcategory: {
            type: String,
            required: true,
        },
        mproduct: {
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

const Menu = mongoose.model("menuf", menufSchema);

module.exports = Menu;