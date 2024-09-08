import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const convertBinaryPdfToImage = async (pdfBuffer) => {
  try {
    const apiKey =
      "tripathiaman777@gmail.com_CyMkntR45QUqjwNzwEYQ6aQtYzeqVabTWYkmP1xJnP7hdCex5YvY2Ct6MN40X07r";

    // Create a form to send the PDF file
    const form = new FormData();
    form.append("file", pdfBuffer, { filename: "file.pdf" });

    const response = await axios.post(
      "https://api.pdf.co/v1/pdf/convert/to/image",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "x-api-key": apiKey,
        },
        responseType: "arraybuffer",
      }
    );

    // Save the image to a file
    fs.writeFileSync("output/page_1.png", response.data);

    console.log("PDF converted to image successfully");
  } catch (error) {
    console.error("Error converting PDF to image:", error.message);
  }
};

// Example usage: Read a PDF file as binary buffer
const pdfPath = "path/to/your/file.pdf";
fs.readFile(pdfPath, (err, pdfBuffer) => {
  if (err) {
    console.error("Error reading PDF file:", err.message);
    return;
  }
  convertBinaryPdfToImage(pdfBuffer);
});
