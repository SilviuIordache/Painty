export default function DeleteImageButton(props) {
  function deleteImage(e) {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    const updatedImages = JSON.parse(localStorage.getItem("paintyImages"));

    // find index of id
    const indexToDelete = updatedImages.findIndex(
      (elem) => elem.id === props.id
    );

    // delete elem at that index
    updatedImages.splice(indexToDelete, 1);

    // update storage
    localStorage.setItem("paintyImages", JSON.stringify(updatedImages));

    props.deleteCallback();
  }

  return (
    <button className="btn btn-danger ms-1" onClick={deleteImage}>
      <i className="fas fa-trash"></i>
    </button>
  );
}
