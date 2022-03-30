import { useSelector } from 'react-redux';

export default function ColorPreview() {
  const selectedColor = useSelector(state => state.tool.color);

  const style = {
    width: "3.6rem",
    height: "3.6rem",
    backgroundColor: selectedColor,
    border: "3px solid black",
    borderRadius: "5px",
  };

  return <div style={style}></div>;
}
