import "./assets/css/DragAndDrop.css";

import upload from "./assets/images/upload.svg";

export default function DragAndDrop({ file, setFile, onClick }) {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const fileList = e.dataTransfer.files;
    setFile(fileList[0]);
    console.log(fileList);
  };

  return (
    <div
      className={`drag-drop-zone${file ? "--hidden" : ""}`}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
      onClick={onClick}
    >
      <img src={upload} alt="upload" />
      <p>
        Klikněte pro nahrání <strong>CSV. souboru</strong> nebo ho sem
        přetáhněte
      </p>
    </div>
  );
}
