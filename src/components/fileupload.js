import React from "react";
import { useState } from "react";
import "../css/FileUpload.css";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import * as Verify from "certifyteojs";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [viewPdf, setViewPdf] = useState(null);
  const newplugin = defaultLayoutPlugin();
  const plugins = [newplugin];

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    const fileType = ["application/pdf"];

    if (selectedFile) {
      if (fileType.includes(selectedFile.type)) {
        console.log("*****");
        const reader = new FileReader();
        reader.onload = (e) => {
          const view = new Int8Array(e.target.result);
          Verify.verify(view, "https://node.teo.mn")
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.error("test", err.message); 
            });
          setFile(e.target.result);
        };
        reader.readAsArrayBuffer(selectedFile);
      } else {
        setFile(null);
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file !== null) {
      const file1 = new File([file], 'filename.extension', { type: 'application/pdf' });
     const fileUrl = URL.createObjectURL(file1);
      setViewPdf(fileUrl);
    } else {
      setViewPdf(null);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <h2>View PDF</h2>

      <section className="pdf-container">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js">
          {viewPdf && (
            <>
              <Viewer fileUrl={viewPdf} plugins={plugins} />
            </>
          )}
          {!viewPdf && <>No Pdf</>}
        </Worker>
      </section>
    </section>
  );
}
