const routes = require("express").Router()
const productController = require("../controllers/ProductController")

routes.post("/addproduct", productController.addProduct);    
routes.get("/getproduct", productController.getAllProducts);
routes.delete('/delete/:id', productController.deleteProduct);
module.exports = routes;