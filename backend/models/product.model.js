import mongoose from "mongoose";
// const boyProfilePic = `https://avatar.iran.liara.run/public/job/doctor`;
// https://avatar.iran.liara.run/public/job/chef/
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    image:{
        type:String,
    }
},{timestamps:true})

const Product = mongoose.model("Product", productSchema);

export default Product;