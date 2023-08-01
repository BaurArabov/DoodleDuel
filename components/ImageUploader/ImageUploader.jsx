import React, { useRef, useState } from "react";

function ImageUploader({ onImageUpload }) {
  const [isDragging, setIsDragging] = useState(false);

  const dropRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageDataURL = reader.result;
      onImageUpload(imageDataURL);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div
      ref={dropRef}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        width: "100%",
        height: "100%",
        border: isDragging ? "2px dashed #999" : "2px dashed transparent",
        backgroundColor: "#f5f5f5",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <p>Drag and drop an image here</p>
    </div>
  );
}

export default ImageUploader;
