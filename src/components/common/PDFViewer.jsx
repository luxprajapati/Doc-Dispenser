import React from "react";
import { useLocation } from "react-router-dom";

const PdfViewer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const file = queryParams.get("file");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        className="flex flex-col justify-center items-center mx-auto bg-white shadow-lg rounded-lg p-4"
        style={{
          height: "750px",
          width: "90vw",
          borderRadius: "10px",
        }}
      >
        <iframe
          title="pdf-viewer"
          src={file}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>
    </div>
  );
};

export default PdfViewer;
