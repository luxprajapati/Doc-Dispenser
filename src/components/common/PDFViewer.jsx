import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css"; // Import default styles
import { useLocation } from "react-router-dom";

const PdfViewer = () => {
  const location = useLocation();
  const { file } = location.state;

  const pdfUrl = file;
  console.log("pdfUrl->", pdfUrl);

  return (
    <div className="bg-zinc-900">
      <Worker
        workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
      >
        <div
          className="flex
           flex-row justify-center items-center mx-auto 
        "
          style={{
            height: "750px",
            width: "90vw",
            borderRadius: "10px",
          }}
        >
          <Viewer fileUrl={pdfUrl} />
        </div>
      </Worker>
    </div>
  );
};

export default PdfViewer;

// import React from "react";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css"; // Import default styles
// import { useLocation } from "react-router-dom";
// import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
// import { zoomPlugin } from "@react-pdf-viewer/zoom";
// import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
// import "@react-pdf-viewer/zoom/lib/styles/index.css";

// const PdfViewer = () => {
//   const location = useLocation();
//   const { file } = location.state;

//   const pdfUrl = file;

//   const pageNavigationPluginInstance = pageNavigationPlugin();
//   const zoomPluginInstance = zoomPlugin();

//   const { CurrentPageLabel, GoToNextPage, GoToPreviousPage } =
//     pageNavigationPluginInstance;
//   const { ZoomIn, ZoomOut } = zoomPluginInstance;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 ">
//       <Worker
//         workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
//       >
//         <div
//           className="flex flex-col justify-center items-center mx-auto bg-white shadow-lg rounded-lg p-4"
//           style={{
//             height: "750px",
//             width: "90vw",
//             borderRadius: "10px",
//           }}
//         >
//           <div className="flex justify-center gap-6 items-center w-full px-4 fixed z-10 bottom-0 bg-slate-200 bg-opacity-50 ">
//             <div className="flex items-center space-x-2">
//               <button className=" text-white rounded ">
//                 <GoToPreviousPage />
//               </button>
//               <span className="text-lg">
//                 <CurrentPageLabel /> /{" "}
//                 <span>{pageNavigationPluginInstance.totalPages}</span>
//               </span>
//               <button className=" text-white rounded ">
//                 <GoToNextPage />
//               </button>
//             </div>
//             <div className="flex items-center space-x-2">
//               <button className=" text-white rounded">
//                 <ZoomOut />
//               </button>
//               <button className=" text-white rounded">
//                 <ZoomIn />
//               </button>
//             </div>
//           </div>
//           <Viewer
//             fileUrl={pdfUrl}
//             plugins={[pageNavigationPluginInstance, zoomPluginInstance]}
//           />
//         </div>
//       </Worker>
//     </div>
//   );
// };

// export default PdfViewer;
