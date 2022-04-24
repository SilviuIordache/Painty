import DownloadImageButton from './DownloadImageButton';
import DeleteImageButton from './DeleteImageButton';
import ShareButton from './ShareButton';
import UploadImageButton from './UploadImageButton';

export default function DrawingButtons(props) {
  let btnGroupStyle = {
    display: 'flex',
  };
  if (props.dynamic) {
    btnGroupStyle = {
      display: 'none',
      position: 'absolute',
      bottom: '0.5rem',
      right: '1.3rem',
    };

    if (props.imageHovered) {
      btnGroupStyle.display = 'block';
    }
  }

  return (
    <div style={btnGroupStyle}>
      <DownloadImageButton name={props.name} src={props.src} />
      <DeleteImageButton id={props.id} deleteCallback={props.deleteCallback} />
      {!props.dynamic && <ShareButton name={props.name} src={props.src} />}
      <UploadImageButton src={props.src} name={props.name} mode={props.mode} />
    </div>
  );
}
