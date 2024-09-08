import puppeteer from "puppeteer";
import { v2 as cloudinary } from "cloudinary";

export async function generateReceiptPDF(orderDetails) {
  // HTML template for the receipt
  const receiptHtml = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { color: #333; }
          table { width: 100%; border-collapse: collapse; }
          th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
        </style>
      </head>
      <body>
        <h1>Receipt</h1>
        <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
        <p><strong>Date:</strong> ${orderDetails.date}</p>

        <h2>Items:</h2>
        <table>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          ${orderDetails.products
            .map(
              (item) =>
                `<tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price}</td>
                  
                </tr>`
            )
            .join("")}
        </table>

        <p><strong>Total Amount:</strong> $${orderDetails.totalAmount}</p>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the HTML content
  await page.setContent(receiptHtml);

  // Generate PDF (in-memory as a buffer)
  const pdfBuffer = await page.pdf({ format: "A4" });

  await browser.close();

  // Upload the generated PDF buffer to Cloudinary
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "raw" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    stream.end(pdfBuffer);
  });
}
