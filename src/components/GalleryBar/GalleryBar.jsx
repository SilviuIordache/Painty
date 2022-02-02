import getImageURLSize from "../../helpers/getImageURLSize";

export default function GalleryBar(props) {
  return (
    <div className="bg-white rounded py-4">
      <div className="d-flex justify-content-around">
        <DrawingsTotal images={props.images}/>
        <StorageCapacity images={props.images} />
      </div>
    </div>
  );
}

function DrawingsTotal(props) {

  let drawings = props?.images?.length || 0;
  return (
    <div>Drawings: {drawings}</div>
  )
}

function StorageCapacity(props) {
  
  let images = []
  if (props.images) {
    images = props.images
  }

  let usedStorage = 0;
  images.forEach((image) => {
    usedStorage = usedStorage + getImageURLSize(image.src);
  });

  return <div>Storage: {usedStorage.toFixed(0)} / 5000 KB </div>;
}
