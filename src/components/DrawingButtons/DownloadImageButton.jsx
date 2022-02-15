export default function DownloadImage(props) {
  
  function downloadImage(e) {
    e.stopPropagation();
    const link = document.createElement("a");
    link.download = props.name;
    link.href = props.src;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <button className="btn btn-primary" onClick={downloadImage}>
      <i className="fas fa-download"></i>
    </button>
  );
}
