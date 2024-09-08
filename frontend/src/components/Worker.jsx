import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import {BROWSER_URL} from '../constant/Constant.js'
const PDFViewer = () => {
   const {id} = useParams();
   const orderId = id;
  const [pdfData, setPdfData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await axios.get(`${BROWSER_URL}/api/v1/order/receipt/${orderId}`, {
          responseType: "arraybuffer", // Use arraybuffer to handle binary data
        });

        // Convert binary data to Base64
        const base64 = btoa(
          new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        const url = `data:application/pdf;base64,${base64}`;

        setPdfData(url);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching PDF:", error);
        setIsLoading(false);
      }
    };

    fetchPDF();
  }, [orderId]);

  return (
    <div className="w-100vw">
      {isLoading ? (
        <LoadingSpinner/>
      ) : pdfData ? (
        <iframe
          src={pdfData}
          style={{ width: "100vw", height: "100vh", border: "none" }}
          title="PDF Viewer"
        />
      ) : (
        <p>PDF not found or failed to load.</p>
      )}
    </div>
  );
};

export default PDFViewer;
