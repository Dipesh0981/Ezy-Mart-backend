const ProductModel = require("../models/ProductModel");
const cloudinaryUtil = require("../utils/CloudinaryUtil");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image"); // Upload to memory for Cloudinary

const addProduct = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    try {
      // Upload image to Cloudinary
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      console.log("Cloudinary response:", cloudinaryResponse);

      // Prepare product data
      const { name, price, category_id, sub_category_id, vendor_id } = req.body;

      const newProduct = await ProductModel.create({
        name,
        price,
        category_id,
        sub_category_id,
        vendor_id,
        image: cloudinaryResponse.secure_url, // Store Cloudinary URL
      });

      res.status(200).json({
        message: "Product added successfully",
        data: newProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error adding product",
        error: error.message,
      });
    }
  });
};


const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find()
      .populate('category_id')        // populates the category data
      .populate('sub_category_id')    // populates the sub-category data
      .populate('vendor_id');         // populates the vendor data

    res.status(200).json({
      message: "All products fetched successfully",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting product",
      error: err.message,
    });
  }
};




module.exports = {
  addProduct,
  getAllProducts,
  deleteProduct
}