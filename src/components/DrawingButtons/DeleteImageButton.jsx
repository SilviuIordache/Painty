import { deleteImage } from '../../dbservices/images.js';

export default function DeleteImageButton(props) {
  function removeImage(e) {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    deleteImage(props.id, props.path);

    props.deleteCallback();
  }

  return (
    <button className="btn btn-danger ms-1" onClick={removeImage}>
      <i className="fas fa-trash"></i>
    </button>
  );
}
