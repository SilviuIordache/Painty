import uploadImage from "../../helpers/uploadImage";

export default function UploadImageButton(props) {
  async function upload(e) {
    e.stopPropagation();
    await uploadImage(props.name, props.src);
  }

  return (
    <button className="btn btn-primary ms-1" onClick={upload}>
      <i className="fas fa-upload"></i>
    </button>
  );
}
