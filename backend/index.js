import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js"
import orderRoutes from "./routes/order.route.js"
import { connectDb } from "./db/connectDb.js";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}))
dotenv.config();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes ); 
app.use("/api/v1/order", orderRoutes ); 

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
}

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  connectDb();
});
