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
  let usedStorage = 0;

  if (props.images) {
    props.images.forEach((image) => {
      usedStorage = usedStorage + image.size;
    });
  }

  usedStorage = (usedStorage / 1024).toFixed(0)


  return <div>Storage: {usedStorage} / 5000 KB </div>;
}
