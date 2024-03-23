import React, { useState } from "react";
import "./style.css";
import sha256 from "crypto-js/sha256";
import JSZip from "jszip";

const Uploader = () => {
  const [files, setFiles] = useState();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [hashValue, setHashValue] = useState("");

  // for uploading pdf files
  const handleChange = (e) => {
    // setFiles([...e.target.files]);
    const selectedFiles = [...e.target.files];
    const filesWithinSizeLimit = selectedFiles.filter(
      (file) => file.size <= 5 * 1024 * 1024
    );

    setFiles(filesWithinSizeLimit);

    const fileNames = filesWithinSizeLimit.map((file) => file.name);
    setSelectedFileNames(fileNames);
  };
  //create button handler
  const handleUpload = async () => {
    if (!files) {
      alert("Please select a file");
      return;
    }

    const zip = new JSZip();

    files.forEach((file) => {
      zip.file(file.name, file);
    });

    zip
      .generateAsync({ type: "blob" })
      .then((blob) => {
        // Now you can upload the zip file
        const formData = new FormData();
        formData.append("zipFile", blob);

        fetch("api/url", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (response.ok) {
              alert("Files uploaded successfully");
              setUploadedFiles(files.map((file) => file.name));

              //code for hashing
              const reader = new FileReader();
              reader.onload = (event) => {
                const hash = sha256(event.target.result);
                setHashValue(hash.toString());
              };
              reader.readAsArrayBuffer(blob);
            } else {
              alert("Failed to upload the files");
            }
          })
          .catch((error) => {
            console.error("something error has occurred....", error);
          });
      })
      .catch((error) => {
        console.error("Error zipping files:", error);
      });
  };

  //for adding more name
  const [inputs, setInputs] = useState([""]);

  const addInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleInputChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };
  return (
    <div className="container">
      <div className="column">
        <label>
          <input type="text" placeholder="Enter your Ethereum-id" />
        </label>
        {/* add more input field for adding more name */}
        {inputs.map((input, index) => (
          <input
            key={index}
            value={input}
            placeholder="Enter your name"
            onChange={(event) => handleInputChange(index, event)}
          />
        ))}
        <button className="add-btn" onClick={addInput}>
          Add More Name{" "}
        </button>
        {/* end here */} <br />
        <button className="upload-btn" onClick={handleUpload}>
          Create New Agreement
        </button>
      </div>
      <div className="column">
        <label className="file-label">
          <p className="upload-text">
            {" "}
            <b>Choose Files</b>{" "}
          </p>
          <input
            type="file"
            multiple
            onChange={handleChange}
            name="pdf"
            className="file-input"
          />
        </label>
        {selectedFileNames.length > 0 && (
          <div>
            <h3>Selected Files:</h3>
            <ul>
              {selectedFileNames.map((fileName, index) => (
                <li key={index}>{fileName}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Display uploaded files */}
      <div>
        {uploadedFiles.length > 0 && (
          <div>
            <h3>Uploaded Files:</h3>
            <ul>
              {uploadedFiles.map((fileName, index) => (
                <li key={index}>{fileName}</li>
              ))}
            </ul>
            {/* Display hash value */}
            <h3>Hash Value:</h3>
            <p>{hashValue}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;
