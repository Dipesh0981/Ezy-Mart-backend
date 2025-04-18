const routes = require("express").Router()
const subcategoryController = require("../controllers/SubCategoryController")

routes.post("/addsubcategory", subcategoryController.addSubCategory)
routes.get("/getsubcategory", subcategoryController.getAllSubCategory)
routes.get("/getSubCategoriesByCategoryId/:id",subcategoryController.getSubCategoriesByCategoryId);
module.exports = routes;