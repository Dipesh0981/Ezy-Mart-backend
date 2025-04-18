const subcategoryModel = require("../models/SubCategoryModel");

const addSubCategory = async (req, res) => {
  try {
    const savedSubCategory = await subcategoryModel.create(req.body);
    res.status(201).json({
      message: "SubCategory added successfully",
      data: savedSubCategory,
    });
  } catch (err) {
    
        res.status(500).json({ message: err.message });
    }
  }


// const getAllSubCategory = async (req, res) => {

//     try{
        
//         const subCategory = await subcategoryModel.find();
//         res.status(200).json({
//             message: "All subcategories fetched successfully",
//             data: subcategories,
//         })

//     }catch(err){

//         res.status(500).json({
//             message: err
//         })

//     }
// }

// const getSubCategoriesByCategoryId = async (req, res) => {
//   try {
//     const subcategories = await SubCategories.find({ category_id: req.params.id });
//     res.status(200).json(subCategories);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const getAllSubCategory = async (req, res) => {
  try {
    const subcategories = await subcategoryModel.find();
    res.status(200).json({
      message: "All subcategories fetched successfully",
      data: subcategories,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const subcategories = await subcategoryModel.find({ category_id: req.params.id });

    res.status(200).json({
      message: "SubCategories fetched successfully",
      data: subcategories,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    addSubCategory,
    getAllSubCategory,
    getSubCategoriesByCategoryId,
}