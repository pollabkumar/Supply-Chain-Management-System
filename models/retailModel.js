const mongoose = require("mongoose");

const retailSchema = mongoose.Schema(
    {
        rname: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        distributor:
        {
            type: String,
            required: true,
        },

        rcategory:
        {
            type: String,
            required: true
        },
        rproduct:
        {
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

const retail = mongoose.model("retailer", retailSchema);

module.exports = retail;