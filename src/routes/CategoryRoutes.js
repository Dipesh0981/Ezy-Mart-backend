const routes = require("express").Router()
const categoryController = require("../controllers/CategoryController")

routes.post("/addcategory", categoryController.addCategory);    
routes.get("/getcategory", categoryController.getAllCategory);
routes.get('/getCategorybyuserid/:userId', categoryController.getAllCategoryByUserId);
routes.post('/addWithFile', categoryController.addCategoryWithFile);
routes.get("/getCategoryById/:id",categoryController.getCategoryById);
module.exports = routes;