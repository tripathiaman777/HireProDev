import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generatePDF = async (orderDetails) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      timeout: 60000,
    });

    const page = await browser.newPage();

    const receiptHtml = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
            .summary-box {
              margin-top: 20px;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
            .footer {
              margin-top: 20px;
              font-size: 0.8em;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 10px;
            }
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
                    <td>1</td>
                    <td>₹${item.price}</td>
                  </tr>`
              )
              .join("")}
          </table>
          <div class="summary-box">
            <p><strong>Total Amount:</strong> ₹${orderDetails.totalAmount}</p>
            <p><strong>GST (18%):</strong> ₹${(orderDetails.totalAmount * 0.18).toFixed(2)}</p>
            <p><strong>Total Payable Amount:</strong> ₹${orderDetails.totalPayableAmount}</p>
          </div>
          <div class="footer">
            <p><small>Terms and conditions apply. All sales are final and non-refundable. Please review your order carefully before completing the purchase.</small></p>
          </div>
        </body>
      </html>
    `;

    const pdfPath = path.join(__dirname, `receipt_${Date.now()}.pdf`);

    await page.setContent(receiptHtml);
    await page.pdf({
      path: pdfPath,
      format: "A4",
    });

    await browser.close();

    return pdfPath; // Return the path to the generated PDF
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null; // Return null if PDF generation failed
  }
};
