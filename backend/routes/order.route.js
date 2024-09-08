import express from "express";
import { createOrder, getAllBills } from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/verifytoken.js";
import Order from "../models/order.model.js";
const router = express.Router();

router.post("/create", verifyToken, createOrder);
router.get("/getAllBills", verifyToken, getAllBills);
router.get("/receipt/:orderId", async (req, res) => {
  console.log("Hello There");
  try {
    const { orderId } = req.params;
    // console.log(orderId);
    const order = await Order.findById(orderId);

    console.log(order);
    if (!order || !order.receipt) {
      return res.status(404).send("PDF not found");
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=receipt.pdf");
    res.status(200).send(order.receipt);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
