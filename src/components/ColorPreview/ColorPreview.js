export default function ColorPreview(props) {
  const style = {
    width: "3rem",
    height: "3rem",
    backgroundColor: props.selectedColor,
    border: "3px solid black",
    borderRadius: "5px",
  };

  return <div style={style}></div>;
}
