const Product = require("../models/productSchema");

// get all products => /api/all
exports.getAllProducts = async (req, res, next)=>{
    // finding all products
    const products = await Product.find({});

    res.status(200).json({
        success : true,
        message : "all products retrived",
        total : products.length,
        data : products
    });
};

// Getting a single product
exports.getSingleProduct = async (req, res, next)=>{
    
    const id = req.params.id;
    const singleProduct = await Product.findOne({_id : id});

    res.status(200).json({
        success : true,
        message : "successfully retrived data",
        data : singleProduct
    });
}

// create new product
exports.createProduct = async (req, res)=>{
    try{
        const {name, price, description} =  req.body
        const newProduct = await Product.create({name, price, description});
        const savedProduct = await newProduct.save();

        res.status(201).json({
            success : true,
            message : "Data created!",
            data : savedProduct
        });
    }catch(err){
        res.status(500).json({
            success : false,
            message : "product not created!"
        })
    };

}

// updating product
exports.updateProduct = async (req, res, next)=>{
    const id = req.params.id;
    const payload = req.body;
    const updatedProduct = await Product.findByIdAndUpdate({_id : id}, payload, {new : true});

    res.status(201).json({
        success : true,
        message : "Successfully updated one product in the database",
        data : updatedProduct
    });
}

// Deleting Product
exports.deleteProduct = async (req, res, next)=>{
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);

    res.status(201).json({
        success : true,
        message : "Data Deleted successfully",
        data :deletedProduct 
    });

}