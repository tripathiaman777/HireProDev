import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
    const { name, price, description, category } = req.body;
    try {
        console.log(name);
        const image = `https://avatar.iran.liara.run/public/boy?username=${name}`
        const product = await Product.create({ name, price, description, image, category });
        res.status(201).json({success:true, product});
        
    }
    catch(error){
        res.status(500).json({success:false, message: error.message});
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({success:true, products});
    }
    catch(error){
        res.status(500).json({success:false, message: error.message});
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({success:true, message: "Product deleted successfully"});
    }
    catch(error){
        res.status(500).json({success:false, message: error.message});
    }
}

export const editProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({success:true, product});
    }
    catch(error){
        res.status(500).json({success:false, message: error.message});
    }
}