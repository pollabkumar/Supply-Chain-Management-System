const mongoose = require("mongoose");
const bcrypt =require('bcryptjs')
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        userId: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
        },
    },
    { timestamp: true }
);


userSchema.pre('save',async function (next){
    console.log("pollab")
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

const Users = mongoose.model("users", userSchema);

module.exports = Users;