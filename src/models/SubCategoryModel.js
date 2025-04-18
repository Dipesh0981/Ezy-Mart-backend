// const mongoose= require("mongoose")
// const Schema = mongoose.Schema

// const subcategorySchema= new Schema({

//     name:{
//         type: String,
//         required: true,
      
//     },
//     categoryId:{
//         type: Schema.Types.ObjectId,
//         ref: "Category",
//         required: true
//     },
// },{

//     timestamps:true
// })
// module.exports = mongoose.model('subcategory', subcategorySchema)


const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  pname: { type: String, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
