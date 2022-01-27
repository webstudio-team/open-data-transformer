export default function DragAndDrop({ setFile, onClick }) {
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
      className="drag-drop-zone"
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
      onClick={onClick}
    >
      <p>Drag files here to upload</p>
    </div>
  );
}
