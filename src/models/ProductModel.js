const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  sub_category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' },
  image: { type: String },
  vendor_id: { type: mongoose.Schema.Types.ObjectId, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
