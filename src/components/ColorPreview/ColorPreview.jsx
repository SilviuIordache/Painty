import { useSelector } from 'react-redux';

export default function ColorPreview() {
  const selectedColor = useSelector(state => state.tool.color);

  const style = {
    width: "3rem",
    height: "3rem",
    backgroundColor: selectedColor,
    border: "3px solid black",
    borderRadius: "5px",
  };

  return <div style={style}></div>;
}
