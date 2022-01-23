import "./DrawingButtons.css";

export default function GalleryDrawingButtons(props) {
  function downloadImage(e) {
    e.stopPropagation();
    const link = document.createElement("a");
    link.download = props.name;
    link.href = props.src;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function deleteImage(e) {
    e.stopPropagation();
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) return;

    const updatedImages = JSON.parse(localStorage.getItem("paintyImages"));

    // find index of id
    const indexToDelete = updatedImages.findIndex((elem) => elem.id === props.id);

    // delete elem at that index
    updatedImages.splice(indexToDelete, 1);
    
    // update storage
    localStorage.setItem("paintyImages", JSON.stringify(updatedImages));
    
    props.deleteCallback();
  }

  let btnGroupClass = ""
  if (props.dynamic) {
    btnGroupClass = "button-group";
  
    if (props.imageHovered) {
      btnGroupClass += " d-block"
    }
  }

  return (
    <div className={btnGroupClass}>
      <button className="btn btn-primary" onClick={downloadImage}>
        <i className="fas fa-download"></i>
      </button>
      <button className="btn btn-danger ms-1" onClick={deleteImage}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}
