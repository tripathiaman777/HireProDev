import Order from "../models/order.model.js"; // Import the Order model
// import { generatePDF } from "../lib/puppeteer2.js"; // Import your PDF generation function
import { generatePDF } from "../lib/htmlToPdf.js"; // Import your PDF generation function
import fs from "fs";
export async function createOrder(req, res) {
  try {
    const { userId } = req; // Extract userId from request
    const { orderItems, totalAmount } = req.body; // Extract order details from request body

    // Create order
    const totalPayableAmount = (totalAmount * 1.18).toFixed(2);
    const order = await Order.create({
      user: userId,
      orderItems: orderItems.map((item) => item._id),
      totalAmount,
      totalPayableAmount,
    });

    // Prepare order details for the receipt
    const orderDetails = {
      orderId: order._id,
      date: new Date().toLocaleDateString(),
      products: orderItems,
      totalAmount: totalAmount,
      totalPayableAmount,
    };

    // Generate PDF and save it locally
    const pdfPath = await generatePDF(orderDetails);
    console.log("Pdf path");
    console.log(pdfPath);
    if (pdfPath) {
      // Read the PDF file as a Buffer
      const pdfBuffer = fs.readFileSync(pdfPath);

      // Update the order with the PDF Buffer
      console.log("Pdf buffer");
      console.log(pdfBuffer);
      order.receipt = pdfBuffer;
      await order.save();

      // Optionally, delete the local PDF file after saving it to MongoDB
      fs.unlinkSync(pdfPath);

      // Send the response back with the order details
      res.status(201).json({
        message: "Order created successfully",
        order,
      });
    } else {
      res.status(500).json({ message: "Failed to generate PDF receipt" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getAllBills(req, res) {
  try {
    console.log("Heyyyy");
    const { userId } = req; // Extract userId from request
    // const orderBills = await Order.find({ user: userId }).populate("receipt");
    const orderBills = await Order.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(orderBills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
