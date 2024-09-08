import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Updated ref to 'Product' based on the provided model
      required: true,
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  totalPayableAmount: {
    type: Number,
    required: true,
  },
  receipt: {
    type: Buffer, // Store the PDF as binary data
  },
},{timestamps:true});

const Order = mongoose.model("Order", orderSchema);

export default Order;
