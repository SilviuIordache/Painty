export default function DownloadImage(props) {
  
  function downloadImage(e) {
    e.stopPropagation();
    // get image by id
    const img = document.getElementById(props.id);
    const link = document.createElement("a");
    link.download = props.name;
    // attach the img src to the link
    link.href = img.src;
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
