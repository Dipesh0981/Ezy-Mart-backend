const categoryModel = require("../models/CategoryModel");

const addCategory = async (req, res) => {
  try {
    const savedCategory = await categoryModel.create(req.body);
    res.status(201).json({
      message: "Category added successfully",
      data: savedCategory,
    });
  } catch (err) {

    res.status(500).json({ message: err.message });
  }
}


const getAllCategory = async (req, res) => {

  try {

    const categories = await categoryModel.find();
    res.status(200).json({
      message: "All categories fetched successfully",
      data: categories
    })

  } catch (err) {

    res.status(500).json({
      message: err
    })

  }
}
const getAllCategoryByUserId = async (req, res) => {
  try {
    const category = await categoryModel
      .find({ userId: req.params.userId })
      .populate("stateId cityId userId");
    if (hordings.length === 0) {
      res.status(404).json({ message: "No category found" });
    } else {
      res.status(200).json({
        message: "Category found successfully",
        data: hordings,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// const addHordingWithFile = async (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       res.status(500).json({
//         message: err.message,
//       });
//     } else {
//       // database data store
//       //cloundinary
//       console.log(req.body);
//       res.status(200).json({
//         message: "File uploaded successfully",
//         data: req.file,
//       });
//     }
//   });
// };

const addCategoryWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    } else {
      // database data store
      //cloundinary

      const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
        req.file
      );
      console.log(cloundinaryResponse);
      console.log(req.body);

      //store data in database
      req.body.categoryURL = cloundinaryResponse.secure_url;
      const savedCategory = await categoryModel.create(req.body);

      res.status(200).json({
        message: "category saved successfully",
        data: categoryHording,
      });
    }
  });
};

// const updateHording = async (req, res) => {
  //update tablename set  ? where id = ?
  //update new data -->req.body
  //id -->req.params.id

//   try {
//     const updatedHording = await hordingModel.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json({
//       message: "Category updated successfully",
//       data: updated,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "error while update category",
//       err: err,
//     });
//   }
// };

const getCategoryById= async(req,res)=>{
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: "No category found" });
    } else {
      res.status(200).json({
        message: "Category found successfully",
        data: category,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  addCategory,
  getAllCategory,
  addCategoryWithFile,
  getAllCategoryByUserId,
  getCategoryById
};

