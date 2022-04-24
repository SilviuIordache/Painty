import { useAuth } from '../../contexts/AuthContext';

export default function UploadImageButton(props) {
  const { uploadImage } = useAuth();

  async function upload(e) {
    e.stopPropagation();
    await uploadImage(props.name, props.src, props.mode);
  }

  return (
    <button className="btn btn-primary ms-1" onClick={upload}>
      <i className="fas fa-upload"></i>
    </button>
  );
}
