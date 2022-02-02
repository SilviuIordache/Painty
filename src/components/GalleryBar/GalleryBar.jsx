import getImageURLSize from "../../helpers/getImageURLSize";

export default function GalleryBar(props) {
  return (
    <div className="bg-white rounded py-4">
      <div className="d-flex justify-content-around">
        <div>Drawings: {props.images.length}</div>
        <StorageCapacity images={props.images} />
      </div>
    </div>
  );
}

function StorageCapacity(props) {
  let usedStorage = 0;
  props.images.forEach((image) => {
    usedStorage = usedStorage + getImageURLSize(image.src);
  });

  return <div>Storage: {usedStorage.toFixed(0)} / 5000 KB </div>;
}
