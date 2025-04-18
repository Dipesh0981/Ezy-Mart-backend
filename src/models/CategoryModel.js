const mongoose= require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({

    name: {
        type: String,
    },
    enum:{
        enum:["Digital", "Fashion", "Grocery", "Books", "Fancy" ],
        type: String,
        required: true,     
    },
},{
    timestamps:true
})
module.exports = mongoose.model('Category', categorySchema)