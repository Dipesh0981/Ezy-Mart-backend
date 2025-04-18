const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
//express object..
const app = express()
app.use(cors()) // *
app.use(express.json()) //to accept data as json...


//import role routes
const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

//userRoutes
const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

const stateRoutes = require("./src/routes/StateRoutes")
app.use("/state",stateRoutes)

const cityRoutes = require("./src/routes/CityRoutes")
app.use("/city",cityRoutes)

const productRoutes = require("./src/routes/ProductRoutes")
app.use("/product",productRoutes)

const addtocartRoutes = require("./src/routes/AddToCartRoutes")
app.use("/addtocart",addtocartRoutes)

const subcategoryRoutes = require("./src/routes/SubCategoryRoutes")
app.use("/subcategory",subcategoryRoutes)

const categoryRoutes = require("./src/routes/CategoryRoutes")
app.use("/category",categoryRoutes)

const orderRoutes = require("./src/routes/OrderRoutes")
app.use("/order",orderRoutes)



// const wishlistRoutes = require("./src/routes/WishlistRoutes")
// app.use("/wishlist",wishlistRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 3003
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})