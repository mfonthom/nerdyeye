const express = require("express");
const router = express.Router();

// import the controllers
const { getAllProducts, getSingleProduct, createProduct,updateProduct,deleteProduct} = require("../controller/productController");

const verifyUser = require('../middlewares/authorize')
// router.route("/").get(getShop);

// shop route
router.get("/all", getAllProducts);

// Create Record (CREATE)
router.post("/add", verifyUser, createProduct);


router.route("/:id")
    .get(getSingleProduct)
    .put(updateProduct)
    .delete(deleteProduct);

    
module.exports = router;