const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
    {
        iname: {
            type: String,
            required: true,
        },
        iproduct: {
            type: String,
            required: true,
        },

        price: {
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

const Item = mongoose.model("items", itemSchema);

module.exports = Item;