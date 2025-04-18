const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    
    roleId:{
        type:Schema.Types.ObjectId, //batugasoijkadsasiksaj
        ref:"roles"
    },
    password:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },role :{
        enum:["user","vendor","admin"]
    },
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
})

module.exports = mongoose.model("users",userSchema)